const {RichEmbed} = require("discord.js");
module.exports.run = async (bot, message, args) => {
    let nick = args.join(' ');
    let embed3 = new RichEmbed()
    .setTitle("Incorrect Usage")
    .setAuthor("Nick Command")
    .setColor("#BA1B1D")
    .addField("Correct Usage", "```dr!nick <message>```")
    .setDescription("If a word is in asterisks/stars, it means it is OPTIONAL.");
    if(args < 1) return message.channel.send(embed3).then(message => message.delete(10000));
    message.author.setNickname(nick);
    let nicke = new RichEmbed()
    .setAuthor('Drift Miscellaneous -', message.author.avatarURL)
    .setTitle("Nickname")
    .addField("Success!", "You have added your self a nickname!")
    .addField("Nickname", nick);
    let tm = await message.channel.send(nicke);
    tm.delete(10000)
}


module.exports.help = {
    name: "nick"
}
