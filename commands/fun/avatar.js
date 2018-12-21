const { RichEmbed } = require("discord.js");
module.exports.run = async (bot, message, args) => {

    let uA = message.mentions.users.first() || message.author;

    let embed = new RichEmbed()
    .setAuthor('Drift Miscellaneous -', message.author.avatarURL)
    .setTitle("Avatar")
    .setColor("#1bade2")
    .setDescription(`**<@${uA.id}>'s avatar**`)
    .setTimestamp()
    .setImage(uA.displayAvatarURL);

    message.channel.send({embed: embed}).catch(e => require("../utils/error.js").error(bot, e));


}


module.exports.help = {
    name: "avatar",
    description:"See a nice looking avatar? Want to see it bigger?."
}
