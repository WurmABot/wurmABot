const { ShardingManager } = require('discord.js');
const {logger}=require('./logger/logger.js');

const token = process.env["DISCORD_TOKEN"] || client.config.DISCORD_TOKEN;

const manager = new ShardingManager('./wurmABot.js', { 
	execArgv: ['--trace-warnings'],
	shardArgs: ['--ansi', '--color'],
  token: token });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
client.on(Events.InteractionCreate, interaction => {
	// ...
	if (commandName === 'send') {
		const id = interaction.options.getString('destination');
		const channel = client.channels.cache.get(id);

		if (!channel) return interaction.reply('I could not find such a channel.');

		channel.send('Hello!');
		return interaction.reply(`I have sent a message to channel: \`${id}\`!`);
	}
});

manager.spawn()
.then(shards => {
		shards.forEach(shard => {
			shard.on('message', message => {
				console.log(`Shard [${shard.id}] : ${message._eval} : ${message._result}`);
			});
		});
	})
	.catch(console.error);
