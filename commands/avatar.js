const { RichEmbed } = require("discord.js");
module.exports.run = async (bot, message, args) => {

    let uA = message.mentions.users.first() || message.author;

    let embed = new RichEmbed()
    .setColor("#1bade2")
    .setDescription(`**<@${uA.id}> 's avatar**`)
    .setTimestamp()
    .setImage(uA.displayAvatarURL);

    message.channel.send(embed)


}


module.exports.help = {
    name: "avatar",
    description:"See a nice looking avatar? Want to see it bigger?."
}
