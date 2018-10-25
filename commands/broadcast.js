const { RichEmbed } = require('discord.js'); 
module.exports.run = async (bot, message, args) => {
  let br = args.slice(0).join(' ');
  let userid = message.author.id;
let developers = [
"203516441683558400",
"236975433176842240",
"328580491290607616",
"322643069730029569",
"240310996390903808",
"283739077507809288",
"483363661285687317"
]; 
    if(developers.includes(userid)==false) return message.channel.send("You do not have access to this command!");
 
 let guildList = bot.guilds.array();
        try {
         guildList.forEach(guild => guild.channels.get(guild.channels.find('name', 'bot-status').id).send(`${br}`));
        } catch (err) {
            console.log("Could not send message to " + bot.guild.name);
        }
}
module.exports.help = {
    name: "broadcast"
}
  
