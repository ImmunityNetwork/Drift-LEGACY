const { RichEmbed } = require('discord.js');


module.exports.run = async (bot, message, args) => {
    console.log(args);
    let reason = args.slice(1).join(' ');
    let user = message.mentions.members.first() || message.guild.member(args[0]);
    let modlogs = message.guild.channels.find('name', 'mod-logs');
    let muteRole = message.guild.roles.find('name', 'Drift Muted');
    let unmuteperm = message.member.hasPermission("MANAGE_MESSAGES");
    if(!unmuteperm) return message.reply("You dont have permmision to do that").then(message => message.delete(10000));
    let embed2 = new RichEmbed()
    .setTitle("Incorrect Usage")
    .setAuthor("Unmute Command")
    .setColor("#BA1B1D")
    .addField("Correct Usage", "```dr!unmute @user *reason*```")
    .setDescription("If a word is in asterisks/stars, it means it is OPTIONAL.");
    if(message.mentions.users.size < 1) return message.channel.send(embed2).then(message => message.delete(600000));

//    if(reason.length < 1) return message.reply("you must provide an explanation for your diciplinary action against another user.");

    if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('I do not have the correct permissions. Please do give me the correct permissions so that I may execute this command.').then(message => message.delete(3500));

    if(!reason) {
        reason = "Reason Undefined by Moderator."
    }

    if(!message.guild.member(user).roles.has(muteRole.id)) {
        const embed2 = new RichEmbed()
        .setTitle('Unmute Report')
        .setAuthor('Drift Moderation -', message.author.avatarURL)
        .setColor(0x00AE86)
        .addField('User - ', `${user.tag} is not muted!`);
        message.channel.send({embed2}).then(message => message.delete(60000));
    }else{
        const embed = new RichEmbed()
        .setTitle('Unmute Report')
        .setAuthor('Drift Moderation -', message.author.avatarURL)
        .setColor(0x00AE86)
        .addField('Action - ', 'Unmute')
        .addField('User - ', user.tag)
        .addField('Moderator - ', message.author.tag)
        .addField('Reason - ', `${reason}`);
        message.guild.member(user).removeRole(muteRole).then(() => {
          user.send(`You have been unmuted by ${message.author.tag}, in ${message.guild.name}, due to ${reason}.`).catch(e => require("../utils/error.js").error(bot, e));
          modlogs.send({embed}).catch(e => require("../utils/error.js").error(bot, e));
        }).catch(e => require("../utils/error.js").error(bot, e));
    }

    if(!modlogs) {
        try{
            modlogs = await message.guild.createChannel(
                `mod-logs`,
                `text`);
            message.reply("Please set up the permissions for #mod-logs according to your needs manually. Automatic setup of #mod-logs will come shortly. Thanks for your cooperation.").then(message => message.delete(60000));
        }catch(e){
            console.log(e.stack);
        }
    }

    const embed = new RichEmbed()
    .setTitle('')
    .setAuthor('Drift Moderation -', message.author.avatarURL)
    .setColor(0x00AE86)
    .addField('Action - ', 'Unmute')
    .addField('User - ', `${user.username}#${user.discriminator}`)
    .addField('Moderator - ', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason - ', `${reason}`);

}

module.exports.help = {
    name: "unmute",
    description:"Unmute a user"
}
