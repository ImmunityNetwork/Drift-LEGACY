const {
  RichEmbed
} = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (args.length < 1) return msg.channel.send("You need to provide a suggestion!");
  args = args.join(' ');
  // Suggestion Feedback log channel
  //Main Server
  let sflog = bot.channels.get("449377057412087808");
  //Dev Server (I think)
  let sflog2 = bot.channels.get("450830883440558091");

  const embed = new RichEmbed()
    .setTitle('New Suggestion!')
    .setColor("#1bade2")
    .setTimestamp()
    .setFooter("Sent by " + message.author.tag)
    .setDescription(args);
  sflog.send({
    embed
  })
  sflog2.send({
    embed
  }).then( msg => {
    msg.react('👍').then(msg.react('👎'));

  })
}

module.exports.help = {
  name: "suggest",
  description:"Suggest your idea to the Drift team!"
}
