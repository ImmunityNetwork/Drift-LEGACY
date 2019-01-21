const { RichEmbed } = require('discord.js');


module.exports.run = async (bot, message, args) => {
    let embed = new RichEmbed()
    .setAuthor('Drift Miscellaneous -', message.author.avatarURL)
    .setTitle("Ping")
        .setThumbnail("https://cdn.discordapp.com/avatars/417450858024796161/0e4870e7a97dff4a12333eb4d2822ddf.png")
        .setColor("#1bade2")
        .addField("Ping - ", `\`\`\`${bot.ping} ms\`\`\``);
    message.channel.send({embed: embed}).catch(e => require("../utils/error.js").error(bot, e));;
}

module.exports.help = {
    name: "ping",
    description:"Check the bot's ping!",
    category: ""
}
