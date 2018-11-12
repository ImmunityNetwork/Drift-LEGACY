const { RichEmbed } = require('discord.js');
const ms = require("ms");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
    message.delete();
    console.log(args);
    let mutetime = args[1];
    if(!mutetime) return message.reply("You didn't specify a time!");
    let reason = args.slice(2).join(' ');
    let mUser = message.mentions.members.first() || message.guild.member(args[0]);
    let modlogs = message.guild.channels.find(c => c.name === 'mod-logs');

       if (!modlogs) return message.channel.send(`Please make a \`mod-logs\` channel. Which the bot has permission to send messages!`)
     let muteRole = message.guild.roles.find('name', 'Drift Muted');

      let kickperm = message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES");
    console.log(reason);
    if(!kickperm) return message.reply("You don't have permmision to do that").then(message => message.delete(5000));
    let embed2 = new RichEmbed()
    .setTitle("Incorrect Usage")
    .setAuthor("Tempmute Command")
    .setColor("#BA1B1D")
    .addField("Correct Usage", "```dr!tempmute @user time *reason*```")
    .setDescription("If a word is in asterisks/stars, it means it is OPTIONAL.");
    if(message.mentions.users.size < 1) return message.channel.send(embed2).then(message => message.delete(5000));

//    if(reason.length < 1) return message.reply("you must provide an explanation for your diciplinary action against another user.");

    if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('I do not have the correct permissions. Please do give me the correct permissions so that I may execute this command.').then(message => message.delete(5000));

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

    if(message.guild.member(mUser).roles.has(muteRole.id)) {
        const embed2 = new RichEmbed()
        .setTitle('Error')
        .setAuthor('Drift Moderation -', message.author.avatarURL)
        .setColor(0x00AE86)
        .addField('User - ', `${mUser.tag} is already muted!`);
        message.channel.sendEmbed(embed2).then(message => message.delete(3500)).catch(e => require("../utils/error.js").error(bot, e));
    }else{
        const embed = new RichEmbed()
        .setTitle('TempMute Report')
        .setAuthor('Drift Moderation -', message.author.avatarURL)
        .setDescription(`${message.author.username}'s tempmute report on ${mUser.tag}`)
        .setColor('#1A8A39')
        .addField("Muted user:", `${mUser} with id ${mUser.id}`)
        .addField("Muted by:", `${message.author} with tag ${message.author.tag}`)
        .addField("Muted for:", mutetime)
        .addField("Muted in:", `${message.channel}`)
        .addField("Time:", `${moment().format('LTS')}`)
        .addField("Date:", moment().format('LL'))
        .addField("Reason:", reason)
        .setFooter('Drift Mute -', message.author.avatarURL)
        message.guild.member(mUser).addRole(muteRole).then(() => {
            mUser.send(`You have been muted by ${message.author.tag}, in ${message.guild.name}, due to ${reason}. Muted for ${mutetime}`).catch(e => require("../utils/error.js").error(bot, e));
            message.guild.channels.get(modlogs.id).send({embed}).catch(e => require("../utils/error.js").error(bot, e));
            setTimeout(function(){
                message.guild.member(mUser).removeRole(muteRole);
                mUser.send(`You have been unmuted`);
              }, ms(mutetime));
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
    name: "tempmute",
    description:"Silence someone with the power of the mute command, temporarily."
}
