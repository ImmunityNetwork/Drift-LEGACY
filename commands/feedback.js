const { RichEmbed } = require("discord.js");
module.exports.run = async(bot, message, args) => {
  message.delete();
  args2 = args.join(" ");
  // if (args2.length < 1) return message.channel.send("You need to provide something to say (Abuse of this command may result in punishment)");
  let embed3 = new RichEmbed()
    .setTitle("Incorrect Usage")
    .setAuthor("Feedback Command")
    .setColor("#BA1B1D")
    .addField("Correct Usage", "```dr!feedback <message>```")
    .setDescription("If a word is in asterisks/stars, it means it is OPTIONAL.");
    if(args < 1) return message.channel.send(embed3).then(message => message.delete(10000));
  const embed = new RichEmbed()
    .setTitle("Feedback")
    .setFooter("Reporter: " + message.author.tag + " ReporterID " + message.author.id)
    .setTimestamp()
    .setColor("#1bade2")
    .setDescription(args2);
  const embed1 = new RichEmbed()
  .setAuthor('Drift General -', message.author.avatarURL)
  .setTitle("Feedback")
  .setDescription("**Thank you for the Feedback! We will try to add it but no promises.**");
  let cs3 = await bot.channels.get("486364621650001962").send(embed);
  cs3.react("👍")
  cs3.react("👎")
  let ps = await message.channel.send(embed1);
  ps.delete(8000)
};

module.exports.help = {
  name: "feedback",
  description:"Give feedback about the bot"
};
