const { RichEmbed } = require('discord.js');


module.exports.run = async (bot, message, args) => {
    let embed = new RichEmbed()
        .setAuthor(message.author.username)
        .setDescription("This is your User Information!")
        .setThumbnail(message.author.avatarURL)
        .setColor("#1bade2")
        .addField("Full Username - ", message.author.tag)
        .addField("ID", message.author.id)
        .addField("Created At", message.author.createdAt);
    message.channel.send({embed: embed});
}

module.exports.help = {
    name: "user",
    description:"Read some interesting information about yourself."
}
