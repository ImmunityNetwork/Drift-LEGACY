const {
  RichEmbed
} = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (args.length < 1) return msg.channel.send("You need to provide a suggestion!");
  args = args.join(' ');
  // Suggestion Feedback log channel
  //Main Server
  let slog = bot.channels.get("484461009323556864");
  //Staff Server
  let slog2 = bot.channels.get("486364513101283343");

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
