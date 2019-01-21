const {RichEmbed} = require("discord.js")
const color = require("color");
const convert = require('color-convert');
const toHex = require('colornames')
module.exports.run = async (bot, message, args) => {
    message.delete().catch(e => require("../utils/error.js").error(bot, e));
    if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('I do not have the correct permissions. Please do give me the correct permissions so that I may execute this command. Recommended ADMINISTRATOR.').then(message => message.delete(5000));
let rolen = args.slice(0, 1).join(" ");
let embed3 = new RichEmbed()
    .setTitle("Incorrect Usage")
    .setAuthor("Addrole Command")
    .setColor("#BA1B1D")
    .addField("Correct Usage", "```dr!addrole role color *true*```")
    .setDescription("If a word is in asterisks/stars, it means it is OPTIONAL. Sorry Hoisting is under developement, after the new update you will be able to choose. Join our discord at `dr!about` for updates! ~~In this case True means it will be on Discord Hoist. That is the bar that you look at when opened the members list. If added true it will show the role on there~~");
if(args < 1) return message.channel.send(embed3).then(message => message.delete(10000));
let colorn = args.slice(1, 2).join(" ");
// if(!colorn) return colorn = "#000000"; STAY
    let role = message.guild.roles.find(r => r.name === rolen);
    // let hoistn = args.slice(1, 2);
    // if(!hoistn) return hoistn = "false";
    // if(!hoistn === "true") return;
    let modlogs = message.guild.channels.find(c => c.name === 'mod-logs');
    if (!modlogs) return message.channel.send(`Please make a \`mod-logs\` channel. Which the bot has permission to send messages!`)
    let addPerm = message.member.hasPermission("MANAGE_ROLES");
    if(!addPerm) return message.reply("You dont have permmision to do that").then(message => message.delete(5000));
    if(!role) {
        try{
            role = await message.guild.createRole({
                name: `${rolen}`,
                hoist: true
            });
        }catch(e) {
            require("../utils/error.js").error(bot, e);
            message.channel.send(embed3);
        }
    }
    // console.log(toHex(colorn) || colorn);
    role.setColor(toHex(colorn) || colorn || "#979797")
  .catch(e => require("../utils/error.js").error(bot, e));
        const embed = new RichEmbed()
        .setTitle('Addrole')
        .setAuthor('Drift Moderation -', message.author.avatarURL)
        .setColor(0x00AE86)
        .addField('Moderator - ', message.author.tag)
        .addField('Role - ', role);
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
    name: "addrole",
    description: "Create a role using a command!"
}
