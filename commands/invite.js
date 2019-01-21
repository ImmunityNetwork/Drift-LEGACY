const {RichEmbed} = require("discord.js");

module.exports.run = (bot, message, args) => {
  let embed = new RichEmbed()
    .setColor("#2F97C1")
    .setDescription("📨 Invite me [here](https://discordapp.com/oauth2/authorize?client_id=403335081609134092&permissions=8&scope=bot)!")
  message.channel.send(embed).catch(e => require("../utils/error.js").error(bot, e));
}

module.exports.help = {
  name: "invite",
  description: "Get a link to invite drift!",
  category: ""
}
