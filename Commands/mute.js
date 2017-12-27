const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    console.log(args);
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    let modlogs = bot.channels.find('name', 'mod-logs');
    let muteRole = bot.guilds.get(message.guild.id).roles.find('name', 'Drift Muted');
    console.log(reason);

    if(message.mentions.users.size < 1) return message.reply("you must mention someone to warn them. (Logic at its finest.)").catch(console.error);

//    if(reason.length < 1) return message.reply("you must provide an explanation for your diciplinary action against another user.");

    if(!message.guild.member(bot.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions. Please do give me the correct permissions so that I may execute this command.')

    if(!reason) {
        reason = "General Misconduct."
    }

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
            console.log(e.stack);
        }
    }

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

    const embed = new Discord.RichEmbed()
    .setTitle('')
    .setAuthor('Drift Moderation -', message.author.avatarURL)
    .setColor(0x00AE86)
    .addField('Action - ', 'Mute')
    .addField('User - ', `${user.username}#${user.discriminator}`)
    .addField('Moderator - ', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason - ', `${reason}`)
    .setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
    return bot.channels.get(modlogs.id).sendEmbed(embed);

}

module.exports.help = {
    name: "mute"
}
