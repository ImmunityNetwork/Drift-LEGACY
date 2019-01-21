const { RichEmbed } = require('discord.js');
module.exports.run = async (bot, message, args) => {
    console.log(args);
    let reason = args.slice(1).join(' ');
    let user = message.mentions.members.first() || message.guild.member(args[0]);
    let modlogs = message.guild.channels.find(c => c.name === 'mod-logs');
    if (!modlogs) return message.channel.send(`Please make a \`mod-logs\` channel. Which the bot has permission to send messages!`)

    let kickperm = message.member.hasPermission("KICK_MEMBERS");
    let kperm = message.guild.me.hasPermission("KICK_MEMBERS");
    let botPermEmbed = new RichEmbed()
    .setColor("#BA1B1D")
    .setDescription("❌I'm missing the permission to kick members")
    if (!kperm) return message.reply("")
    if(!kickperm) return message.reply("❌You dont have permmision to do that").then(message => message.delete(10000));
    let embed2 = new RichEmbed()
    .setTitle("Incorrect Usage")
    .setAuthor("Kick Command")
    .setColor("#BA1B1D")
    .addField("Correct Usage", "```dr!kick @user *reason*```")
    .setDescription("If a word is in asterisks/stars, it means it is OPTIONAL.");
    if(message.mentions.users.size < 1) return message.channel.send(embed2).then(message => message.delete(10000));

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

    if(!reason) {
        reason = "General Misconduct."
    }


    if(!message.guild.member(user).kickable){
        return message.reply(`I have no power to kick them from the server at this time.`).then(message => message.delete(60000));
    } else {
        const embed = new RichEmbed()
        .setTitle('Kick Report')
        .setAuthor('Drift Moderation -', message.author.avatarURL)
        .setColor(0x00AE86)
        .addField('Action - ', 'Kick')
        .addField('User - ', user.tag)
        .addField('Moderator - ', message.author.tag)
        .addField('Reason - ', `${reason}`);
        message.channel.send({embed}).then(message => message.delete(60000).catch(e => require("../utils/error.js").error(bot, e))).catch(e => require("../utils/error.js").error(bot, e));
        modlogs.send({embed}).catch(e => require("../utils/error.js").error(bot, e));
        user.send(`You have been kicked by ${message.author.tag}, in ${message.guild.name}, due to ${reason}.`).catch(e => require("../utils/error.js").error(bot, e));;
        message.guild.member(user).kick().catch(e => require("../utils/error.js").error(bot, e));;
    }

}

module.exports.help = {
    name: "kick",
    description:"Give someone the boot from the server.",
    category: ""
}
