const { RichEmbed } = require("discord.js");
const ms = require("ms")
module.exports.run = async (bot, message, args) => {
    let timer = args.join(" ").split(" | ")

    if (!timer) return;

    let timers = new RichEmbed()
    .setAuthor('Drift Miscellaneous -', message.author.avatarURL)
    .setTitle("Drift Reminder -")
    .setColor('#0099ff')
    .addField("Message", `${timer[1]}`)
    .setFooter('Drift Reminder -', message.author.avatarURL);

    setTimeout(async function() {
       let msg = await message.channel.send(`<@${message.author.id}> `);
       msg.edit({embed: timers}).catch(e => require("../utils/error.js").error(bot, e))
    }, ms(timer[0]))
}

module.exports.help = {
    name: "reminder",
    description: "Set a reminder for yourself.",
    category: ""
}
