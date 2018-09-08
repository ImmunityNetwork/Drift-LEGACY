const Discord = require('discord.js');


module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Drift Information - ")
        .setDescription("Some information about Drift!")
        .setThumbnail("https://cdn.discordapp.com/avatars/417450858024796161/0e4870e7a97dff4a12333eb4d2822ddf.png")
        .setColor("#1bade2")
        .addField("Drift Version - ", "1.0")
        .addField("Node Version - ", process.version, true)
        .addField("Discord.js Version - ", Discord.version, true)
        .addField("Drift Bot - ", "A multipurpose Bot that is free but comes with limited permissions compared to Drifter, but still still enough for a Discord Server to be satisfied.")
        .addField("Drift Discord Server - ", "[Click to join](https://discord.gg/JYXwCgV), Stay up-to-date with all the updates to Drift!")
    message.channel.send({embed: embed}).then(message => message.delete(60000));
}

module.exports.help = {
    name: "about",
    description:"Read some information about Drift!"
}

//---
//Drift Bot - A multipurpose Bot that is free but comes with limited permissions compared to Drifter, but still still enough to be satisfied.
//Drifter Bot - A Premuim Bot that users pay to use with more permissions and other benefits on the official discord server.
//
//Drift Bot Discord Server - Is very important to be in due to information about outages, updates or other important things.
//Drift Bot Website - Official Website you can share with your friends to obtain Drift Bot in your discord!
//---
