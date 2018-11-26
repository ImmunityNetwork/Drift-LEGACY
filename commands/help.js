const { RichEmbed } = require("discord.js");
const botSettings = require("../botsettings.json")
module.exports.run = async (bot, message, args) => {
  let commands = [];
  bot.commands.forEach(c => {
    if (c.help.description === undefined) c.help.description = "Description not set";
    commands.push(c.help.name + ": "+ c.help.description);
  });
  commands = commands.join("\n\n");
  let helpEmbed = new RichEmbed()
  .setColor("#1bade2")
  .setDescription(commands)
  .setTimestamp()
  .setFooter("Requested by: " + message.author.tag, message.author.displayAvatarURL);
  message.channel.send({embed: helpEmbed})
};

exports.help = {
  name:"help",
  description:"Sends this help message."
};
