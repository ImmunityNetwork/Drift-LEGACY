const { RichEmbed } = require('discord.js');


module.exports.run = async (bot, message, args) => {
    console.log(args);
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    let modlogs = message.guild.channels.find('name', 'mod-logs');
    let kickperm = message.channel.permissionsFor(message.member).hasPermission("KICK_MEMBERS");
    console.log(reason);
    if(!kickperm) return message.reply("You dont have permmision to do that").then(message => message.delete(60000));
    if(message.mentions.users.size < 1) return message.reply("you must mention someone to warn them. (Logic at its finest.)").catch(console.error);

//    if(reason.length < 1) return message.reply("you must provide an explanation for your diciplinary action against another user.");

    if(!reason) {
        reason = "General Misconduct."
    }

    if(!modlogs) {
        try{
            modlogs = await message.guild.createChannel('mod-logs', 'text');
            message.reply("Please set up the permissions for #mod-logs according to your needs manually. Automatic setup of #mod-logs will come shortly. Thanks for your cooperation.")
        }catch(e){
            console.log(e.stack);
        }
    }

    const embed = new RichEmbed()
    .setTitle('')
    .setAuthor('Drift Moderation -', message.author.avatarURL)
    .setColor(0x00AE86)
    .addField('Action - ', 'Warning')
    .addField('User - ', user.tag)
    .addField('Moderator - ', message.author.tag)
    .addField('Reason - ', `${reason}`);
    message.channel.send({embed});
    return message.guild.channels.get(modlogs.id).send({embed});

}

module.exports.help = {
    name: "warn",
    description:"Give a friendly warning to someone."
}
