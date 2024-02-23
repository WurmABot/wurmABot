const { bold, hyperlink, blockQuote } = require('discord.js');
const nlp = require('compromise');
const fs =require('fs');
const ilog= require('../logger/logger.js');
// const { capitalize } = require('../utils.js');
//const coreMap = require("../data/coreMap.js");
let gsData=new Map();
let gObjects=new Map();
let deeds = new Map();
let users = new Map();
let botSettings= new Map();
function loadData(what=null,subname=null) {
    let myFile = "../data/";
    if (what === "gsData") {
        myFile += "known-WO-Gameservers.json";
        try {
            const data = fs.readFile(myFile, 'utf8');
            gsData = new Map(JSON.parse(data));
            ilog.info("Data ["+myFile+"] loaded successfully!");
        } catch (err) {
            ilog.error("Error loading data: ["+myFile+"]", err);
        }
    } else {
        myFile += "nullfile.json";
    }
    
}
loadData("gsData");

function heyBot(todo,inMsg,inGuild) {
    loadData('gsData');
	ilog.info('[Hey Bot] call, todo:'+todo.join(', ')+', inMsg: '+inMsg.content);
	var what=inMsg.content;
	var doc=nlp(what);
	let todoN = doc.after('^hey bot');
	const dout=todoN.out('array');
  	const topics= todoN.topics().out('array');
	const adjectives=todoN.adjectives().out('array');
	const verbs= todoN.verbs().out('array');
	const nouns= todoN.nouns().out('array');
	const acronyms=todoN.acronyms().out('array');
	const conjunctions=todoN.conjunctions().out('array');
	let action = todoN.verbs(0).normalize();
	let action2 = action.out('array');
	//let action1 = action.conjugate()[0].Gerund;
	//let action2 = action.conjugate()[1].toGerund();
	
	
	
	
    
    rMsg='My teacher didn\'t explain to me how to do it';
    switch (action) {
        case "asking":
            break;
        case "being":
            break;
        case "building":
            break;
        case "can":
            break;
        case "crafting":
            break;
        case "getting":
            break;
        case "going":
            break;
        case "hearing":
            break;
        case "knowing":
            break;
        case "learning":
            break;
        case "liking":
            break;
        case "looking":
            break;
        case "needing":
            break;
        case "paying":
            break;
        case "playing":
            break;
        case "reporting":
            break;
        case "seeing":
            break;
        case "sending":
            break;
        case "sleeping":
            break;
        case "showing":
            break;
        case "starting":
            break;
        case "staying":
            break;
        case "thinking":
             break;
        case "talking":
             break;
        case "telling":
             break;
        case "trying":
             break;
        case "using":
             break;
        case "wanting":
             break;
        case "watching":
             break;
        case "writing":
             break;
        default:
            rMsg='My teacher didn\'t explain to me how to do it';
        
    }

	  // Bot denkt nach...
  	inMsg.channel.send(" :robot: WurmABot thinks...").then(() => {
    		// Verzögere die Antwort um 3 Sekunden
    		setTimeout(() => {

		var bMsg = 'your message contains the follow:\n';
        bMsg +='todo-selector is: '+action2.join(", ")+' \n'
        +"___ \n"
      	+ '- topics: '+topics.join(', ')+'\n'
		+ '- adjectives: '+adjectives.join(', ')+'\n'
		+ '- verbs: '+verbs.join(', ')+'\n'

		+ '- nouns: '+nouns.join(', ')+'\n'
		 + '- acronyms: '+acronyms.join(', ')+'\n'
		+ '- conjunctions: '+conjunctions.join(', ')+'\n'
		 + '___ \n content aif doc.out is= '+ dout.join(', ')+'\n';

      		inMsg.channel.send(blockQuote(bMsg));
    		}, 2000); // 2000 Millisekunden entsprechen 2 Sekunden
  	});
}
module.exports = {heyBot};
