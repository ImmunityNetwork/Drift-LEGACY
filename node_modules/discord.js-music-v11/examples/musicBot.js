const Discord = require('discord.js');
const music = require('discord.js-music-v11');
const Bot = new Discord.Client();
const token = "<auth_token>" // Recommended to load from json file.

Bot.on('ready', () => {
    console.log(`[Start] ${new Date()}`);
});

music(Bot, {
	prefix: '-',     // Prefix of '-'.
	global: false,   // Server-specific queues.
	maxQueueSize: 10, // Maximum queue size of 10.
	clearInvoker: true // If permissions applicable, allow the bot to delete the messages that invoke it (start with prefix)
});
Bot.login(token);
