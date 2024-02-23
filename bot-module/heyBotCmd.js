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
	ilog.info('[Hey Bot] call, todo:'+todo+', inMsg: '+inMsg.content);
	var what=inMsg.content.toLowerCase();
	var todoN=what.replace('hey bot,','');
    
    var doc=nlp(todoN);
    


	const dout=doc.out('array');
  	const topics= doc.topics().out('array');
	const adjectives=doc.adjectives().out('array');
	const verbs= doc.verbs().out('array');
	const nouns= doc.nouns().out('array');
	const acronyms=doc.acronyms().out('array');
	const conjunctions=doc.conjunctions().out('array');
	var actions = doc.verbs.normalize(); //doing what?
	var actionsx = actions.conjugate(); //doing what?
	var action = doc.verbs.normalize(); //doing what?
    var actionator =actionsx[0];
    var action2 = doc.verbs(1).normalize(); //doing what?
    var actionator2 =actionsx[1];
    
    rMsg='My teacher didn\'t explain to me how to do it';
    switch (actionator) {
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
        bMsg +='todo-selector is: ${actionator} and  ${actionator2} \n'
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
