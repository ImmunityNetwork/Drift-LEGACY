const {
  RichEmbed
} = require('discord.js');


module.exports.run = async (bot, message, args) => {
  let messages = args[0];
  let delet = messages + 1;
  let modlogs = message.guild.channels.find('name', 'mod-logs');
  let managemessagesperm = message.member.hasPermission("MANAGE_MESSAGES");
  let botmanagemessage = message.guild.me.hasPermission("MANAGE_MESSAGES");
  if (!botmanagemessage) return message.reply("I dont have permmision to do that. I require the `MANAGE MESSAGES` Permission").then(message => message.delete(60000));
  if (!managemessagesperm) return message.reply("You dont have permmision to do that").then(message => message.delete(60000));
  if (!modlogs) {
    try {
      modlogs = await message.guild.createChannel(
        `mod-logs`,
        `text`);
      message.reply("Please set up the permissions for #mod-logs according to your needs manually. Automatic setup of #mod-logs will come shortly. Thanks for your cooperation.")
    } catch (e) {
      require("../utils/error.js").error(bot, e);
    }
  }
  message.delete();
  const fetched = await message.channel.fetchMessages({
    limit: args[0]
  });

  message.channel.bulkDelete(fetched).catch(e => {
    require("../utils/error.js").error(bot, e);
    message.channel.send("There was an error! This could have been caused by missing permissions or an error in the code. Contact support for help.");
  });

  let embed = new RichEmbed()
  .setAuthor('Drift Moderation -', message.author.avatarURL)
    .setTitle("Purge")
    .setDescription(`Deleted ${messages} messages in #${message.channel.name}.`)
    .setThumbnail("https://cdn.discordapp.com/avatars/417450858024796161/0e4870e7a97dff4a12333eb4d2822ddf.png")
    .setColor(0x00AE86)
    .addField('Moderator - ', `${message.author.tag}`);
  message.channel.send({
    embed: embed
  }).then(message => message.delete(10000).catch(e => {
    require("../utils/error.js").error(bot, e);
    message.channel.send("There was an error! This could have been caused by missing permissions or an error in the code. Contact support for help.");
  }));
  modlogs.send({
    embed
  });
}

module.exports.help = {
  name: "purge",
  description: "Destroys the evidence. (Deletes mass amounts of messages)",
  category: ""
}
