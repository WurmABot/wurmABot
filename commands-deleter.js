const { REST, Routes } = require('discord.js');

const token = process.env['DISCORD_TOKEN'];
client.config = require("./bot-config/main.json");

const clientId = config.clientid;
const guildId= config.TestingServerID;

const rest = new REST().setToken(token);
console.log('[Info] Start for deletion all commands..');
// ...

// for guild-based commands
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
	.then(() => console.log('[Info] Successfully deleted all guild commands.'))
	.catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(clientId), { body: [] })
	.then(() => console.log('[Info] Successfully deleted all application commands.'))
	.catch(console.error);
