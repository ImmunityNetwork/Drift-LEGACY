const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
let embed = new Discord.RichEmbed() 
    .setAuthor(message.Guild.name)
    .setDescription("This is your User Information!")
    .setThumbnail(message.Guild.iconURL)
    .setColor("#9B59B6")
    .addField("Full Username - ", message.author.tag)
    .addField("ID", message.author.id)
    .addField("Created At", message.author.createdAt)
    .setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");

message.channel.sendEmbed(embed);

}

module.exports.help = {
    name: "server"
}
