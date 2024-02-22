// recallCommand.js
module.exports = {
    name: 'recall',
    description: 'Calls learned contents.',
    descriptionLocalizations:{
      de: "Ruft gelernten Inhalten auf"
    },
    execute(message, args, learnedContent) {
        const keyword = args[0].toLowerCase();
        if (learnedContent.has(keyword)) {
            message.channel.send(learnedContent.get(keyword));
        } else {
            message.reply('Sorry, i didn\'t learn anything to this Keyword. 🫣');
        }
    },
};
