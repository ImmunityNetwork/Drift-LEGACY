const { RichEmbed } = require('discord.js');

module.exports.run = async (bot, msg, args) => {

  msg.delete();
  const embed = new RichEmbed()
    .addField(`${msg.author.tag} - `, args.join(" "))
    .setColor([114, 137, 218])
    .setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
  msg.channel.send({embed});
};

module.exports.help = {
  name: 'embed',
};