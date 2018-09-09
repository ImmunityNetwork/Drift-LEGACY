const { RichEmbed } = require('discord.js');
const ms = require("ms");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
    message.delete();
    let bantime = args[1];
    if(!bantime) return message.reply("You didn't specify a time!");
    let reason = args.slice(2).join(' ');
    let buser = message.mentions.users.first();
    let modlogs = message.guild.channels.find('name', 'mod-logs');
    let banperm = message.member.permissions.has("BAN_MEMBERS");
    console.log(reason);
    if(!banperm) return message.reply("You dont have permmision to do that").then(message => message.delete(5000));
    if(message.mentions.users.size < 1) return message.reply("You must mention someone to ban them.").then(message => message.delete(5000));

    if(!message.guild.member(bot.user).hasPermission('BAN_MEMBERS')) return message.reply('I do not have the correct permissions. Please do give me the correct permissions so that I may execute this command.').then(message => message.delete(5000));

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


    if(!message.guild.member(buser).bannable){
        return message.reply(`I have no power to ban them from the server at this time.`).then(message => message.delete(60000));
    } else {
        const embed = new RichEmbed()
        .setTitle('TempBan Report')
        .setAuthor('Drift Moderation -', message.author.avatarURL)
        .setDescription(`${message.author.username}'s tempban report on ${buser.tag}`)
        .setColor('#1A8A39')
        .addField("Banned user:", `${buser} with id ${buser.id}`)
        .addField("Ban by:", `${message.author} with tag ${message.author.tag}`)
        .addField("Banned for:", bantime)
        .addField("Time:", `${moment().format('LTS')}`)
        .addField("Date:", moment().format('LL'))
        .addField("Reason:", reason)
        .setFooter('Drift Ban -', message.author.avatarURL)
        modlogs.send({embed: embed}).catch(e => require("../utils/error.js").error(bot, e));
        buser.send(`You have been banned by ${message.author.tag}, in ${message.guild.name}, due to ${reason}.`).catch(e => require("../utils/error.js").error(bot, e));
        message.guild.member(buser).ban().catch(e => require("../utils/error.js").error(bot, e));
        setTimeout(function(){
            message.guild.unban(buser.id);
            buser.send(`You have been unbanned`);
          }, ms(bantime));
    }

}

module.exports.help = {
    name: "tempban",
    description:"Invoke the great power of the BAN HAMMER on someone, temporarily."
}
