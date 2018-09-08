const { RichEmbed } = require("discord.js");
exports.run = (bot, message, args) => {
  return message.reply("This command is currently disabled while being fixed.");
  /*if (args.length < 1) return message.channel.send("You need to provide something to say (Abuse of this command may result in punishment)");
  args = args.join(" ");
  // Main Server

  let flog = bot.channels.get("484461023013634059");

  // Staff Server

  let flog2 = bot.channels.get("486364621650001962");

  const embed = new RichEmbed()
    .setTitle("Feedback")
    .setFooter("Sent by " + message.author.tag)
    .setTimestamp()
    .setColor("#1bade2")
    .setDescription(args);
  flog.send({embed:
    embed
  });
  flog2.send({embed:
    embed
  });*/
};




module.exports.help = {
  name: "feedback",
  description:"Give feedback about the bot"
};
