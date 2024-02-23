const { ShardingManager } = require('discord.js');
const {logger}=require('./logger/logger.js');

const token = process.env["DISCORD_TOKEN"] || client.config.DISCORD_TOKEN;

const manager = new ShardingManager('./wurmABot.js', { 
	execArgv: ['--trace-warnings'],
	shardArgs: ['--ansi', '--color'],
  token: token });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn()
.then(shards => {
		shards.forEach(shard => {
			shard.on('message', message => {
				console.log(`Shard [${shard.id}] : ${message._eval} : ${message._result}`);
			});
		});
	})
	.catch(console.error);
