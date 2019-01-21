const { RichEmbed } = require('discord.js');
module.exports.run = async (bot, message, args) => {
  message.delete().catch(e => require("../utils/error.js").error(bot, e));
 let reason = args.slice(1).join(' ');
  let user = message.mentions.members.first() || message.guild.member(args[0]);
  let modlogs = message.guild.channels.find(c => c.name === 'mod-logs');

    let banperm = message.member.permissions.has("BAN_MEMBERS")
    if(!banperm) return message.reply("You dont have permmision to do that").then(message => message.delete(5000).catch(e => require("../utils/error.js").error(bot, e)));
    let embed2 = new RichEmbed()
    .setTitle("Incorrect Usage")
    .setAuthor("Ban Command")
    .setColor("#BA1B1D")
    .addField("Correct Usage", "```dr!ban @user *reason*```")
    .setDescription("If a word is in asterisks/stars, it means it is OPTIONAL.");
    if(message.mentions.users.size < 1) return message.channel.send(embed2).then(message => message.delete(10000).catch(e => require("../utils/error.js").error(bot, e)));
    // if(args < 1) return message.channel.send(embed2).then(message => message.delete(10000));
    if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply('I do not have the correct permissions. Please do give me the correct permissions so that I may execute this command. Recommended ADMINISTRATOR.').then(message => message.delete(5000));

    if(!modlogs) {
        try{
            modlogs = await message.guild.createChannel(
                `mod-logs`,
                `text`);
            message.reply("Please set up the permissions for #mod-logs according to your needs manually. Automatic setup of #mod-logs will come shortly. Thanks for your cooperation.")
        }catch(e){
            require("../utils/error.js").error(bot, e);
        }
    }

    if(!reason) {
        reason = "General Misconduct."
    }


    if(!message.guild.member(user).bannable){
        return message.reply(`They are not bannable at this current moment.`).then(message => message.delete(5000));
    } else {
        const embed = new RichEmbed()
        .setTitle('Ban Report')
        .setAuthor('Drift Moderation -', message.author.avatarURL)
        .setColor("#BA1B1D")
        .addField('Action - ', 'Ban')
        .addField('User - ', user.tag)
        .addField('Moderator - ', message.author.tag)
        .addField('Reason - ', reason);
        modlogs.send({embed: embed}).catch(e => require("../utils/error.js").error(bot, e));
        user.send(`You have been banned by ${message.author.tag}, in ${message.guild.name}, due to ${reason}.`).catch(e => require("../utils/error.js").error(bot, e));
        message.guild.member(user).ban({days: 1}).catch(e => require("../utils/error.js").error(bot, e));
    }

}

module.exports.help = {
    name: "ban",
    description:"Invoke the great power of the BAN HAMMER on someone.",
    category: ""
}
