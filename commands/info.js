const { version, RichEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
module.exports.run = async (bot, message, args) => {
  const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  let embed = new RichEmbed()
    .setAuthor('Drift General -', message.author.avatarURL)
    .setTitle("Bot Info")
    .setColor("#930F05")
    .addField("= RAM Usage =", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\``, true)
    .addField("= Users =", `\`${bot.users.size.toLocaleString()}\``, true)
    .addField("= Servers =", `\`${bot.guilds.size.toLocaleString()}\``, true)
    .addField("= Channels =", `\`${bot.channels.size.toLocaleString()}\``, true)
    .addField("= Discord.js =", `\`v.${version}\``, true)
    .addField("= CPU Usage =", `\`${(process.cpuUsage().user / 100 / 100 / 100).toFixed(2)}%\``, true)
    .addField("= Node.js =", `\`${process.version}\``, true)
    .addField("= Arch =", `\`${process.arch}\``, true)
    .addField("= Platform =", `\`${process.platform}\``, true)
    .addField("= Uptime =", `\`${duration}\``, true);
    message.channel.send(embed);
};
module.exports.help = {
  name: "info"
}
