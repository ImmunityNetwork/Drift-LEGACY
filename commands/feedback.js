const {
  RichEmbed
} = require("discord.js");
module.exports.run = async (bot, message, args) => {
  if (args.length < 1) return msg.channel.send("You need to provide something to say (Abuse of this command may result in punishment)");
  args = args.join(' ');
  // Suggestion Feedback log channel
  let sflog = bot.channels.get("449377057412087808");
  //Main server
  let sflog2 = bot.channels.get("472621644049809408");

  const embed = new RichEmbed()
    .setTitle('Feedback')
    .setFooter("Sent by " + message.author.tag)
    .setDescription(args);
  sflog.send({
    embed
  })
  sflog2.send({
    embed
  })
}




module.exports.help = {
  name: "feedback"
};
