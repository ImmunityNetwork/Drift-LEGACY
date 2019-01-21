const { RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    message.delete();
    let reason = args.slice(1).join(' ');
    let user = message.mentions.members.first() || message.guild.member(args[0]);
    let modlogs = message.guild.channels.find(c => c.name === 'mod-logs');
    if (!modlogs) return message.channel.send(`Please make a \`mod-logs\` channel. Which the bot has permission to send messages!`)

    let muteRole = message.guild.roles.find(r => r.name === 'Drift Muted');
    let kickperm = message.member.hasPermission("MANAGE_MESSAGES");
    if(!kickperm) return message.reply("You dont have permmision to do that").then(message => message.delete(5000));
    let embed2 = new RichEmbed()
    .setTitle("Incorrect Usage")
    .setAuthor("Mute Command")
    .setColor("#BA1B1D")
    .addField("Correct Usage", "```dr!mute @user *reason*```")
    .setDescription("If a word is in asterisks/stars, it means it is OPTIONAL.");
    if(message.mentions.users.size < 1) return message.channel.send(embed2).then(message => message.delete(10000));

//    if(reason.length < 1) return message.reply("you must provide an explanation for your diciplinary action against another user.");

    if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('I do not have the correct permissions. Please do give me the correct permissions so that I may execute this command.').then(message => message.delete(60000));

    if(!reason) reason = 'General Misconduct';

    if(!muteRole) {
        try{
            muteRole = await message.guild.createRole({
                name: "Drift Muted",
                color: "#000000",
                permissions: []
            });
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }catch(e) {
            require("../utils/error.js").error(bot, e);
        }
    }

    if(user.roles.has(muteRole)) {
        const embed2 = new RichEmbed()
        .setTitle('Mute Report')
        .setAuthor('Drift Moderation -', message.author.avatarURL)
        .setColor(0x00AE86)
        .addField('User - ', `${user.user.tag} is already muted!`);
       return message.channel.send(embed2).then(message => message.delete(3500)).catch(e => require("../utils/error.js").error(bot, e));
    }else{
        const embed = new RichEmbed()
        .setTitle('Mute Report')
        .setAuthor('Drift Moderation -', message.author.avatarURL)
        .setColor(0x00AE86)
        .addField('Action - ', 'Mute')
        .addField('User - ', user.user.tag)
        .addField('Moderator - ', message.author.tag)
        .addField('Reason - ', reason);
      user.addRole(muteRole).then(() => {
            message.channel.send(embed).then(message => message.delete(3500).catch(e => require("../utils/error.js").error(bot, e))).catch(e => require("../utils/error.js").error(bot, e));
            user.send(`You have been muted by ${message.author.tag}, in ${message.guild.name}, due to ${reason}.`).catch(e => require("../utils/error.js").error(bot, e));
            message.guild.channels.find( c=> c.id === `${modlogs.id}`).send({embed}).catch(e => require("../utils/error.js").error(bot, e));
        });
    }

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

}

module.exports.help = {
    name: "mute",
    description:"Silence someone with the power of the mute command.",
    category: ""
}
