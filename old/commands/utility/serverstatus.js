const { SlashCommandBuilder,  hyperlink } = require('discord.js');
const {https}= require('node:https');

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('serverstatus')
    .setDescription('Gives the links to Statusoverview of the Gameserver.')
  .setDescriptionLocalizations({
    de: "Gibt die Links zur Statusübersicht des Gameservers."
  }),
  async execute(interaction) {
    const xurl='https://harmony.game.wurmonline.com/battles/stats.html';
    const url= 'https://status.wurmonline.com';
    const hlink=hyperlink('Wurm-Online Statuspage', url);
    const hlink2=hyperlink('Wurm-Online Stats-Page', xurl);
    // interaction.guild is the object representing the Guild in which the command was run
    await interaction.reply(hlink+'\n ------------------------ \n'+hlink2);
  },
};
