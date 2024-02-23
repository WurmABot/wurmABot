const { Client, Collection,Events,GatewayIntentBits } = require("discord.js");
// Import Discord.Js.
const client = new Client({ intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	], });
const chalk = require("chalk");
const logger = require('./logger/logger.js');
const nlp = require("compromise");

// Create a new client instance
// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(chalk.green(`[Info]`)+` Ready! Logged in as ${readyClient.user.tag}`);
	logger.info(chalk.green(`Ready! Logged in as ${readyClient.user.tag}`));
});


client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();
client.slashCommands = new Collection();
client.bottons= new Collection();
client.messages= new Collection();
client.selectMenus= new Collection();
client.config = require("./bot-config/main.json");
let messageProcessed= new Set();
client.on(Events.MessageCreate, message => {
           // Überprüfen, ob die Nachricht vom Bot stammt oder kein Text enthält
           	if (message.author.bot || !message.content) {
			messageProcessed.add(message.id);
			return;
		}
          	if (messageProcessed.has(message.id)) {
            		return;
          	}
		if (message.content.startsWith("bot,") || message.content.startsWith("hey bot,")) {
			const prefix=",";
			const args = message.content.slice(prefix.length).trim().split(/ +/);
  			const command = args.shift().toLowerCase();
	
    			const textToAnalyze = args.join(' ');
    			const doc = nlp(textToAnalyze);
		       // Beispielanalyse: Anzeigen der Schlüsselwörter
    			const keywords = doc.keywords().out('array');
    			message.channel.send(`Schlüsselwörter: ${keywords.join(', ')}`);
		}
		else {

    // Weitere Analysen und Aktionen können hier hinzugefügt werden
  
			let msg= message;
            		let {guild} = msg;
			var pmsg=message.content;
			var iMsg=pmsg.toLowerCase();
            		let wo=(guild ? guild.id : "DM");
			console.log(chalk.green('[Info]')+ 'eingehende Nachricht.');
            		logger.info(chalk.green('[Info]')+ 'eingehende Nachricht: ['+message.content+'] | in '+wo+'/channel='+message.channel);
			if (message.content.toLowerCase() === '.ping') {
             			message.channel.send('Loading data').then (async (msg) =>{
                  		msg.delete()
                    		message.channel.send(`🏓  '''Latency''' is ${msg.createdTimestamp - message.createdTimestamp} ms \n API Latency is                  ${Math.round(client.ws.ping)} ms`);
             			});
				
           		} else if (message.content.toLowerCase() === 'hallo') {
               			// Senden Sie eine Antwort auf die Nachricht
               			message.channel.send('Hallo! Wie kann ich Ihnen helfen?');
           		} else if (message.content.toLowerCase() === 'hey bot') {
             			message.channel.send('hey '+message.author.name).then (async (msg) =>{
                  		//msg.delete()
                    		message.channel.send(` :robot: ..Iam WurmAbot, what did like todo today?\n"
		      				+"If you whish, that i answer to a question, you must add [hey bot,] for that question (or expression). `);
				});
			}
			else {
				
			}
		
		//message.channel.send(chalk.orange("Information")+"Bot RoleBack.. i run only in basic mode.\n"+chalk.orange.bold("You enter: ")+message.content);
           // Reagieren auf die Nachricht je nach Inhalt
		
		}
  messageProcessed.add(message.id);
});
	
// ———————————————[Logging Into Client]———————————————
const token = process.env["DISCORD_TOKEN"] || client.config.DISCORD_TOKEN;


// Log in to Discord with your client's token
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
   logger.error("—————————————————————————————————");
   logger.error("[AntiCrash] : Unhandled Rejection/Catch");
   logger.error("—————————————————————————————————");
   logger.error(reason, p);
});
process.on("uncaughtException", (err, origin) => {
   logger.error("—————————————————————————————————");
   logger.error("[AntiCrash] : Uncaught Exception/Catch");
   logger.error("—————————————————————————————————");
   logger.error(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
   logger.error("—————————————————————————————————");
   logger.error("[AntiCrash] : Multiple Resolves");
   logger.error("—————————————————————————————————");
   logger.error(type, promise, reason);
});
