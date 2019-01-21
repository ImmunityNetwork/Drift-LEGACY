const {RichEmbed} = require("discord.js")
module.exports.run = async (bot, message, args) => {
    message.delete();
    if(!message.guild.member(bot.user).hasPermission('MANAGE_ROLES')) return message.reply('I do not have the correct permissions. Please do give me the correct permissions so that I may execute this command. Recommended ADMINISTRATOR.').then(message => message.delete(5000));
let rolen = args.join(" ");
let embed3 = new RichEmbed()
    .setTitle("Incorrect Usage")
    .setAuthor("Delrole Command")
    .setColor("#BA1B1D")
    .addField("Correct Usage", "```dr!delrole roleID```")
    .setDescription("If a word is in asterisks/stars, it means it is OPTIONAL.");
    if(args < 1) return message.channel.send(embed3).then(message => message.delete(10000));
    let role = message.guild.roles.find(r => r.id === rolen);
    if(!role) return message.channel.send(embed3).then(message => message.delete(10000));
    let modlogs = message.guild.channels.find(c => c.name === 'mod-logs');
    if (!modlogs) return message.channel.send(`Please make a \`mod-logs\` channel. Which the bot has permission to send messages!`)
    let addPerm = message.member.hasPermission("MANAGE_ROLES");
    if(!addPerm) return message.reply("You dont have permmision to do that").then(message => message.delete(5000));
        const embed = new RichEmbed()
        .setTitle('Delrole')
        .setAuthor('Drift Moderation -', message.author.avatarURL)
        .setColor(0x00AE86)
        .addField('Moderator - ', message.author.tag)
        .addField('Role - ', role.name)
        .addField('RoleID - ', rolen);
        role.delete();
        message.guild.channels.find( c=> c.id === `${modlogs.id}`).send({embed}).catch(e => require("../utils/error.js").error(bot, e));
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
    name: "delrole",
    description: "Deletes a role from the server using a command",
    category: ""
}
