const { RichEmbed } = require("discord.js");
module.exports.run = async(bot, message, args) => {
  message.delete().catch(e => require("../utils/error.js").error(bot, e));
  args2 = args.join(" ");
  // if (args2.length < 1) return message.channel.send("You need to provide something to say (Abuse of this command may result in punishment)");
  let embed3 = new RichEmbed()
    .setColor("#BA1B1D")
    .setDescription("❌Incorrect Usage ❌ Arguments are required for this command.");
    if(args < 1) return message.channel.send(embed3).then(message => message.delete(10000)).catch(e => require("../utils/error.js").error(bot, e));
  const embed = new RichEmbed()
    .setTitle("New Feedback!")
    .setFooter(message.author.tag + " ReporterID " + message.author.id)
    .setTimestamp()
    .setColor("#1bade2")
    .setDescription(args2);
  const embed1 = new RichEmbed()
  .setDescription("**✅ Thanks for the feedback!**");
  let cs3 = await bot.channels.get("486364621650001962").send(embed).catch(e => require("../utils/error.js").error(bot, e));
  cs3.react("👍").catch(e => require("../utils/error.js").error(bot, e))
  cs3.react("👎").catch(e => require("../utils/error.js").error(bot, e))
  let ps = await message.channel.send(embed1).catch(e => require("../utils/error.js").error(bot, e));
  ps.delete(8000).catch(e => require("../utils/error.js").error(bot, e))
};

module.exports.help = {
  name: "feedback",
  description:"Give feedback about the bot",
  category: ""
};
