const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let messages = args[0];
  
        message.delete();
        const fetched = await message.channel.fetchMessages({limit: args[0]});
        
        message.channel.bulkDelete(fetched);
     
    let embed = new Discord.RichEmbed()
        .setAuthor("Drift Purge")
        .setDescription(`Deleted ${messages} messages in ${message.channel.name}.`)
        .setThumbnail("https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png")
        .setColor("#9B59B6")
        .setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
message.channel.send({embed: embed}).then(message => message.delete(60000)); 

}

module.exports.help = {
    name: "purge"
}