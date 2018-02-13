# Urban Dictionary Alexa Skill

Want to ask your Echo questionable terms and phrases? Curious what **!&%@$** means but you're too afraid to ask your friends? Look no further!

This skill can be side-loaded into your [Amazon Alexa Developer Account](https://developer.amazon.com/) by using the information below to fill out your skill preferences. The wizard that Amazon guides you through to create your skill will have sections that mirror those below. Use the values below to fill out those fields.

## Lambda Function
During set up, you will be asked to create an Amazon Lambda function to host your skill's code. You'll want to create a Node.js Lambda function and use the code in the [index.js](https://github.com/jamesmillerio/Urban-Dictionary-Alexa-Skill/blob/master/index.js) file within this repository. You will need to make one modification to it though, and that's to line three shown below:

> var APP_ID = "PLACE YOUR APP ID HERE";

Your skill will be given an application id that you can find on the Skill Information tab of the editor. You'll need to replace the "PLACE YOUR APP ID HERE" text with the application id you are given (keeping the double quotes). Once you've created this Lambda Function, you'll be asked to link it to your Skill during the set up process.

## Intent Schema
Within this repository, you will see a JSON file titled [intent-schema.json](https://github.com/jamesmillerio/Urban-Dictionary-Alexa-Skill/blob/master/intent-schema.json). You will use the contents of this file to set the Intent Schema section of the Skill's preferences. This tells the Echo how to understand all of the variables of your skill.

## Custom Slot Types
There are two custom slot types needed for this skill. These slot types allow you to add some variability to how people can ask questions. They are as follows:

#### SearchPrefix
define  
to define  
to search for  
what is  
what a  
what  
what does  
what is the meaning of the phrase  
what is the meaning of the word  
the meaning of the phrase  
the meaning of the word  

#### SearchSuffix
is  
are  
means  
mean  

## Sample Utterances
The following utterances tell Alexa how people can summon this skill. Feel free to add more if you can think of anything that feels more natural.

GetUrbanDictionaryDefinition {SearchPrefix} {vanilla|Phrase} {SearchSuffix}  
GetUrbanDictionaryDefinition {SearchPrefix} {devils advocate|Phrase} {SearchSuffix}  
GetUrbanDictionaryDefinition {SearchPrefix} {blessing in disguise|Phrase} {SearchSuffix}  
GetUrbanDictionaryDefinition {SearchPrefix} {penny for your thoughts|Phrase} {SearchSuffix}  
GetUrbanDictionaryDefinition {SearchPrefix} {once in a blue moon|Phrase} {SearchSuffix}  
GetUrbanDictionaryDefinition {SearchPrefix} {at the drop of a hat|Phrase} {SearchSuffix}  
GetUrbanDictionaryDefinition {SearchPrefix} {don't count your chickens before they hatch|Phrase} {SearchSuffix}  
