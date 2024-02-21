const { Events } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`[Info] Ready! Logged in as ${readyClient.user.tag} with userid: ${readyClient.user.id}, uptime:  ${readyClient.uptime} - we are on ${readyClient.guilds.cache.size} server(s)!');
  },
};
