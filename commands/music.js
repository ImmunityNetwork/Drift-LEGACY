const { RichEmbed } = require('discord.js');
const botSettings = require('../botsettings.json');

module.exports.run = async (bot, message, args) => {
    let embed = new RichEmbed()
        .setTitle("Drift Music Menu - ")
        .setAuthor('Drift Miscellaneous -', message.author.avatarURL)
        .setDescription("Commands you can use for Drift Music!")
        .setThumbnail("https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png")
        .setColor("#1bade2")
        .addField("|play - ", "Request a video for the robot hamsters to play!")
        .addField("|skip - ", "Request a skip!.")
        .addField("|queue - ", "Displays the CD's coming up on the list to play.")
        .addField("|pause - ", "Make the robot hamsters pause the music!")
        .addField("|resume - ", "Make the robot hamsters resume the music!")
        .addField("|volume - ", "Change the volume!")
        .addField("|leave - ", "Make the bot clear the queue and leave the channel.")
        .addField("|clear - ", "Clear the music queue!");
    message.channel.send({embed: embed}).then(message => message.delete(60000)).catch(e => require("../utils/error.js").error(bot, e));;


}

module.exports.help = {
    name: "music",
    description:"Sends a help embed for music commands.",
    category: ""
}
