const Discord = require('discord.js');
const botsettings= require('./botsettings.json')
const { ShardingManager } = require("discord.js");

const manager = new ShardingManager(`./bot.js`, { totalShards: 'auto', respawn: true, token: botsettings.token });

manager.spawn(manager.totalShards, 1000, false);

manager.on('launch', shard => {
    console.log('Sharding enabled!')
})