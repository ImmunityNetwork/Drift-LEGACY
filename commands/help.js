const { RichEmbed } = require("discord.js");
const botSettings = require("../botsettings.json");
exports.run = (bot, message, args) => {
  let cmdsArray = [];
  bot.commands.forEach(c => cmdsArray.push(c.help.name + ": " + c.help.description + "\n"));
  const embed = new RichEmbed()
    .setTitle("Drift Help | Prefix " + botSettings.prefix)
    .setColor("#1bade2")
    .setThumbnail("https://cdn.discordapp.com/avatars/417450858024796161/0e4870e7a97dff4a12333eb4d2822ddf.png")
    .setDescription(cmdsArray)
    .setTimestamp();

  message.channel.send({embed: embed});
};

exports.help = {
  name:"testhelp",
  description:"Sends this help message."
};
