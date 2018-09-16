const {RichEmbed} = require("discord.js");

module.exports.run = (bot, message, args) => {
    let embed = new RichEmbed()
    .setTitle("Invite me")
    .setColor("#2F97C1")
    .setDescription("Invite me [here](https://discordapp.com/api/oauth2/authorize?client_id=485948241536483356&permissions=8&scope=bot)!")
    .setFooter("Drift Invite", message.author.avatarURL);
    message.channel.send(embed);
}

module.exports.help = {
    name: "invite"
}
