const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (args.length < 1) return msg.channel.send("You need to provide a suggestion!");


  let slog = bot.channels.find(c => c.id === "484461009323556864");
  //Staff Server
  let slog2 = bot.channels.find(c => c.id === "486364513101283343");

  const embed = new RichEmbed()
    .setTitle('New Suggestion!')
    .setColor("#1bade2")
    .setTimestamp()
    .setFooter("Sent by " + message.author.tag)
    .setDescription(args.join(" "));
  //await slog.send(embed)
  await slog2.send(embed).then( msg => {
    msg.react('👍').then(msg.react('👎'));

  })
};

module.exports.help = {
  name: "suggest",
  description:"Suggest your idea to the Drift team!"
}
