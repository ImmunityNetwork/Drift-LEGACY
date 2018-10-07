const { RichEmbed } = require('discord.js');


module.exports.run = async (bot, message, args) => {
    let embed = new RichEmbed()
        .setTitle(User)
        .setAuthor('Drift General -', message.author.avatarURL)
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
