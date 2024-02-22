const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const globPromise = promisify(glob);
const mainjson = require("../botconfig/main.json");

module.exports = async (client) => {
  // ———————————————[Commands]———————————————
  const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
  commandFiles.map((value) => {
    const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];

    if (file.name) {
      const properties = { directory, ...file };
      client.commands.set(file.name, properties);
    }
  });

  // ———————————————[Events]———————————————
  const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
  eventFiles.map((value) => require(value));

  // ———————————————[Slash Commands]———————————————
  const slashCommands = await globPromise(
    `${process.cwd()}/SlashCommands/*/*.js`
  );

  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
    const file = require(value);
    if (!file?.name) return;
    client.slashCommands.set(file.name, file);

    if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
    arrayOfSlashCommands.push(file);
  });
  client.on("ready", async () => {
    // Register for a single guild
    if (mainjson.TestingServerID === "Your Server ID") {
      console.log("—————————————————————————————————");
      console.log("[AntiCrash] : Couldn't Find ServerID to set the Slash Cmds");
      console.log("—————————————————————————————————");
      console.log("Please Fix it with following methods.");
      console.log("1.) Go to bot-config/main.json and put your \nSupportServer/TestServer ID in the TestingServerID String!");
      console.log("2.) Use Global Slash Commands by changing line no 74 to\n await client.application.commands.set(arrayOfSlashCommands);\n in the else statement.");
    } else {
      await client.guilds.cache
        .get(mainjson.TestingServerID)
        .commands.set(arrayOfSlashCommands);

      // Register for all the guilds the bot is in
      // await client.application.commands.set(arrayOfSlashCommands);
    }
  });
};

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
