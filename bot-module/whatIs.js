const { bold, hyperlink, blockQuote } = require('discord.js');
const nlp = require('compromise');
const { capitalize } = require('../utils.js');
const { qaMapWhatIs,qaMapWhatCan } = require('../jsmaps/questionList.default.js');

function whatIs(content) {
    let returnString = '';
    const doc = nlp(content);
    const namedEntities = doc.match('#Noun').out('array');

    if (namedEntities.length > 1) {
        const entity = namedEntities[0] + " " + namedEntities[1];
        const schlagwort = namedEntities.length > 0 ? namedEntities[0] : "nothing";

        if (qaMapWhatIs.has(schlagwort)) {
            returnString = qaMapWhatIs.get(schlagwort);
        } else if (qaMapWhatIs.has(entity)) {
            returnString = qaMapWhatIs.get(entity);
        } else {
            returnString = bold('Error-Reporting') + '\n' + 'in bot-whatIs logic: ' + schlagwort + ' or [' + entity + '] at array ' + namedEntities.length + ' results in an else on 132.';
        }
    } else if (namedEntities.length == 1) {
        const schlagwort = namedEntities[0];
        if (schlagwort == "time") {
            returnString = "The time is: " + new Date().toTimeString();
        } else if (schlagwort == "date") {
            returnString = "The date is: " + new Date().toDateString();
        } else {
            const mapA = qaMapWhatIs.get(schlagwort);
            if (mapA) {
                if (mapA.endsWith(":wurmpedia")) {
                    const replacedMapA = mapA.replace(':wurmpedia', '\nSee on Wurmpedia: ' + hyperlink(schlagwort, 'https://www.wurmpedia.com/index.php/' + capitalize(schlagwort)));
                    returnString = blockQuote(replacedMapA);
                } else {
                    returnString = blockQuote(mapA);
                }
            } else {
                returnString = 'I don\'t know what you mean. Please write your question in a more specific way.';
            }
        }
    } else {
        returnString = 'Bot has an error in What-is Logic on whatis-File 42.';
    }

    return returnString;
}
function whatCan(content) {
    let returnString = '';
    const doc = nlp(content);
    const namedEntities = doc.match('#Noun').out('array');

    if (namedEntities.length > 1) {
        const entity = namedEntities[0] + " " + namedEntities[1];
        const schlagwort = namedEntities.length > 0 ? namedEntities[0] : "nothing";

        if (qaMapWhatCan.has(schlagwort)) {
            returnString = qaMapWhatCan.get(schlagwort);
        } else if (qaMapWhatIs.has(entity)) {
            returnString = qaMapWhatCan.get(entity);
        } else {
            returnString = bold('Error-Reporting') + '\n' + 'in bot-whatIs logic: ' + schlagwort + ' or [' + entity + '] at array ' + namedEntities.length + ' results in an else on 132.';
        }
    } else if (namedEntities.length == 1) {
        const schlagwort = namedEntities[0];
        if (schlagwort == "time") {
            returnString = "The time is: " + new Date().toTimeString();
        } else if (schlagwort == "date") {
            returnString = "The date is: " + new Date().toDateString();
        } else {
            const mapA = qaMapWhatCan.get(schlagwort);
            if (mapA) {
                if (mapA.endsWith(":wurmpedia")) {
                    const replacedMapA = mapA.replace(':wurmpedia', '\nSee on Wurmpedia: ' + hyperlink(schlagwort, 'https://www.wurmpedia.com/index.php/' + capitalize(schlagwort)));
                    returnString = blockQuote(replacedMapA);
                } else {
                    returnString = blockQuote(mapA);
                }
            } else {
                returnString = 'I don\'t know what you mean. Please write your question in a more specific way.';
            }
        }
    } else {
        returnString = 'Bot has an error in What-is Logic on whatis-file 82.';
    }

    return returnString;
}
module.exports = {
    whatIs, whatCan
};
