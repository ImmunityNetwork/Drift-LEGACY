const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.send("You did not specify a user mention or ID!");

    let role = message.guild.roles.find(r => r.name === "Drift Muted");
    let embed = new Discord.RichEmbed()
        .setTitle("Drift Mute")
        .setThumbnail("https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png")
        .addField("Mute Status - ", "This user is not muted.") 
        .addField("Created At -", message.author.createdAt)
        .setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png")  
    if(!role || !toMute.roles.has(role.id)) return message.channel.send({embed});

    await toMute.addRole(role);
    let embed2 = new Discord.RichEmbed()
        .setTitle("Drift Mute")
        .setThumbnail("https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png")
        .addField("Mute Status - ", "That user is now muted.")
        .addField("Created At -", message.author.createdAt)
        .setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png")
    if(!role || toMute.roles.has(role.id)) return message.channel.send({embed2});

    console.log("MuteStatus Command has been executed.");
}

module.exports.help = {
    name: "mutestatus"
}