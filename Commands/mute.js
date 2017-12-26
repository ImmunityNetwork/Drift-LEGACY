const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have the permission to mute.");

    let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.send("You did not specify a user mention of ID!");

    if(toMute.id === message.author.id) return message.channel.send("You cannot mute yourself.");
    if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("You cannot mute a member who has a higher rank than you.");

    let role = message.guild.roles.find(r => r.name === "Drift Muted");

    if(!role) {
        try {
            role = await message.guild.createRole({
                name: "Drift Muted",
                color: "#000000",
                permissions: []
            });
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch(e) {
            console.log(e.stack);
        }
    }

    let embed = new Discord.RichEmbed()
        .setTitle("Drift Mute")
        .setThumbnail("https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png")
        .addField("Mute Status - ", "That user has already been muted!") 
        .addField("Created At -", message.author.createdAt)
        .setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png")  
    message.channel.send({embed: embed});

    await toMute.addRole(role);
    let embed2 = new Discord.RichEmbed()
        .setTitle("Drift Mute")
        .setThumbnail("https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png")
        .addField("Mute Status - ", "That user is now muted.")
        .addField("Created At -", message.author.createdAt)
        .setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png")
    
    message.channel.send({embed2: embed2});

    console.log("Mute Command has been executed.");
}

module.exports.help = {
    name: "mute"
}