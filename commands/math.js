const {RichEmbed} = require("discord.js");
const math = require("mathjs")
module.exports.run = async (bot, message, args) => {
    let equ = args.join(" ")
    if(!equ) return message.channel.send("No math to solve!");
    let embed = new RichEmbed()
    .setTitle("Math")
    .setAuthor('Drift Miscellaneous -', message.author.avatarURL)
    .addField("Input", `\`\`\`${equ}\`\`\``)
    .addField("Output" ,`\`\`\`${math.eval(equ).catch(e => require("../utils/error.js").error(bot, e))}\`\`\``);
    message.channel.send(embed).catch(e => require("../utils/error.js").error(bot, e));

}
module.exports.help = {
    name: "math",
    descriptiom: "Evaluate a math expression",
    category: ""
}
