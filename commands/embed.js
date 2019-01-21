const {RichEmbed} = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
    es = args.join(" ");
    // if (args2.length < 1) return message.channel.send("You need to provide something to say (Abuse of this command may result in punishment)");
    let embed3 = new RichEmbed()
    .setTitle("Incorrect Usage")
    .setAuthor("Embed Command")
    .setColor("#BA1B1D")
    .addField("Correct Usage", "```dr!embed <message>```")
    .setDescription("If a word is in asterisks/stars, it means it is OPTIONAL.");
    if(args < 1) return message.channel.send(embed3).then(message => message.delete(10000));
    let embed = new RichEmbed()
    .setAuthor('Drift Moderation -', message.author.avatarURL)
    .setTitle(`Embed`)
    .setColor("#1CCAD8")
    .setDescription(es)
    .setTimestamp()
    .setFooter(message.author.tag)
    message.channel.send(embed);
}

module.exports.help = {
    name: "embed",
    description: "Creates an embed with specified message",
    category: ""
}
