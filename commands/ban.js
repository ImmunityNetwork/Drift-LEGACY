const { RichEmbed } = require('discord.js');


module.exports.run = async (bot, message, args) => {
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    let modlogs = message.guild.channels.find('name', 'mod-logs');
    let banperm = message.member.permissions.has("BAN_MEMBERS");
    if(!banperm) return message.reply("You dont have permmision to do that").then(message => message.delete(60000));
    if(message.mentions.users.size < 1) return message.reply("you must mention someone to ban them. (Logic at its finest.)").then(message => message.delete(60000));

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
        return message.reply(`I have no power to ban them from the server at this time.`).then(message => message.delete(60000));
    } else {
        const embed = new RichEmbed()
        .setTitle('')
        .setAuthor('Drift Moderation -', message.author.avatarURL)
        .setColor(0x00AE86)
        .addField('Action - ', 'Ban')
        .addField('User - ', user.tag)
        .addField('Moderator - ', message.author.tag)
        .addField('Reason - ', reason);
        message.reply(user.tag + "has been banned.")
        message.channel.sendEmbed(embed).then(message => message.delete(60000));
        modlogs.send({embed: embed});
        message.guild.member(user).send(`You have been banned by ${message.author.tag}, in ${message.guild.name}, due to ${reason}.`);
        message.guild.member(user).ban();
    }

}

module.exports.help = {
    name: "ban",
    description:"Invoke the great power of the BAN HAMMER on someone."
}
