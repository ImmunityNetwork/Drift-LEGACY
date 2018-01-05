const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    console.log(args);
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    let modlogs = bot.channels.find('name', 'mod-logs');
    console.log(reason);

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
        const embed = new Discord.RichEmbed()
        .setTitle('')
        .setAuthor('Drift Moderation -', message.author.avatarURL)
        .setColor(0x00AE86)
        .addField('Action - ', 'Ban')
        .addField('User - ', `${user.username}#${user.discriminator}`)
        .addField('Moderator - ', `${message.author.username}#${message.author.discriminator}`)
        .addField('Reason - ', `${reason}`)
        .setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
        message.channel.sendEmbed(embed).then(message => message.delete(60000));
        bot.channels.get(modlogs.id).sendEmbed(embed);
        message.guild.member(user).sendMessage(`You have been banned by ${message.author.username}#${message.author.discriminator} due to ${reason}`);
        message.guild.member(user).ban();
    }

}

module.exports.help = {
    name: "ban"
}

