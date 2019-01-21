const {RichEmbed} = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
    let bugm;
    bugm = args.join(" ");
    // if (args2.length < 1) return message.channel.send("You need to provide something to say (Abuse of this command may result in punishment)");
    let embed3 = new RichEmbed()
    .setTitle("Incorrect Usage")
    .setAuthor("Bug Command")
    .setColor("#BA1B1D")
    .addField("Correct Usage", "```dr!bug <message>```")
    .setDescription("If a word is in asterisks/stars, it means it is OPTIONAL.");
    if(args < 1) return message.channel.send(embed3).then(message => message.delete(10000));
    let embed = new RichEmbed()
    .setAuthor('Drift Moderation -', message.author.avatarURL)
    .setTitle("Bug Report")
    .setColor("#1CCAD8")
    .setDescription(`Bug: ${bugm}`)
    .setTimestamp()
    .setFooter("Reporter: " + message.author.tag + " ReporterID " + message.author.id);
    let embed2 = new RichEmbed()
    .setTitle("Thank you for submitting a Bug Report")
    .setDescription("We will look into it ~ Drift Development")
    .setFooter("Drift Bug Report", message.author.avatarURL)
    .setTimestamp();

    bot.channels.get("490973066160111616").send(embed)
    let bugr = await message.channel.send(embed2);
    bugr.delete(8000)
}

module.exports.help = {
    name: "bug",
    description: "Report a bug to the drift team!",
    category: ""
}
