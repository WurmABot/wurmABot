const { bold, hyperlink, blockQuote } = require('discord.js');
const nlp = require('compromise');
const { capitalize } = require('../utils.js');
const { WhatIs,WhatCan } = require('../jsmaps/questionList.default.js');
const qaMapWhatCan=WhatCan;
const qaMapWhatIs=WhatIs;
//const {allList}= require ('../jsmaps/list.default.js');

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
                } 
                else {
                    returnString = blockQuote(mapA);
                }
            } else {
                returnString = 'I don\'t know what you mean. Please write your question in a more specific way.';
            }
        }
    } else {
        returnString = 'Bot has an error in What-is Logic on whatis-File 42.';
    }
    
        if (returnString.endsWith(':woLink')) {
                    returnSting= returnString.replace(':woLink', '\nVisit the Homepage: ' + hyperlink('WurmOnline.com', 'https://www.wurmonline.com/'));
                   
    }


    return returnString;
}
function whatCan(content) {
    let returnString = '';
    const doc = nlp(content);
    const namedEntities = doc.match('#Noun').out('array');
    if (content=="what can i say") {
        returnString="Its a complex question. But i try my best to get you an optiomal answer.\n\n";
        returnString+="* You can me ask an "+bold ('What is (keyword)?')+" question.\n";
        returnString+="In addition to time and date, I can there answer the following keywords:\n\n";
        var xmend=qaMapWhatIs.size;
        var xmc=1;
        qaMapWhatIs.foreach((value, key) => {
            if (xmc < xmend) {
                returnString +=key+", ";
            }
            else {
                //last entry..
                returnString +=key+"\n";
            }
        });
        returnString+="* You can me ask an "+bold ('What can (keyword)?')+" question (new).\n";
        returnString+="I can there answer the following keywords:\n\n";
        var xcmend=qaMapWhatCan.size;
        var xcmc=1;
        qaMapWhatCan.foreach((value, key) => {
            if (xmc < xmend) {
                returnString +=key+", ";
            }
            else {
                //last entry..
                returnString +=key+"\n";
            }
        }                    
       )};
        returnString+="\n\nI hope that answer is a little help ..\n\n";
    } 
    else if (namedEntities.length > 1) {
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
                } 
                else if(mapA.endsWith(':woLink')) {
                    const replacedMapA = mapA.replace(':wurmpedia', '\nSee on Wurmpedia: ' + hyperlink(schlagwort, 'https://www.wurmpedia.com/index.php/' + capitalize(schlagwort)));
                    returnString = blockQuote(replacedMapA);
                }
                else {
                    returnString = blockQuote(mapA);
                }
            } else {
                returnString = 'I don\'t know what you mean. Please write your question in a more specific way.';
            }
        }
    } else {
        returnString = 'Bot has an error in What-is Logic on whatis-file 82.';
    }
    if (returnString.endsWith(':woLink')) {
                    returnSting= returnString.replace(':woLink', '\nVisit the Homepage: ' + hyperlink('WurmOnline.com', 'https://www.wurmonline.com/'));
                   
    }
    return returnString;
}
module.exports = {
    whatIs, whatCan
};
