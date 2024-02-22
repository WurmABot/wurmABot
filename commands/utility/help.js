const { SlashCommandBuilder,EmbedBuilder, hyperlink  } = require('discord.js');
const fs = require('fs');

/*const dinfo ='# WurmABot - Help #\n'
  +'`This are the current possible commands, that you can run on the Bot:`\n'

+'## Topic related commands ##'+'\n'
+' Use:\n'
+'``` /map\t\t\t\t shows the Link to the MapServer of prefered Gameserver\n'
+' /serverfeed\t\t shows the Link to the Newsfeed of prefered Gameserver\n'
+' /serverstatus\t\t shows the Link to the Statuspages of prefered Gameserver\n'
+' /wplink (article)\t get a Link to Wurmpedia (or the given Article)```\n' 
+'## Bot related commands ##\n'
+' Use:\n'
+'``` /help\t\t\t show this help\n'
+' /ping\t\t\t answers with pong\n'
+' /reload\t\t\t reloads a command\n'
+' /info\t\t\t shows informations about a User (option: user) or the Server (option: server)```\n\n'

+'***\n'+'P.S. The Bot is still in development, so there might be some bugs. If you find any, please report them to the Bot-Creator.\n\n'
+'Thank you for using the Bot.***';
*/
const cmdListA= '```'+'/map\t\t\t\t shows the Link to the MapServer of prefered Gameserver\n\n'
  +'/serverfeed\t\t shows the Link to the Newsfeed of prefered Gameserver\n\n'
  +'/serverstatus\t\t shows the Link to the Statuspages of prefered Gameserver\n\n'
  +'/wplink (article)\t get a Link to Wurmpedia (or the given Article)```\n\n';
const cmdListB='```'+'/help\t\t\t show this help\n'
+'/ping\t\t\t answers with pong\n'
+'/reload\t\t\t reloads a command\n'
+'/info\t\t\t shows informations about a User (option: user) or the Server (option: server)```\n\n'
const Footer='  P.S.   The Bot is still in development, so there might be some bugs. If you find any, please report them to the Bot-Creator.\n\n'
  +'Thank you for using the Bot, WurmABot2 ';
const hdata= new SlashCommandBuilder();
  hdata.setName('help')
  .setDescription('Help-Page of WurmABot2')
.setDescriptionLocalizations({
  de: "Hilfeseite von WurmABot2"
});
const hEmbed = new EmbedBuilder()
  .setColor(0x0099FF)
  .setTitle('WurmABot2 - Help')  
  .setDescription('WurmABot2 help - This are the current possible commands, that you can run on the Bot:\nBut better is you look in my Wiki:'+hyperlink('WurmABot Wiki','https://github.com/WurmABot/wurmABot/wiki'))
.setAuthor({ name: 'Thironix'})
.addFields(
  { name: 'Topic related commands', value: cmdListA },
  { name: '\u200B', value: '\u200B' },
  { name: 'Bot related commands', value: cmdListB},
  
).setTimestamp()
.setFooter({ text: Footer});

module.exports = {
//  cooldown: 5,
   data: hdata,
  async execute(interaction) {
     await interaction.reply({ embeds: [hEmbed] });
    
  }
  
};
