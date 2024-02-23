const { bold, hyperlink, blockQuote } = require('discord.js');
const nlp = require('compromise');
const ilog= require('../logger/logger.js');
// const { capitalize } = require('../utils.js');
//const coreMap = require("../data/coreMap.js");

function heyBot(todo,inMsg,inGuild) {
	ilog.info('Hey Bot call, todo:'+todo+', inMsg: '+inMsg.content);
	var what=inMsg.content.toLowerCase();
	var todoN=what.replace('hey bot,','');
    var doc=nlp(todoN);
    var action = doc.verbs(0).normalize(); //doing what?

	const dout=doc.out('array');
  	const topics= doc.topics().out('array');
	const adjectives=doc.adjectives().out('array');
	const verbs= doc.verbs().out('array');
	const nouns= doc.nouns().out('array');
	const acronyms=doc.acronyms().out('array');
	const conjunctions=doc.conjunctions().out('array');

	  // Bot denkt nach...
  	inMsg.channel.send(" :robot: WurmABot thinks...").then(() => {
    		// Verzögere die Antwort um 3 Sekunden
    		setTimeout(() => {

		var bMsg = 'your message contains the follow:\n';
        bMsg +='todo-selector is: ' +action +"\n"
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

