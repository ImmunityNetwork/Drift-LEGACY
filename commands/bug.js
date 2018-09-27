const {RichEmbed} = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
    let bugm = args.join(" ");

    let embed = new RichEmbed()
    .setTitle("Bug Report")
    .setColor("#1CCAD8")
    .setDescription("Bug:", bugm)
    .setTimestamp()
    .setFooter("Reporter: " + message.author.tag + "ReporterID " + message.author.id);
    let embed2 = new RichEmbed()
    .setTitle("Thank you for submitting a Bug Report")
    .setDescription("We will look into it ~ Drift Development")
    .setFooter("Drift Bug Report", message.author.avatarURL)
    .setTimestamp();

    bot.channels.get("490973066160111616").send(embed)
    let bugr = await message.channel.send(embed2);
    bugr.delete(1000)
}

module.exports.help = {
    name: "bug"
}
