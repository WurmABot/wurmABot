module.exports = {
    name: 'learn',
    description: 'teaches the bot a new content, or changes the old ones.',
     descriptionLocalizations:{
    de: "Lehrt den Bot neue Inhalte, oder ändert alte"
  },
    execute(message, args, learnedContent) {
        const keyword = args.shift().toLowerCase();
        const content = args.join(' ');
        learnedContent.set(keyword, content);
        message.reply(`Ich habe \`${keyword}\` gelernt!`);
    },
};
