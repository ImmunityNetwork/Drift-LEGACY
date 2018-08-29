const { RichEmbed } = require('discord.js');


module.exports.run = async (bot, message, args) => {
    let embed = new RichEmbed()
        .setTitle("Drift Help Menu - ")
        .setDescription("Commands you can use for Drift!")
        .setThumbnail("https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png")
        .setColor("#9B59B6")
        .addField("about - ", "Read some information about Drift!")
        .addField("ban - ", "Invoke the great power of the BAN HAMMER on someone.")
        .addField("embed - ", "Announce something as an embed!")
        .addField("help - ", "Sends this help screen.")
        .addField("kick - ", "Give someone the boot from the server.")
        .addField("launch - ", "Launch someone into space!")
        .addField("music - ", "Sends a help embed for music commands.")
        .addField("mute - ", "Silence someone with the power of the Mute Command.")
        .addField("ping - ", "Check the bot's ping!")
        .addField("purge - ", "Destroys the evidence.")
        .addField("server - ", "Read some information about your own server!")
        .addField("unban - ", "Pardon someone from the BAN HAMMER.")
        .addField("unmute - ", "Unsilence someone with the power of the Unmute Command.")
        .addField("user - ", "Read some interesting information about yourself.")
        .addField("warn - ", "Give a friendly warning to someone.")
        .addField("mock - ", "Mock some text just like ~~spongebob~~ spongemock.")
        .addField("suggest - ", "Suggest your idea to the Drift team!")
        .addField("feedback - ", "Give your 10 cents about drift.");
    message.channel.send({embed: embed}).then(message => message.delete(60000));
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
