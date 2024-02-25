const { ShardingManager } = require('discord.js');
const {logger}=require('./logger/logger.js');

//ShardingManager handels the Connection Instances of Servers and the bot.
//each different server-connection require an own shard..


const token = process.env["DISCORD_TOKEN"] || client.config.DISCORD_TOKEN;

const manager = new ShardingManager('./wurmABot.js', { 
	execArgv: ['--trace-warnings'],
	shardArgs: ['--ansi', '--color'],
  token: token });

manager.on('shardCreate', shard => logger.info(`[ShardingManager]: Launched shard ${shard.id} ..`));


manager.spawn()
.then(shards => {
		shards.forEach(shard => {
			shard.on('message', message => {
				logger.info(`[ShardingManager] Shard [${shard.id}] : ${message._eval} : ${message._result} ..`);
			});
		});
	})
	.catch(logger.error);
