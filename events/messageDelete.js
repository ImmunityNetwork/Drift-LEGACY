const { RichEmbed } = require("discord.js");
exports.run = async (bot, message) =>
{
  if (message.author.id == bot.user.id) return;
  let modlogs = message.guild.channels.find(c => c.name === 'mod-logs');
  if(!modlogs) {
    try{
      modlogs = await message.guild.createChannel("mod-logs", "text");
      //TODO Fix this.
      message.reply("Please set up the permissions for #mod-logs according to your needs manually. Automatic setup of #mod-logs will come shortly. Thanks for your cooperation.");
    }catch(e){
      require("../utils/error.js").error(bot, e)
    }
  }
  const embed = new RichEmbed()
    .setTitle("Message Deleted")
    .setAuthor("Drift Moderation - ")
    .setColor(0x00AE86)
    .addField("Action - ", "Message Deletion")
    .addField("User - ", `${message.author.tag}`)
    .addField('Message - ', `${message.content}`);
  modlogs.send(embed);

};
