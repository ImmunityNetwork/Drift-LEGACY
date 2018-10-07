const { RichEmbed } = require('discord.js');


module.exports.run = async (bot, message, args) => {
    let embed = new RichEmbed()
    .setAuthor('Drift Miscellaneous -', message.author.avatarURL)
    .setTitle("Ping")
        .setThumbnail("https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png")
        .setColor("#1bade2")
        .setDescription("Ping - ", 'Pong! Drift\'s ping `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
    message.channel.send({embed: embed}).catch(e => require("../utils/error.js").error(bot, e));;
}

module.exports.help = {
    name: "ping",
    description:"Check the bot's ping!"
}
