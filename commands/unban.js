const { RichEmbed } = require('discord.js');


module.exports.run = async (bot, message, args) => {
    let reason = args.slice(1).join(' ');
    let user = args[0];
    let modlogs = message.guild.channels.find('name', 'mod-logs');
    let banperm = message.channel.permissionsFor(message.member).hasPermission("BAN_MEMBERS");
    if(!banperm) return message.reply("You dont have permmision to do that").then(message => message.delete(60000));
    if(!user) return message.reply("You must use an id of someone to unban them. (Logic at its finest, hopefully.)").then(message => message.delete(60000));

    if(!modlogs) {
        try{
            modlogs = await message.guild.createChannel('mod-logs', 'text');
            message.reply("Please set up the permissions for #mod-logs according to your needs manually. Automatic setup of #mod-logs will come shortly. Thanks for your cooperation.")
        }catch(e){
          require("../utils/error.js").error(bot, e);
        }
    }

    if(!reason) reason = "Accepted appeal.";

        const embed = new RichEmbed()
        .setTitle('')
        .setAuthor('Drift Moderation -', message.author.avatarURL)
        .setColor(0x00AE86)
        .addField('Action - ', 'Unban')
        .addField('User ID - ', `${user}`)
        .addField('Moderator - ', message.author.tag)
        .addField('Reason - ', `${reason}`);
        message.channel.send({embed}).then(message => message.delete(60000));
        modlogs.send({embed});

        message.guild.unban(user).catch(e => require("../utils/error.js").error(bot, e));
        user.send(`You have been unbanned by ${message.author.tag}, in ${message.guild.name}, due to ${reason}.`).catch(e => require("../utils/error.js").error(bot, e));
}
module.exports.help = {
    name: "unban",
    description:"Pardon someone from the BAN HAMMER."
}
