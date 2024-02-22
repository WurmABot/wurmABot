const {
  SlashCommandBuilder,
  bold,
  spoiler,
  quote,
  blockQuote,
} = require("discord.js");

module.exports = {
  //cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Placeholder for Dev!")
  .setDescriptionLocalizations({
    de: "Platzhalter für die Entwicklung!"
  })
  ,
  async execute(interaction) {
    const testString = "Test Demo-Text 134 ";
    const repla =
      "You use Test  🤖 - is not a Test! current: ''Formatting'' \n-🔥--+++++---🤖-\n" +
      "...............\n" +
      "Normal: Test Demo-Text 123, \n" +
      "Bold: " +
      bold(testString) +
      ",\n" +
      "Quote: " +
      quote(testString) +
      ",\n" +
      "blockQuote: " +
      blockQuote(testString) +
      ",\n" +
      "Spoiler: " +
      spoiler(testString) +
      ",\n" +
      "...............\n";
    await interaction.reply(repla);
  },
};
