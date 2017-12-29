const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
   let embed = new Discord.RichEmbed() 
        .setAuthor(`${message.guild.name}`)
        .setDescription("This is your Server Information!")
        .setThumbnail(`${message.guild.iconURL}`)
        .setColor("#9B59B6")
        .addField("Member Count - ", `${message.guild.memberCount}`)
        .addField("ID", `${message.guild.id}`)
        .addField("Roles", `${message.guild.roles}`)
        .setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");

    message.channel.send({embed: embed}).then(message => message.delete(60000)); 
    

}

module.exports.help = {
    name: "server"
}
