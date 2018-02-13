'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = "PLACE YOUR APP ID HERE";
var SKILL_NAME = "Urban Dictionary";
var HELP_MESSAGE = "Sorry, I don't understand. Try saying something like 'ask Urban Dictionary to define vanilla.' ";
var noop = function() {};

var getUrbanDictionaryResponse = function(phrase, callback) {
    var http = require('http');
    var url = "http://api.urbandictionary.com/v0/define?term=" + phrase;

    http.get( url, function( response ) {

        var data = '';

        response.on( 'data', function( x ) { data += x; } );

        response.on( 'end', function() {

            var json = JSON.parse( data );

            console.log(json);

            (callback || noop)(json);

        } );

    } );
};

var outputMessage = function(entry, phrase, count, context) {

    var responseMessage = "";
    var card = null;

    console.log(entry);

    if(entry != null) {

        var definition = endWithPeriod(entry.definition);
        var example = endWithPeriod(entry.example);
        var content = definition;

        if(definition != null && definition.length > 0) {
            definition = capitalizeFirstLetter(definition);
        }

        responseMessage += "Here's the top definition for " + phrase + ": " + definition + " ";

        if(entry.example != "") {
            responseMessage += "Here's an example: " + example;
        }

        card = {
            type: "Simple",
            title: toTitleCase(phrase),
            content: definition
        };

    } else {

        responseMessage = "Sorry, couldn't find an entry for " + endWithPeriod(phrase);

    }

    console.log(responseMessage);

    context.succeed({
        response: {
            outputSpeech: {
                type: "PlainText",
                text: responseMessage
            },
            card: card
        }
    });
};

var noPhraseMessage = function(context) {

    context.succeed({
        response: {
            outputSpeech: {
                type: "PlainText",
                text: message
            }
        }
    });
};

var toTitleCase = function(phrase) {
    return phrase.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function capitalizeFirstLetter(phrase) {
    return phrase.charAt(0).toUpperCase() + phrase.slice(1);
}

var endWithPeriod = function(message) {

    if(message == null || message.length <= 0) {
        return message;
    }

    var foundPeriod = false;

    for(var i = message.length - 1; i >= 0; i--) {
        var c = message[i];

        if(c == "\r" || c == "\n" || c == " ") { continue; }

        if(c != ".") {
            message = message.slice(0, i + 1) + "." + message.slice(i + 1, message.length);
        }

        break;
    }

    return message;

};

exports.handler = function(event, context, callback) {

    var alexa = Alexa.handler(event, context);

    alexa.appId = APP_ID;

    alexa.registerHandlers({
        'LaunchRequest': function () {
            this.emit(':tell', HELP_MESSAGE);
        },
        'Unhandled': function () {
            this.emit(':tell', HELP_MESSAGE);
        },
        'GetUrbanDictionaryDefinition': function () {

            var phrase = this.event.request.intent.slots.Phrase.value;

            if(phrase == null || phrase.length <= 0) {
                //noPhraseMessage(context);
                this.emit('Unhandled');
                return;
            }

            console.log("Phrase: " + phrase);

            phrase = phrase.toLowerCase();

            if(phrase.startsWith("a ")) {
                phrase = phrase.substr(2)
            }

            getUrbanDictionaryResponse(phrase, function(response) {
                var count = response.result_type == "no_results" ? 0 : response.list.length;
                var entry = response.result_type == "no_results" ? null : response.list[0];

                /*if(entry != null && response.list.length > 0) {

                    for(var i = 0; i < response.list.length; i++) {

                        var current = response.list[i];
                        var entryApproval = (entry.thumbs_up / (entry.thumbs_up + entry.thumbs_down)) * 100;
                        var currentApproval = (current.thumbs_up / (current.thumbs_up + current.thumbs_down)) * 100;

                        if(currentApproval > entryApproval) {
                            entry = current;
                        }

                    }

                }*/

                outputMessage(entry, phrase, count, context);
            });
        }
    });
    alexa.execute();
};
