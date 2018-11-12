const { RichEmbed } = require('discord.js');


module.exports.run = async (bot, message, args) => {
    let reason = args.slice(1).join(' ');
    let user = args[0];
    let modlogs = message.guild.channels.find(c => c.name === 'mod-logs');
    let banperm = message.member.hasPermission("BAN_MEMBERS");
    let botBanPerm = message.guild.me.hasPermission("BAN_MEMBERS");
    if (!botBanPerm) return message.reply("I don't have permission to do that.").then(message => message.delete(10000).catch(e => require("../utils/error.js").error(bot, e)));
    if(!banperm) return message.reply("You dont have permmision to do that").then(message => message.delete(10000).catch(e => require("../utils/error.js").error(bot, e)));
    let embed2 = new RichEmbed()
    .setTitle("Incorrect Usage")
    .setAuthor("Unban Command")
    .setColor("#BA1B1D")
    .addField("Correct Usage", "```dr!unban <userid> *reason*```")
    .setDescription("If a word is in asterisks/stars, it means it is OPTIONAL.");
    if(!user) return message.channel.send(embed2).then(message => message.delete(10000));

    if(!modlogs) {
        try{
            modlogs = await message.guild.createChannel('mod-logs', 'text');
            message.reply("Please set up the permissions for #mod-logs according to your needs manually. Automatic setup of #mod-logs will come shortly. Thanks for your cooperation.")
        }catch(e){
          require("../utils/error.js").error(bot, e);
        }
    }

    if(!reason) reason = "Accepted appeal.";

        const embed = new RichEmbed()
        .setTitle('Unban Report')
        .setAuthor('Drift Moderation -', message.author.avatarURL)
        .setColor(0x00AE86)
        .addField('Action - ', 'Unban')
        .addField('User ID - ', `${user}`)
        .addField('Moderator - ', message.author.tag)
        .addField('Reason - ', `${reason}`);
        modlogs.send({embed});
        message.guild.unban(user).catch(e => require("../utils/error.js").error(bot, e));
        user.send(`You have been unbanned by ${message.author.tag}, in ${message.guild.name}, due to ${reason}.`).catch(e => require("../utils/error.js").error(bot, e));
}
module.exports.help = {
    name: "unban",
    description:"Pardon someone from the BAN HAMMER."
}
