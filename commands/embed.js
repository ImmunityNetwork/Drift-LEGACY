const { RichEmbed } = require('discord.js');

module.exports.run = async (bot, msg, args) => {

  msg.delete();
  const embed = new RichEmbed()
    .addField(`${msg.author.tag} - `, args.join(" "))
    .setColor([114, 137, 218]);
  msg.channel.send({embed});
};

module.exports.help = {
  name: 'embed',
};
