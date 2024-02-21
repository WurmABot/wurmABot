const fs = require('node:fs');
const path = require('node:path');
const learnCommand = require('./bot-module/learnCmd.js');
const recallCommand = require('./bot-module/recallCmd.js');
const saveLearnedContent = require('./bot-module/saveCmd.js');
const {Client, Collection, Intents , GatewayIntentBits, Events, hyperlink, blockQuote, bold} = require('discord.js');
//const nlp = require('compromise');
//const {capitalize}=require('./utils.js');
//const { findArticle } = require('./wurmpedia.mjs');
const learnedContentFile = './sharedData/learned_content.json';
const serversConfigFile = './sharedData/serversConfig.json';
let learnedContent = new Map();
let serverConfig = new Map();
fs.readFile(learnedContentFile, 'utf8', (err, data) => {
  if (err) return console.error(err);
  learnedContent = new Map(JSON.parse(data));
});
fs.readFile(serversConfigFile, 'utf8', (err, data) => {
  if (err) return console.error(err);
  serverConfig = new Map(JSON.parse(data));
});

//const {qaMapWhatIs}= require('./jsmaps/questionList.default.js');
const whatIs=require('./bot-module/whatIs.js');
const { token } =  process.env['DISCORD_TOKEN'];


const client = new Client({ intents: [GatewayIntentBits.Guilds,
                                      GatewayIntentBits.GuildMessages,
                                      GatewayIntentBits.MessageContent,
                                      GatewayIntentBits.GuildMembers,
                                     ] });

client.commands = new Collection();

let startTime;
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
});
client.once('ready', () => {
   console.log('[Info] Der Bot ist bereit! user.tag: ' + client.user.tag + ', user.id: ' + client.user.id+', nickname: ' + client.user.nickname);            
   startTime=Date.now();
   client.user.setActivity("my code", { type: "WATCHING"})
});
client.on('guildMemberAdd', async member => {
    const { guild } = member;
    const channel = guild.systemChannel; // You can change this to any channel you want

    if (!channel) return; // Ensure a system channel is available

    const welcomeMessage = `
    Welcome to the server, ${member.user.username}! We're glad you're here.
    `;

    // Set up the welcome screen
    await guild.setWelcomeScreen({
        enabled: true,
        description: welcomeMessage,
        title: 'Welcome to Our Server!' // You can customize this title
    });
});

// Event-Handler für das message-Event
client.on(Events.MessageCreate, message => {

           // Überprüfen, ob die Nachricht vom Bot stammt oder kein Text enthält
           if (message.author.bot || !message.content) return;
            let msg= message;
            let {guild} = msg;
            let wo=(guild ? guild.id : "New private message");
            console.log('[Info] eingehende Nachricht: ['+message.content+'] | in '+wo+"/channel="+message.channel);
           // Reagieren auf die Nachricht je nach Inhalt
           if (message.content.toLowerCase() === 'ping') {
             message.channel.send('Loading data').then (async (msg) =>{
                  msg.delete()
                    message.channel.send(`🏓Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is                  ${Math.round(client.ws.ping)} ms`);
             });
           } else if (message.content.toLowerCase() === 'hallo') {
               // Senden Sie eine Antwort auf die Nachricht
               message.channel.send('Hallo! Wie kann ich Ihnen helfen?');
           }
          else if (message.content.toLowerCase() === 'hey bot') {
                  // Senden Sie eine Antwort auf die Nachricht
                  message.channel.send('Hey Bot is outdated. Please write direct your question. Thank you! You can try Hello.');
           }
           else if (message.content.toLowerCase() === 'hello') {
                  // Senden Sie eine Antwort auf die Nachricht
                  message.channel.send('Hello! How can i help you?');
            }
             else if (message.content.toLowerCase() === 'lol') {
                   // Senden Sie eine Antwort auf die Nachricht
               
                   message.channel.send('its look like '+message.author.tag+' is laughing');
                                        
             }
           else if (message.content.toLowerCase() === 'hallå') {
        // Senden Sie eine Antwort auf die Nachricht
            message.channel.send('Hej, hur kan jag hjälpa dig?');
          }
          else if(message.content.startsWith(';')) {
            const args = msg.content.slice(1).trim().split(/ +/);
            const command = args.shift().toLowerCase();
            if (command === learnCommand.name) {
              
                learnCommand.execute(msg, args, learnedContent);
            } else if (command === recallCommand.name) {
                recallCommand.execute(msg, args, learnedContent);
            }
            else if (command==="save") {
              const keyword = args.shift().toLowerCase();
              if (keyword=="learned") {
                const success = saveLearnedContent(learnedContent, learnedContentFile);
                
                if (success) {
                    msg.channel.send(keyword +' saved.');
                    console.log('Learned content saved successfully.');
                } else {
                    msg.channel.send('Error while saving '+keyword +'.');
                    console.log('Failed to save learned content.');
                }
              }
              else {
                 msg.channel.send('Can\'t saving '+keyword+'.');
              }
              
            }
            else {
      
              message.channel.send('This should be a low level command. But i don\'t get the Info what i should do with it.');

            }
            
          }
          else if(message.content.startsWith('#')) {
            return;

          }
          else if(message.content.startsWith('?')) {
            message.channel.send('This should be a low level command. But i don\'t get the             Info what i should do with it.');

             //command type 2)

            }
            else if(message.content.startsWith('$')) {
            message.channel.send('This should be a  variable Request. But i don\'t get the             Info what i should do with it.');

             //command type 2)

            }
          else if(message.content.endsWith('?')) {              
            var mString=message.content.toLowerCase();
              var mString=mString.replace('?','');
              mString=mString.trim();
              if (mString.startsWith('what is')) {
                     // Reaktion auf "what is" Anfrage
                  const answer=whatIs.whatIs(mString);
                if(answer) {
                   message.channel.send(answer);
                }
                else {
                    console.log('Error in bot-whatIs logic on line 172')
                }
                
                
      }
          else if (mString.startsWith('what can')) {
                message.channel.send('This is a realy good question. (What can)');
            }
            else if (mString.startsWith('where can')) {
              message.channel.send('This is a realy good question. (where can)');
            }
            else if (mString.startsWith()== 'where is') {
              message.channel.send('This is a realy good question.');
            }
            else if (mString.startsWith()== 'how is') {
              message.channel.send('This is a realy good question.');
            }
            else if (mString.startsWith()== 'how can') {
              message.channel.send('This is a realy good question.');
            }
            else if (mString.startsWith()== 'can ' || mString.startsWith()=== 'can\'t ') {
              message.channel.send('This is a realy good question.');
            }
            else if (mString.startsWith()== 'is ' ||  mString.startsWith()=== 'isn\'t') {
              message.channel.send('This is a realy good question.');
            }
            else if (mString.startsWith()== 'why is') {
              message.channel.send('This is a realy good question.');
            }
            else if (mString.startsWith()== 'how you are') {
                message.channel.send('At the moment all is fine here. How can i help you?');
            }
            else if (mString.startsWith()=== 'which') {
                message.channel.send('This is a realy good question.');
              }
            else {
              if (mString=="how old are you") {
                // Bot alter und Laufzeit..
                var botMsg="I am "+client.user.createdAt.getFullYear()-1900+" years old.\n";
                  botMsg+="Iam a Bot also i have a runtime.\n";
                const currentTime = Date.now();
                const uptime = currentTime - startTime;

                const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
                const hours = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((uptime % (1000 * 60)) / 1000);

                message.channel.send(botMsg+`\nMy runtime is  ${days} Days, ${hours} Hours, ${minutes} Minutes and ${seconds} Seconds`);

              }
              else {
                message.channel.send('I mean it is question but i can\'t understand it. (else on 210)');
              }
            }

          }
        else if(message.content.endsWith('!')) {
          var mString=message.content.toLowerCase();
          if (mString.conent.startsWith()== 'i see a') {
             message.channel.send('I mean you will see something. But at the moment i don\'t know what i can say.');
          }
          else if (mString.startsWith()== 'i have a') {
            message.channel.send('I mean owned something. But at the moment i don\'t know what i can say.');
          }
          else if (mString.startsWith()== 'i have a') {
            message.channel.send('I mean owned something. But at the moment i don\'t know what i can say.');
          }
          else {
          return;
          }
        }
           // Fügen Sie weitere Bedingungen hinzu, um auf verschiedene Nachrichten zu reagieren
 });

client.login(token);
