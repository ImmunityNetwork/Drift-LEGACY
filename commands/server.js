const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
   let embed = new RichEmbed()
        .setAuthor(`${message.guild.name}`)
        .setDescription("This is your Server Information!")
        .setThumbnail(`${message.guild.iconURL}`)
        .setColor("#1bade2")
        .addField("Member Count - ", `${message.guild.memberCount}`)
        .addField("ID", `${message.guild.id}`)
        .addField("Roles", `${message.guild.roles.map(g => g.name)}`);
    message.channel.send({embed: embed}).then(message => message.delete(60000));


}

module.exports.help = {
    name: "server",
    description:"Read some information about your own server!"
}
