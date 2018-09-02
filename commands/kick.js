const { RichEmbed } = require('discord.js');


module.exports.run = async (bot, message, args) => {
    console.log(args);
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    let modlogs = message.guild.channels.find('name', 'mod-logs');
    let kickperm = message.channel.permissionsFor(message.member).hasPermission("KICK_MEMBERS");
    console.log(reason);
    if(!kickperm) return message.reply("You dont have permmision to do that").then(message => message.delete(60000));
    if(message.mentions.users.size < 1) return message.reply("you must mention someone to kick them. (Logic at its finest.)").then(message => message.delete(60000));

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


    if(!message.guild.member(user).kickable){
        return message.reply(`I have no power to kick them from the server at this time.`).then(message => message.delete(60000));
    } else {
        const embed = new RichEmbed()
        .setTitle('')
        .setAuthor('Drift Moderation -', message.author.avatarURL)
        .setColor(0x00AE86)
        .addField('Action - ', 'Kick')
        .addField('User - ', user.tag)
        .addField('Moderator - ', message.author.tag)
        .addField('Reason - ', `${reason}`);
        message.channel.send({embed}).then(message => message.delete(60000));
        message.guild.channels.get(modlogs.id).send({embed});
        message.guild.member(user).send(`You have been kicked by ${message.author.username}#${message.author.discriminator} due to ${reason}`);
        message.guild.member(user).kick();
    }

}

module.exports.help = {
    name: "kick",
    description:"Give someone the boot from the server."
}
