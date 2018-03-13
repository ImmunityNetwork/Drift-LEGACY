const { RichEmbed } = require('discord.js');


module.exports.run = async (bot, message, args) => {
    console.log(args);
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    let modlogs = bot.channels.find('name', 'mod-logs');
    let banperm = message.channel.permissionsFor(message.member).hasPermission("BAN_MEMBERS");
    console.log(reason);
    if(!banperm) return message.reply("You dont have permmision to do that").then(message => message.delete(60000));
    if(message.mentions.users.size < 1) return message.reply("you must mention someone to ban them. (Logic at its finest.)").then(message => message.delete(60000));

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
        message.channel.sendEmbed(embed).then(message => message.delete(60000));
        message.guild.channels.get(modlogs.id).sendEmbed(embed);
        message.guild.member(user).sendMessage(`You have been banned by ${message.author.tag} due to ${reason}`);
        message.guild.member(user).ban();
    }

}

module.exports.help = {
    name: "ban"
}
