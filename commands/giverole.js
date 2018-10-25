const {RichEmbed} = require("discord.js")
module.exports.run = async (bot, message, args) => {
    message.delete()
let rolen = args.slice(1).join(' ');
let embed3 = new RichEmbed()
    .setTitle("Incorrect Usage")
    .setAuthor("Giverole Command")
    .setColor("#BA1B1D")
    .addField("Correct Usage", "```dr!giverole @user roleID```")
    .setDescription("If a word is in asterisks/stars, it means it is OPTIONAL.");
    let user = message.mentions.members.first() || message.guild.member(args[0]);
    let modlogs = message.guild.channels.find(c => c.name === 'mod-logs');
    if (!modlogs) return message.channel.send(`Please make a \`mod-logs\` channel. Which the bot has permission to send messages!`)
    let role = message.guild.roles.find(r => r.id === rolen);
    let addPerm = message.member.hasPermission("MANAGE_ROLES");
    if(!addPerm) return message.reply("You dont have permmision to do that").then(message => message.delete(5000));
    if(message.mentions.users.size < 1) return message.channel.send(embed3).then(message => message.delete(10000));
    if(!role) return message.channel.send(embed3).then(message => message.delete(10000));
    if(user.roles.has(role)) {
        const embed2 = new RichEmbed()
        .setTitle('Giverole')
        .setAuthor('Drift Moderation -', message.author.avatarURL)
        .setColor(0x00AE86)
        .addField('User - ', `${user.user.tag} is already has the role!`);
       return message.channel.send(embed2).then(message => message.delete(3500)).catch(e => require("../utils/error.js").error(bot, e));
    }else{
        const embed = new RichEmbed()
        .setTitle('Giverole')
        .setAuthor('Drift Moderation -', message.author.avatarURL)
        .setColor(0x00AE86)
        .addField('User - ', user.user.tag)
        .addField('Moderator - ', message.author.tag)
        .addField('Role - ', role);
    user.addRole(role).then(() => {
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
    name: "giverole"
}