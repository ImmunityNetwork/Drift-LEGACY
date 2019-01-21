const { RichEmbed } = require("discord.js");

exports.run = (bot, message, args) => {
  const embed = new RichEmbed()
    .setAuthor("Drift General -", message.author.avatarURL)
    .setTitle("Drift Server -")
    .setColor("#0099ff")
    .setThumbnail(message.guild.iconURL)
    .addField("Server Name:", `${message.guild.name}`, true)
    .addField("Server ID:", `${message.guild.id}`, true)
    .addField("Server Owner:", `${message.guild.owner}`, true)
    .addField("Owner ID:", `${message.guild.ownerID}`, true)
    .addField("Server Creation:", `${message.guild.createdAt}`, true)
    .addField("Server Region:", `${message.guild.region}`, true)
    .addField("Server Roles:", `${message.guild.roles.map(r => r).join(" | ")}`, true)
    .addField("Members", `${message.guild.memberCount}`, true)
    .addField("Humans", `${message.guild.members.filter(member => !member.user.bot).size}`, true)
    .addField("Bots", `${message.guild.members.filter(member => member.user.bot).size}`, true)
    .addField("Channels", `${message.guild.channels.map(c => c).join(" | ")}`, true)
    .setFooter("Drift Info -", message.author.avatarURL);
  message.channel.send(embed).catch(e => require("../utils/error.js").error(bot, e));
};
module.exports.help = {
  name: "server",
  description:"Read some information about your own server!",
  category: ""
};
