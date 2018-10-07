const { RichEmbed } = require("discord.js");
module.exports.run = async(bot, message, args) => {
  message.delete();
  args2 = args.join(" ");
  if (args2.length < 1) return message.channel.send("You need to provide something to say (Abuse of this command may result in punishment)");

  let cs2 = bot.channels.get("486364621650001962");

  const embed = new RichEmbed()
    .setTitle("Feedback")
    .setFooter("Sent by " + message.author.tag)
    .setTimestamp()
    .setColor("#1bade2")
    .setDescription(args2);
  const embed1 = new RichEmbed()
  .setAuthor('Drift General -', message.author.avatarURL)
  .setTitle("Feedback")
  .setDescription("**Thank you for the Feedback! We will try to add it but no promises.**");
  let cs3 = await cs2.send(embed);
  cs3.react("👍")
  cs3.react("👎")
  let ps = await message.channel.send(embed1);
  ps.delete(3000)
};




module.exports.help = {
  name: "feedback",
  description:"Give feedback about the bot"
};
