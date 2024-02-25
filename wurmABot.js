const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection,Events,GatewayIntentBits, blockQuote, Shard} = require("discord.js");
const client = new Client({ intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	], });
const chalk = require("chalk"); // for colors in our Logger..
const logger = require('./logger/logger.js'); // for Pino in Console Log..
const nlp = require("compromise"); // WordHandling..
const {heyBot} = require('./bot-module/heyBotCmd.js'); // the message ai of the bot...
/*
 *
 * Some Collections..
 *
 */

client.cooldowns = new Collection();
client.commands = new Collection();
/*
 *
 * Some others.. :)
 *
 */

let messageProcessed= new Set();
let tempSet= new Map();
export.modules=client;
/*
 *
 *   EventHandlers..
 *	Shards and Client defaults..
 *
*/

client.once(Events.ClientReady, readyClient => {
	//console.log(chalk.green(`[Info]`)+` Ready! Logged in as ${readyClient.user.tag}`);
	logger.info("WurmABot (main): "+chalk.green(`Ready!`)+` Logged in as ${readyClient.user.tag}`);
	tempSet.set('ClientData',readyClient.

});

client.once(Events.Disconnect, shardInfo => {
	//console.log(chalk.green(`[Info]`)+` Ready! Logged in as ${readyClient.user.tag}`);
	logger.error("WurmABot (main) - Shard #"+shardInfo.id+": "+chalk.red(`[Disconnect-Event] - handler undefined.`));

});
client.once(Events.Death, shardInfo => {
	//console.log(chalk.green(`[Info]`)+` Ready! Logged in as ${readyClient.user.tag}`);
	logger.error("WurmABot (main) - Shard #"+shardInfo.id+": "+chalk.red(`[Death-Event] - handler undefined.`));
});
client.once(Events.Timeout, shardInfo => {
	//console.log(chalk.green(`[Info]`)+` Ready! Logged in as ${readyClient.user.tag}`);
	logger.error("WurmABot (main) - Shard #"+shardInfo.id+": "+chalk.red(`[Timeout-Event] - handler undefined.`));
});
client.once(Events.Respawn, shardInfo => {
	//console.log(chalk.green(`[Info]`)+` Ready! Logged in as ${readyClient.user.tag}`);
	logger.error("WurmABot (main) - Shard #"+shardInfo.id+": "+chalk.red(`[Respawn-Event] - handler undefined.`));
	tempSet.set('shardId',shardInfo.id);
});
/*
 *  scan BotCommands-Folder for matching files..
 *
 */
const foldersPath = path.join(__dirname, 'botCmds');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			logger.warn(`[WARNING:WurmABot.js] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
/*
 *
 * Event Handlers -- the real actions..
 * 1) InteractionCreate: Commands I/O of the Bot World..
 *
 */
client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (!command) {
		logger.error(`[WurmABot.js] No command matching ${interaction.commandName} was found.`);
		return;
	}

	const { cooldowns } = interaction.client;
	if (!cooldowns.has(command.data.name)) {
		cooldowns.set(command.data.name, new Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.data.name);
	const defaultCooldownDuration = 3;
	const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

	if (timestamps.has(interaction.user.id)) {
		const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

		if (now < expirationTime) {
			const expiredTimestamp = Math.round(expirationTime / 1000);
			return interaction.reply({ content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
		}
	}

	timestamps.set(interaction.user.id, now);
	setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

	try {
		await command.execute(interaction);
	} catch (error) {
		logger.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: '[WurmABot Error] \n There was an error while executing this command!', ephemeral: true });

		} else {
			await interaction.reply({ content: '[WurmABot Error] \n There was an error while executing this command!', ephemeral: true });
		}
	}


	if (commandName === 'send') {
		const id = interaction.options.getString('destination');

		return client.shard.broadcastEval(async (c, { channelId }) => {
			const channel = c.channels.cache.get(channelId);
			if (channel) {
				await channel.send(`[WurmABot Notice] \n This is a message from shard ${client.shard.ids.join(',')}!`);
				return true;
			}
			return false;
		}, { context: { channelId: id } })
			.then(sentArray => {
				if (!sentArray.includes(true)) {
					return interaction.reply('[WurmABot Error] \n I could not find such a channel.');
				}

				return interaction.reply(`[WurmABot Notice] \n I have sent a message to channel: \`${id}\`!`);
			});
	}

	if (commandName === 'emoji') {
		const emojiNameOrId = interaction.options.getString('emoji');

		return client.shard.broadcastEval(findEmoji, { context: { nameOrId: emojiNameOrId } })
			.then(emojiArray => {
				// Locate a non falsy result, which will be the emoji in question
				const foundEmoji = emojiArray.find(emoji => emoji);
				if (!foundEmoji) return interaction.reply('[WurmABot Notice] \n I could not find such an emoji.');
				return interaction.reply(`[WurmABot Info] \n I have found the ${foundEmoji.animated ? `<${foundEmoji.identifier}>` : `<:${foundEmoji.identifier}> emoji!`}!`);
			});
	}
});

/*
 *
 * Event Handlers -- the real actions..
 * 2) MessageCreate: Message I/O of the Bot World..
 *
 */

client.on(Events.MessageCreate, message => {
           // Überprüfen, ob die Nachricht vom Bot stammt oder kein Text enthält
           	if (message.author.bot || !message.content) {
			messageProcessed.add(message.id);
			return;
		}
          	if (messageProcessed.has(message.id)) {
            		return;
          	}

	let msg= message;
	let {guild} = msg;
        let wo=(guild ? guild.id : "DM");
	let iMsg=message.content;
	iMsg=iMsg.toLowerCase();
        logger.info(' Nachricht-Eingang: ['+message.content+'] | in serverId='+wo+'/channel='+message.channel);
	//let doc = nlp(message.content);
     if(iMsg.startsWith('hey bot,')){
	 let doc = nlp(message.content);
         let todo = doc.after('^hey bot,');
	 logger.info(' Executing heyBot..');
         heyBot(todo,message,guild);
     }
  /* let textToAnalyze;
  let inMsg= message.content;

  let bMsg = `I mean `;
  if (inMsg.startsWith(prefix1) || inMsg.startsWith(prefix2)) {
  	if (inMsg.startsWith(prefix1)) {
    		textToAnalyze = inMsg.slice(prefix1.length).trim();
  	} else if (inMsg.startsWith(prefix2)) {
    		textToAnalyze = inMsg.slice(prefix2.length).trim();
  	} else {
    		bMsg = `I'm sorry, I didn't understand: ${inMsg}`;
    		message.channel.send(bMsg);
    		return; // Beende die Funktion, wenn keines der Präfixe übereinstimmt
  	}

  	const doc = nlp(textToAnalyze);
	const dout=doc.out('array');
  	const topics= doc.topics().out('array');
	const adjectives=doc.adjectives().out('array');
	const verbs= doc.verbs().out('array');
	const nouns= doc.nouns().out('array');
	const acronyms=doc.acronyms().out('array');
	const conjunctions=doc.conjunctions().out('array');

	  // Bot denkt nach...
  	message.channel.send(" :robot: WurmABot thinks...").then(() => {
    		// Verzögere die Antwort um 3 Sekunden
    		setTimeout(() => {
      		const doc = nlp(textToAnalyze);
		bMsg += 'your message contains the follow:\n';
      		bMsg += '- topics: '+topics.join(', ')+'\n';
		bMsg += '- adjectives: '+adjectives.join(', ')+'\n';
		bMsg += '- verbs: '+verbs.join(', ')+'\n';

		bMsg += '- nouns: '+nouns.join(', ')+'\n';
		bMsg += '- acronyms: '+acronyms.join(', ')+'\n';
		bMsg += '- conjunctions: '+conjunctions.join(', ')+'\n';
		bMsg += '___ \n content aif doc.out is= '+ dout.join(', ')+'\n';

      		message.channel.send(blockQuote(bMsg));
    		}, 2000); // 2000 Millisekunden entsprechen 2 Sekunden
  	});


    // Weitere Analysen und Aktionen können hier hinzugefügt werden
  }*/

 else if (message.content.toLowerCase() === '.ping') {
             			message.channel.send('Loading data').then (async (msg) =>{
                  		msg.delete()
                    		message.channel.send(`🏓 ping\n`+blockQuote(` '''Latency''' is ${msg.createdTimestamp - message.createdTimestamp} ms \n API Latency is                  ${Math.round(client.ws.ping)} ms`));
             			});

 } else if (message.content.toLowerCase() === 'hello') {
               			// Senden Sie eine Antwort auf die Nachricht
               			message.channel.send('Hello '+message.author.displayName+'! \n'+'My name is WurmABot.\n'+'Iam Artificial intelligence (AI) - Bot.\n'+'For reactions from me, make please a Chat-Input whith the beginning of \"hey bot,\"  - than i will try to help you.');
    } else if (message.content.toLowerCase() === 'hey bot') {
             			message.channel.send('hey '+message.author.displayName).then (async (msg) =>{
                  		//msg.delete()
                    		message.channel.send(` :robot: `+blockQuote(`..Iam WurmAbot, what did like todo today?\n`
		      				+`If you whish, that i answer to you better , you must add [hey bot,] for that question (or expression). `));
				});
			}
			else {

			}

		//message.channel.send(chalk.orange("Information")+"Bot RoleBack.. i run only in basic mode.\n"+chalk.orange.bold("You enter: ")+message.content);
           // Reagieren auf die Nachricht je nach Inhalt


  messageProcessed.add(message.id);
});

// ———————————————[Logging Into Client]———————————————
const token = process.env["DISCORD_TOKEN"] || client.config.DISCORD_TOKEN;

/*
 *
 *
 *      PROCESS HANDLERS..
 *
 *
*/

client.login(token);
if(token === ""){
   console.log("—————————————————————————————————");
   console.log("[AntiCrash] :Invalid Token");
   console.log("—————————————————————————————————");
   console.log("There Are 2 Ways To Fix This");
   console.log("Put Your Bot Token in:");
   console.log("1.) index.js On the client.login line remove client.login(token) and write client.login('Your token')");
   console.log("2.) ENV/Secrets If using replit, make new secret named 'DISCORD_TOKEN' and put your token in it else, if your using VsCode, Then Follow Some ENV tutorials (I don't suggest using it in VSC)" );
} else {
   client.login(token);
}
// Login The Bot.
// ———————————————[Error Handling]———————————————
process.on("unhandledRejection", (reason, p) => {

   logger.level = 'trace';
   logger.error("—————————————————————————————————");
   logger.error("[AntiCrash] : Unhandled Rejection/Catch");
   logger.error("—————————————————————————————————");
   logger.debug(reason, p);

});
process.on("uncaughtException", (err, origin) => {
   logger.level = 'trace';
   logger.error("—————————————————————————————————");
   logger.error("[AntiCrash] : Uncaught Exception/Catch");
   logger.error("—————————————————————————————————");
   logger.debug(err, origin);

});
process.on("multipleResolves", (type, promise, reason) => {
	logger.level = 'trace';
   logger.error("—————————————————————————————————");
   logger.error("[AntiCrash] : Multiple Resolves");
   logger.error("—————————————————————————————————");
   logger.debug(type, promise, reason);

});
