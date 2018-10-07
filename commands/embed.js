const { RichEmbed } = require('discord.js');

module.exports.run = async (bot, msg, args) => {

  msg.delete();
  const embed = new RichEmbed()
    .setAuthor('Drift Miscellaneous -', message.author.avatarURL)
    .setTitle("Embed")
    .addField(`${msg.author.tag} - `, args.join(" "))
    .setColor("#1bade2");
  msg.channel.send({embed: embed}).catch(e => require('../utils/error.js').error(bot, e));
};

module.exports.help = {
  name: 'embed',
  description:"Announce something as an embed!"
};
