const {RichEmbed} = require("discord.js");
module.exports.run = async (bot, message, args) => {
    let nickPerm = message.guild.me.hasPermission("MANAGE_NICKNAMES");
    let selfNickPerm = message.member.hasPermission("CHANGE_NICKNAME");
    if (!nickPerm) return message.reply("❌I lack the permissions to manage nicknames");
    if (!selfNickPerm) return message.reply("❌You lack the permissions to change your nickname");

    let nick = args.join(' ');
    let embed3 = new RichEmbed()
    .setTitle("Incorrect Usage")
    .setAuthor("Nick Command")
    .setColor("#BA1B1D")
    .addField("Correct Usage", "```dr!nick <message>```")
    .setDescription("If a word is in asterisks/stars, it means it is OPTIONAL.");
    if(args < 1) return message.channel.send(embed3).then(message => message.delete(10000));
    message.author.setNickname(nick).catch(e => require("../utils/error.js").error(bot, e));
    let nicke = new RichEmbed()
    .setAuthor('Drift Miscellaneous -', message.author.avatarURL)
    .setTitle("Nickname")
    .addField("Success!", "You have added your self a nickname!")
    .addField("Nickname", nick);
    let tm = await message.channel.send(nicke);
    tm.delete(10000).catch(e => require("../utils/error.js").error(bot, e))
}


module.exports.help = {
    name: "nick",
    description: "Change your nickname!",
    category: ""
}
