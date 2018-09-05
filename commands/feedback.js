const {
  RichEmbed
} = require("discord.js");
module.exports.run = async (bot, message, args) => {
  if (args.length < 1) return msg.channel.send("You need to provide something to say (Abuse of this command may result in punishment)");
  args = args.join(' ');
  // Main Server
  let flog = bot.channels.get("484461023013634059");
  // Staff Server
  let flog2 = bot.channels.get("486364621650001962");

  const embed = new RichEmbed()
    .setTitle('Feedback')
    .setFooter("Sent by " + message.author.tag)
    .setTimestamp()
    .setColor("#1bade2")
    .setDescription(args);
  sflog.send({
    embed
  })
  sflog2.send({
    embed
  })
}




module.exports.help = {
  name: "feedback",
  description:"Give feedback about the bot"
};
