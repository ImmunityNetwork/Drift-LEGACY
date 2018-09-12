const { RichEmbed } = require("discord.js");
exports.run = async (bot, message, args) => {
  if (args.length < 1) return message.channel.send("You need to provide something to say (Abuse of this command may result in punishment)");
  
  // Main Server

  let flog = bot.channels.find(c => c.id === "484461023013634059");

  // Staff Server

  let flog2 = bot.channels.find(c => c.id === "486364621650001962");

  const embed = new RichEmbed()
    .setTitle("Feedback")
    .setFooter("Sent by " + message.author.tag)
    .setTimestamp()
    .setColor("#1bade2")
    .setDescription(args);
  await flog.send(embed)

  await flog2.send(embed)
};




module.exports.help = {
  name: "feedback",
  description:"Give feedback about the bot"
};
