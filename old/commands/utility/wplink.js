const { SlashCommandBuilder, hyperlink, hideLinkEmbed  } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('wplink')
    .setDescription('Create a Link to a given Wurmpedia Article')
    .setDescriptionLocalizations({
      de: "Erzeugt einen Link zu einem Wurmpedia Artikel"
    })
    .addStringOption(option =>
        option.setName('input')
          .setDescription('The related Aricle for Link to (can be empty for getting Mainpage)')
          .setDescriptionLocalizations({
        de: "Der zu verlinkende Artikel (Leer lassen, um die Startseite zu erhalten)"
      })
        .setRequired(false),
    ),
    async execute(interaction) {
      
      let xresIn= "";
      
      var inputStr=interaction.options.getString('input');
      if(inputStr != null) {
       xresIn = '/index.php/'+inputStr;
      }
    
      const result = inputStr?? (xresIn || "https://www.wurmpedia.com/");
      

      const link = hyperlink(inputStr ?? 'MainPage'+' at WurmPedia', result);
     // const hiddenEmbed = hideLinkEmbed(result);

      
      await interaction.reply('See: '+link);
    },
};
