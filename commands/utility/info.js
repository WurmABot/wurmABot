const {
  SlashCommandBuilder,
  bold,
  italic} = require("discord.js");

const xdata = new SlashCommandBuilder()
.setName('info')
.setDescription('Get info about a user or a server!')
.setDescriptionLocalizations({
    de: "Gibt Informationen zu einem Benutzer oder dem Server aus."
  })
.addSubcommand(subcommand =>
  subcommand
    .setName('user')
    .setDescription('Info about a user')
  .setDescriptionLocalizations({
    de: "Informationen über einen Benutzer."
  })

    .addUserOption(option => option.setName('target').setDescription('The user')))
  .setDescriptionLocalizations({
    de: "Der Benutzer."
  })

.addSubcommand(subcommand =>
  subcommand
    .setName('server')
    .setDescription('Info about the server'))
.setDescriptionLocalizations({
  de: "Informationen über den Server."
});

module.exports = {
  //cooldown: 5,
  data: xdata,
  async execute(interaction) {
    if (interaction.options.getSubcommand() === 'user') {        
      const user = interaction.options.getUser('target');
      if (user) {
        await interaction.reply(""+bold(user.username)+", Id: "+user.id+", Tag: "+user.tag+"\n"
                                 +"-----------------------------------------------------------\n"
                                 +" - Joined:  "+user.joinedAt +"\n"
                                 +" - Created: "+user.createdAt+"\n"
                                 +" - Avatar:  "+"https://cdn.discordapp.com/avatars/"+user.id+"/"+user.avatar+".png?size=132"+"\n"
                                 +"----------- [Gamerprofile] --------------------------------------\n"
                                 +"- known Chars: "+italic('not supported yet')+"\n"
                                 +"- known Deeds: "+italic('not supported yet')+"\n"
                                 +"- known Gold: "+italic('not supported yet')+"\n"
                                 +"- known Items: "+italic('not supported yet')+"\n"
                                 +"- known Skills: "+italic('not supported yet')+"\n"
                                 +"- known Titles: "+italic('not supported yet')+"\n"
                                 +"----------- [Gamer interests] --------------------------------------\n"
                                 +"- PvP: "+italic('not supported yet')+"\n"
                                 +"- Rifts: "+italic('not supported yet')+"\n"
                                 +"- Treasure Hunting: "+italic('not supported yet')+"\n"
                                 +"- Archeology: "+italic('not supported yet')+"\n"
                                 +"- Others: "+italic('not supported yet')+"\n"
                                 +"----------- [Server Interaction] ------------------------------------\n"
                                 +"- Points total: "+italic('not supported yet')+"\n"
                                 +"- Points reactions: "+italic('not supported yet')+"\n"
                                 +"- Points forums: "+italic('not supported yet')+"\n"
                                 +"- Points events: "+italic('not supported yet')+"\n"
                                 +"----------- [Discord advanced] --------------------------------------\n"
                                 +" - Nickname: "+user.nickname+"\n"
                                 +" - Is a Bot: "+user.bot+"\n"
                                 +" - Is a System: "+user.system+"\n"
                                 +" - Is a Webhook: "+user.webhook+"\n"
                                 +" - Is a Deafened: "+user.deaf+"\n"
                                 +" - Is a Muted: "+user.mute+"\n"
                                 +" - Is a Pending: "+user.pending+"\n"
                                 +" - Is a Suppressed: "+user.suppressed+"\n"
                                  +"-----------------------------------------------------------\n"
                                 + " WurmABot2 - Userprofile-Mod 1.0.0"
                                 );
           }
      }
      else {
        // The Serverinfo..
        await interaction.reply(" "+bold(interaction.guild.name)+", Id: "+interaction.guild.id+", Tag: "+interaction.guild.tag+"\n"
                                +"+-----------------------------------------------------------+\n"
                                +" - Joined:  "+interaction.guild.joinedAt +"\n"
                                +" - Created: "+interaction.guild.createdAt+"\n"
                                +" - Avatar:  "+"https://cdn.discordapp.com/icons/"
                                +interaction.guild.id+"/"+interaction.guild.icon+".png?size=132"+"\n"
                                +"+-----------------------------------------------------------+\n"
                                +" - Total Members: "+interaction.guild.memberCount+"\n"
                                +" - Total Bots: "+interaction.guild.members.cache.filter(member => member.user.bot).size+"\n"
                                +"+-----------------------------------------------------------+\n"
                                +" - Total Text-Channels: "+interaction.guild.channels.cache.filter(channel => channel.type === 'text').size+"\n"  
                                +" - Total Voice-Channels: "+interaction.guild.channels.cache.filter(channel => channel.type === 'voice').size+"\n"
                                +" - Total Categories: "+interaction.guild.channels.cache.filter(channel => channel.type === 'category').size+"\n"
                                +" - Total Announcement-Channels: "+interaction.guild.channels.cache.filter(channel => channel.type === 'news').size+"\n"
                                +" - Total Stage-Channels: "+interaction.guild.channels.cache.filter(channel => channel.type === 'stage').size+"\n"
                                +"+-----------------------------------------------------------+\n"
                                +"  WurmABot2 - Serverprofile-Mod 1.0.0\n"
                                );
                                
    }
  }
};
