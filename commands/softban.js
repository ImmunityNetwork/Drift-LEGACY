const {RichEmbed} = require("discord.js")

module.exports.run = async(bot, message, args) => {
    message.delete();
    let reason = args.slice(1).join(' ');
     let user = message.mentions.members.first();
     let modlogs = message.guild.channels.find(c => c.name === 'mod-logs');

       let banperm = message.member.permissions.has("BAN_MEMBERS")
       if(!banperm) return message.reply("You dont have permmision to do that").then(message => message.delete(10000));
       let embed2 = new RichEmbed()
    .setTitle("Incorrect Usage")
    .setAuthor("Softban Command")
    .setColor("#BA1B1D")
    .addField("Correct Usage", "```dr!softban @user *reason*```")
    .setDescription("If a word is in asterisks/stars, it means it is OPTIONAL.");
       if(message.mentions.users.size < 1) return message.channel.send(embed2).then(message => message.delete(10000));

       if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply('I do not have the correct permissions. Please do give me the correct permissions so that I may execute this command.').then(message => message.delete(5000));

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


       if(!message.guild.member(user).bannable){
           return message.reply(`I have no power to ban them from the server at this time.`).then(message => message.delete(60000));
       } else {
           const embed = new RichEmbed()
           .setTitle('Softban')
           .setAuthor('Drift Moderation -', message.author.avatarURL)
           .setColor(0x00AE86)
           .addField('Action - ', 'Ban')
           .addField('User - ', user.tag)
           .addField('Moderator - ', message.author.tag)
           .addField('Reason - ', reason);
           modlogs.send({embed: embed}).catch(e => require("../utils/error.js").error(bot, e));
           user.send(`You have been softbanned by ${message.author.tag}, in ${message.guild.name}, due to ${reason}.`).catch(e => require("../utils/error.js").error(bot, e));
           message.guild.member(user).ban({days: 1}).catch(e => require("../utils/error.js").error(bot, e));
           message.guild.unban(user)
       }
}

module.exports.help = {
    name: "softban",
    description: "Softban people yey <--- needs a better description",
    category: ""  
}
