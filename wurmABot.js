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

// Create a new client instance
// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(chalk.green(`Ready! Logged in as ${readyClient.user.tag}`));
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
		iMsg=msg.toLowerCase();
		if(iMsg === "ping") {
    			let m = await message.channel.send("Ping?");
    			m.edit(`Pong! Latency is ${m.createdTimestamp - 
    			message.createdTimestamp} ms. API Latency is 
    			${Math.round(client.ping)} ms`);
		}
		
		else {
		
            		let msg= message;
            		let {guild} = msg;
            		let wo=(guild ? guild.id : "DM");
			const rMsg="'''cyan WurmABot2.1.0alpha [core] '''\n_____\n";
	
            		logger.info(chalk.green('[Info]')+ 'eingehende Nachricht: ['+message.content+'] | in '+wo+'/channel='+message.channel);
			rMsg +=	" [debug] you write: "+message.content +"\n";
			message.cannel.send(rMsg);
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
