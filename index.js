const { ShardingManager } = require('discord.js');
const {logger}=require('./logger/logger.js');

const token = process.env["DISCORD_TOKEN"] || client.config.DISCORD_TOKEN;

const manager = new ShardingManager('./WurmABot.js', { 
	execArgv: ['--trace-warnings'],
	shardArgs: ['--ansi', '--color'],
  token: token });

manager.on('shardCreate', shard => logger.info(`Launched shard ${shard.id}`));

manager.spawn();
