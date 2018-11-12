const { RichEmbed } = require("discord.js");

module.exports.run = async(bot, message, args) => {
  message.delete();
  args2 = args.join(" ");
  if (args2.length < 1) return message.channel.send("You need to provide something to say (Abuse of this command may result in punishment)");

  let cs2 = bot.channels.get("486364513101283343");

  const embed = new RichEmbed()
    .setTitle("Suggestion")
    .setFooter("Sent by " + message.author.tag)
    .setTimestamp()
    .setColor("#1bade2")
    .setDescription(args2);
  const embed1 = new RichEmbed()
  .setAuthor('Drift General -', message.author.avatarURL)
  .setTitle("Suggestion")
  .setDescription("**Thank you for the Suggestion! We will try to add it but no promises.**");
  let cs3 = await cs2.send(embed);
  cs3.react("👍")
  cs3.react("👎")
  let ps = await message.channel.send(embed1).catch(e => require("../utils/error.js").error(bot, e));
  ps.delete(8000).catch(e => require("../utils/error.js").error(bot, e))
};

module.exports.help = {
  name: "suggest",
  description:"Suggest your idea to the Drift team!"
}
