const botSettings = require('./botsettings.json');
const Discord = require('discord.js');
const fs = require('fs');
const Idiot = require('idiotic-api');
const bot = new Discord.Client();
bot.API = new Idiot.Client(botSettings.idioticapi, { dev: true });
bot.commands = new Discord.Collection();

//Command Handler
fs.readdir('./commands', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		let props = require(`./commands/${file}`);
		let commandName = file.split('.')[0];
		client.commands.set(commandName, props);
	});
});

fs.readdir('./commands/developer', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		let props = require(`./commands/developer/${file}`);
		let commandName = file.split('.')[0];
		bot.commands.set(commandName, props);
	});
});

fs.readdir('./commands/utility', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		let props = require(`./commands/utility/${file}`);
		let commandName = file.split('.')[0];
		bot.commands.set(commandName, props);
	});
});

fs.readdir('./commands/infractions', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		let props = require(`./commands/infractions/${file}`);
		let commandName = file.split('.')[0];
		bot.commands.set(commandName, props);
	});
});

fs.readdir('./commands/fun', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		let props = require(`./commands/fun/${file}`);
		let commandName = file.split('.')[0];
		bot.commands.set(commandName, props);
	});
});

// Event Handler
fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err);
  files.filter(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split('.')[0];
    if(eventFunction.length <= 0) {
      console.log('No Events to load!');
      return;}
    bot.on(eventName, (...args) => eventFunction.run(bot, ...args));
  });
  console.log(`[Events]\t Loaded a total amount of ${files.length} events!`);
});

bot.login(botSettings.token);
