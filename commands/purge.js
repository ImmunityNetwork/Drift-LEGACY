const { RichEmbed } = require('discord.js');


module.exports.run = async (bot, message, args) => {
    let messages = args[0];
    let delet = messages+1;
    let modlogs = bot.channels.find('name', 'mod-logs');
    let managemessagesperm = message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES");
    if(!managemessagesperm) return message.reply("You dont have permmision to do that").then(message => message.delete(60000));
    if(!modlogs) {
        try{
            modlogs = await message.guild.createChannel(
                `mod-logs`,
                `text`);
            message.reply("Please set up the permissions for #mod-logs according to your needs manually. Automatic setup of #mod-logs will come shortly. Thanks for your cooperation.")
        }catch(e){
            console.log(e.stack);
        }
    }
        message.delete();
        const fetched = await message.channel.fetchMessages({limit: args[0]});

        message.channel.bulkDelete(fetched);

    let embed = new RichEmbed()
        .setAuthor("Drift Purge")
        .setDescription(`Deleted ${messages} messages in #${message.channel.name}.`)
        .setThumbnail("https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png")
        .setColor(0x00AE86)
        .addField('Moderator - ', `${message.author.username}#${message.author.discriminator}`);
message.channel.send({embed: embed}).then(message => message.delete(60000));
message.guild.channels.get(modlogs.id).sendEmbed(embed);
}

module.exports.help = {
    name: "purge"
}
