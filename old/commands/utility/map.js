
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('map')
    .setDescription('Get the Link to related Map-Server.')
  .setDescriptionLocalizations({
    de: "Erzeugt einen Link zu dem entsprechenden Karten-Server."
  }),
  async execute(interaction) {
    await interaction.reply('http://harmony.yaga.host/');
  },
};
