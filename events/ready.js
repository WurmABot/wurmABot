const client = require("../bot.js");
//const chalk = require("chalk");
const { version: discordjsVersion } = require("discord.js");
const { prefix } = require("../bot-config/main.json");
const main_json = require("../bot-config/main.json");

client.on("ready", async () => {
  const supportServer = client.guilds.cache.get(`${main_json.TestingServerID}`);
  if (!supportServer) return console.log("");
  // ———————————————[Status]———————————————
  client.user.setActivity(
    `${prefix}help || ${client.guilds.cache.size} ${
      client.guilds.cache.size > 1 ? "Servers" : "Server"
    }`,
    { type: "WATCHING" }
  );
  // ———————————————[Ready MSG]———————————————
  console.log("[Info] Success!"));
  console.log("[Info] Connected to ${client.user.tag}`);
  /*console.log("[Info] Watching ",({
    client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)),
     client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1
          ? " Users,"
          : " User,"
    })," ",client.guilds.cache.size," ",({client.guilds.cache.size > 1 ? " Servers." : "Server."})
}));
*/
  console.log('[Info] Prefix:' + prefix+ "||"+client.commands.size+" Commands");
  console.log('[Info] Support-Server:'+{ supportServer.name || "None"});
  console.log("");
  console.log("——————————[Statistics]——————————");
  console.log(`Discord.js Version: ${discordjsVersion}\nRunning on Node ${process.version} on ${process.platform} ${process.arch}`);
  console.log(`Memory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(
        2
      )} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
        2
      )} MB`
    );
  
});
/*
 * ———————————————[Credits]———————————————
 * Made by : DrakeZee#5223
 * Support Server : dsc.gg/BotsWay
 * Youtube : youtube.com/DrakeZee
 * Please Help Me Reach 1k Subs DJs Codes And More Amazing * Stuff!
 * Also Add Me Friend When Using This, I Have No Friends :(
 *
 * This Was Only Possible By Following People :
 *
 * recon#8448  | youtube.com/reconlxx | discord.gg/recon
 * Tomato#6966 | milrato.dev         | discord.gg/milrato
 */
