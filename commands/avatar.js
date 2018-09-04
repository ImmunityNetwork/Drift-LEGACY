module.exports.run = async (bot, message, args) => {

    let uA = message.mentions.users.first() || message.author;

    let RE = require ('discord.js').RichEmbed;

    let embed = new RE()
    .setColor()
    .setDescription(`**<@${uA.id}> 's avatar**`)
    .setImage(uA.displayAvatarURL);

    message.channel.send(embed)


}


module.exports.help = {
    name: "avatar",
    description:"See a nice looking avatar? Want to see it bigger?."
}
