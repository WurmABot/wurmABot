const { Client, Collection } = require("discord.js");
// Import Discord.Js.
const client = new Client({ intents: 32767 });
// Make New Discord Client.
module.exports = client;
// Export Client To Give Other Files Access.

// ———————————————[Global Variables]———————————————
client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();
client.slashCommands = new Collection();
client.bottons= new Collection();
client.selectMenus= new Collection();
client.config = require("./bot-config/main.json");
require("./handler")(client);
// Initializing the project.

// ———————————————[Logging Into Client]———————————————
const token = process.env["DISCORD_TOKEN"] || client.config.DISCORD_TOKEN;
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
   console.log("—————————————————————————————————");
   console.log("[AntiCrash] : Unhandled Rejection/Catch");
   console.log("—————————————————————————————————");
   console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
   console.log("—————————————————————————————————");
   console.log("[AntiCrash] : Uncaught Exception/Catch");
   console.log("—————————————————————————————————");
   console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
   console.log("—————————————————————————————————");
   console.log("[AntiCrash] : Multiple Resolves");
    console.log("—————————————————————————————————");
   console.log(type, promise, reason);
});
