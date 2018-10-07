const {RichEmbed} = require("discord.js")
module.exports.run = async (bot, message, args) => {
let rolen = args.slice(1).join(' ');
if(!rolen) return message.channel.send("Provide a role to add")
    let user = message.mentions.members.first() || message.guild.member(args[0]);
    let modlogs = message.guild.channels.find(c => c.name === 'mod-logs');
    if (!modlogs) return message.channel.send(`Please make a \`mod-logs\` channel. Which the bot has permission to send messages!`)

    let role = message.guild.roles.find(r => r.name === rolen);
    let addPerm = message.member.hasPermission("MANAGE_ROLES");
    if(!addPerm) return message.reply("You dont have permmision to do that").then(message => message.delete(5000));
    if(!user) return message.reply("You must mention someone to mute them.").then(message => message.delete(5000));
    if(!role) return nessage.channel.send("No Role exists");
    if(user.roles.has(role)) {
        const embed2 = new RichEmbed()
        .setTitle('Addrole')
        .setAuthor('Drift Moderation -', message.author.avatarURL)
        .setColor(0x00AE86)
        .addField('User - ', `${user.user.tag} is already has the role!`);
       return message.channel.send(embed2).then(message => message.delete(3500)).catch(e => require("../utils/error.js").error(bot, e));
    }else{
        const embed = new RichEmbed()
        .setTitle('Addrole')
        .setAuthor('Drift Moderation -', message.author.avatarURL)
        .setColor(0x00AE86)
        .addField('User - ', user.user.tag)
        .addField('Moderator - ', message.author.tag)
        .addField('Role - ', role);
    user.addRole(role).then(() => {
        message.channel.send(embed).then(message => message.delete(3500));
        user.send(`You have been given the role \`${rolen}\` by ${message.author.tag}.`).catch(e => require("../utils/error.js").error(bot, e));
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
    name: "addrole"
}
