const { SlashCommandBuilder,  hyperlink } = require('discord.js');
const url="https://harmony.game.wurmonline.com/battles/server_feed.xml";

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('serverfeed')
    .setDescription('Gives Newsfeed of the current Gameserver.')
    .setDescriptionLocalizations({
      de: "Zeigt den Link zum Newsfeed des aktuellen Gameservers"
  }),
  async execute(interaction) {
    // interaction.guild is the object representing the Guild in which the command was run
    
    await interaction.reply('News from Harmony-Server:\n'+'+----------------------------------------+\n'+hyperlink('Newsfeed of Harmony',url));
  },
};
