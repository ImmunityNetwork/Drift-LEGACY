const {RichEmbed} = require("discord.js");
module.exports.run = async (bot, message, args) => {
    let nick = args.join(' ');
    message.member.setNickname(nick);
    let nicke = new RichEmbed()
    .setAuthor('Drift Miscellaneous -', message.author.avatarURL)
    .setTitle("Nickname")
    .addField("Success!", "You have added your self a nickname!")
    .addField("Nickname", nick);
    let tm = await message.channel.send(nicke);
    tm.delete(3000)
}


module.exports.help = {
    name: "nick"
}
