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
	let todoN = doc;
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
var showDevInfo=false;
    switch (action2) {
        case "ask":
		rMsg="Need to perfom Ask-Action";
		    
            break;
        case "write":
		rMsg="Need to perfom Write-Action";
             break;
	case "learn":
		rMsg="Need to perfom Learn-Action";
             break;
	    case "know":
	    case "didn't know":
	    case "don't know":
		    rMsg="Need to perfom Know-Action";
	   break;
	 case "can":
		rMsg="Need to perfom Can-Action";
		    break;
	case "is":
		rMsg="Need to perfom is-Action";
		showDevInfo==true;
		break;
	break;
        default:
            rMsg='My teacher didn\'t explain to me how to do it';
        
    }

	  // Bot denkt nach...
  	inMsg.channel.send(" :robot: WurmABot thinks...").then(() => {
    		// Verzögere die Antwort um 3 Sekunden
    		setTimeout(() => {
	if (showDevInfo==true) {
		var bMsg = 'your message contains the follow:\n';
        bMsg +='todo-selector is: '+action2+' \n';
        bMsg +="___ \n";
      	bMsg += '- topics: '+topics.join(', ')+'\n';
	bMsg += '- adjectives: '+adjectives.join(', ')+'\n';
	bMsg += '- verbs: '+verbs.join(', ')+'\n';

	bMsg += '- nouns: '+nouns.join(', ')+'\n';
	bMsg += '- acronyms: '+acronyms.join(', ')+'\n';
	bMsg += '- conjunctions: '+conjunctions.join(', ')+'\n';
	bMsg +=  '___ \n content aif doc.out is= '+ dout.join(', ')+'\n';
	bMsg +=  '___ \n';
	bMsg += 'results in:'+rMsg;
	}
	else {
		bMsg=rMsg;
	}
      		inMsg.channel.send(blockQuote(bMsg));
    		}, 2000); // 2000 Millisekunden entsprechen 2 Sekunden
  	});
}
module.exports = {heyBot};
