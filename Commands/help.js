const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Drift Help Menu - ")
        .setDescription("Commands you can use for Drift!")
        .setThumbnail("https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png")
        .setColor("#9B59B6")
        .addField("|help - ", "Sends this help screen.")
        .addField("|mutestatus - ", "Shows the mute status of a user.")
        .addField("|mute - ", "Mute other users.")
        .addField("|unmute - ", "Unmute other users.")
        .addField("|ping - ", "Play ping pong with the bot.")
        .addField("|user - ", "View your own User Information.")
        .addField("|about - ", "View information about the bot.")
        .addField("Created At - ", message.author.createdAt)
        .setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");

    console.log("About Command has been executed.");
    message.channel.send({embed: embed});
}

module.exports.help = {
    name: "help"
}

//---
//Drift Bot - A multipurpose Bot that is free but comes with limited permissions compared to Drifter, but still still enough to be satisfied.
//Drifter Bot - A Premuim Bot that users pay to use with more permissions and other benefits on the official discord server.
//
//Drift Bot Discord Server - Is very important to be in due to information about outages, updates or other important things.
//Drift Bot Website - Official Website you can share with your friends to obtain Drift Bot in your discord!
//---