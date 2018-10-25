const { RichEmbed } = require('discord.js');


module.exports.run = async (bot, message, args) => {
    let reason = args.slice(1).join(' ');
    let user = message.mentions.members.first() || message.guild.member(args[0]);
    let modlogs = message.guild.channels.find(c => c.name === 'mod-logs');
    let kickperm = message.member.permissions.has("MANAGE_MESSAGES");
    if(!kickperm) return message.reply("You dont have permmision to do that").then(message => message.delete(10000));
    let embed2 = new RichEmbed()
    .setTitle("Incorrect Usage")
    .setAuthor("Warn Command")
    .setColor("#BA1B1D")
    .addField("Correct Usage", "```dr!warn @user *reason*```")
    .setDescription("If a word is in asterisks/stars, it means it is OPTIONAL.");
    if(message.mentions.users.size < 1)  return message.channel.send(embed2).catch(e => require("../utils/error.js").error(bot, e));
    // if(message.mentions.users.size < 1) return message.reply("you must mention someone or provide an id to warn them. (Logic at its finest.)").catch(e => require("../utils/error.js").error(bot, e));

//    if(reason.length < 1) return message.reply("you must provide an explanation for your diciplinary action against another user.");

    if(!reason) {
        reason = "General Misconduct."
    }

    if(!modlogs) {
        try{
            modlogs = await message.guild.createChannel('mod-logs', 'text');
            message.reply("Please set up the permissions for #mod-logs according to your needs manually. Automatic setup of #mod-logs will come shortly. Thanks for your cooperation.")
        }catch(e){
            require("../utils/error.js").error(bot, e);
        }
    }

    const embed = new RichEmbed()
    .setTitle('Warn Report')
    .setAuthor('Drift Moderation -', message.author.avatarURL)
    .setColor("#ed5136")
    .addField('Action - ', 'Warning')
    .addField('User - ', user.tag)
    .addField('Moderator - ', message.author.tag)
    .addField('Reason - ', `${reason}`);
    message.reply(user.tag + " has been warned");
    modlogs.send({embed: embed});
    user.send(`You have been warned on ${message.guild.name}, for ${reason}, by ${message.author.tag}. If you have a problem with this punishment, check the server rules and see how it can be handled!`).catch(e => require("../utils/error.js").error(bot, e));

}

module.exports.help = {
    name: "warn",
    description:"Give a friendly warning to someone."
}
