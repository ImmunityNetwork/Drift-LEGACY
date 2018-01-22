const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
        .setThumbnail("https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png")
        .setColor("#9B59B6")
        .addField("Ping - ", 'Pong! Your ping is `' + `${Date.now() - message.createdTimestamp}` + ' ms`')
        .addField("Created At - ", message.author.createdAt)
        .setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");

    console.log("Ping Command has been executed.");
    message.channel.send({embed: embed});
}

module.exports.help = {
    name: "ping"
}