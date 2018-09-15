const { RichEmbed } = require("discord.js");
const ms = require("ms")
module.exports.run = async (bot, message, args) => {
    let timer = args.join(" ").split(" | ") 
    console.log(timer)

    if (!timer) return;

    let timers = new RichEmbed()
    .setTitle("Drift Reminder -")
    .setColor('#0099ff')
    .addField("Message", `${timer[1]}`)
    .setFooter('Drift Reminder -', message.author.avatarURL);

    setTimeout(async function() { 
       let msg = await message.channel.send(`<@${message.author.id}> `);
       msg.edit({embed: timers})
    }, ms(timer[0]))
}

module.exports.help = {
    name: "reminder"
}
