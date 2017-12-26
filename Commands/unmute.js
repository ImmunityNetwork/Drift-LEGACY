const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have the permission to unmute.");

    let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.send("You did not specify a user mention or ID!");

    let role = message.guild.roles.find(r => r.name === "Drift Muted");

    if(!role || !toMute.roles.has(role.id)) return message.channel.send("This user was not muted in the first place!");

    await toMute.removeRole(role);
    message.channel.send("This user has now been unmuted.");

    console.log("Unmute Command has been executed.");
}

module.exports.help = {
    name: "unmute"
}