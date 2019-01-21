const { RichEmbed } = require("discord.js");
const ud = require("urban-dictionary");
module.exports.run = (bot, message, args) => {
  if(!args) return message.reply("Nothing to Search For!");
  if(!message.channel.nsfw) return message.channel.send("Please go into a NSFW Channel to use this command!");
  let udSearch = args.join(" ");
  ud.term(udSearch).then((result) => {
    const entries = result.entries;
    let embed = new RichEmbed()
      .setTitle("Drift Urban -", message.author.avatarURL)
      .setAuthor("Drift Miscellaneous -", message.author.avatarURL)
      .setColor("#FCA17D")
      .addField("Word:", `${udSearch}`, true)
      .addField("Author:", `${entries[0].author}`, true)
      .addField("Definition:", `${entries[0].definition}`, true)
      .addField("Example:", `${entries[0].example}`, true)
      .addField("Ratings:", `:thumbsup: ${entries[0].thumbs_up}   :thumbsdown: ${entries[0].thumbs_down}`, true)
      .setFooter("Drift Urban -", message.author.avatarURL);
    message.channel.send(embed);
  }).catch((error) => {
    require("../utils/error.js").error(bot, error);
  });
};
module.exports.help = {
  name: "urban"
};
