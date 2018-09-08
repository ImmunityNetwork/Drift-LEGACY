const { RichEmbed } = require("discord.js");
const botSettings = require("../botsettings.json")
module.exports.run = async (bot, message, args) => {
  const embed = new RichEmbed()
    .setTitle("Drift Help | Prefix " + botSettings.prefix)
    .setColor("#1bade2")
    .setThumbnail("https://cdn.discordapp.com/avatars/417450858024796161/0e4870e7a97dff4a12333eb4d2822ddf.png")
    .addField("about -", "Read some information about Drift!")
    .addField("help -", "Sends this help screen.", true)
    .addField("ping -", "Check the bot's ping!")
    .addField("server -", "Read some information about your own server!", true)
    .addField("user", "Read some interesting information about yourself.")
    .addField("suggest -", "Suggest your idea to the Drift team!", true)
    .addField("feedback -", "Give your 10 cents about Drift.")
    .setDescription("Commands you can use for Drift!")
    .setTimestamp()
    .setFooter("Drift Development Team | Page 1");

    const embed2 = new RichEmbed()
    .setTitle("Drift Help | Moderation")
    .setColor("#BA3B46")
    .setThumbnail("https://cdn.discordapp.com/avatars/417450858024796161/0e4870e7a97dff4a12333eb4d2822ddf.png")
    .addField("ban -", "Invoke the great power of the BAN HAMMER on someone.")
    .addField("kick -", "Give someone the boot from the server.", true)
    .addField("mute -", "Silence someone with the power of the Mute Command.")
    .addField("purge -", "Destroys the evidence.", true)
    .addField("unban", "Pardon someone from the BAN HAMMER.")
    .addField("warn -", "Give a friendly warning to someone.", true)
    .setDescription("Commands you can use for Drift!")
    .setTimestamp()
    .setFooter("Drift Development Team | Page 2");

    const embed3 = new RichEmbed()
    .setTitle("Drift Help | Miscellaneous")
    .setColor("#61C9A8")
    .setThumbnail("https://cdn.discordapp.com/avatars/417450858024796161/0e4870e7a97dff4a12333eb4d2822ddf.png")
    .addField("embed  -", "Announce something as an embed!")
    .addField("launch  -", "Launch someone into space!", true)
    .addField("music -", "Sends a help embed for music commands.")
    .addField("purge -", "Destroys the evidence.", true)
    .addField("mock", "Mock some text just like --spongebob-- spongemock.")
    .setDescription("Commands you can use for Drift!")
    .setTimestamp()
    .setFooter("Drift Development Team | Page 3");
//Start
try {
let help1;
let help2;
let help3;

   help1 = await message.channel.send(embed);
    await help1.react("▶");

    await help1.awaitReactions(reaction => reaction.emoji.name === "▶", {max: 2, time: 30000});
    //Start 2
      if(help1.reactions.get("▶").count-1 === 1){
        help1.clearReactions();
        help1.edit(embed2)
        .then(() => {
          help1.react("▶")
        })
      }

      await help1.awaitReactions(reaction => reaction.emoji.name === "▶", {max: 2, time: 30000});

    if(help1.reactions.get("▶").count-1 === 1){
      help1.clearReactions();
        help1.edit(embed3)
        .then(() => {
          help1.react("◀")
        })
    }

    await help1.awaitReactions(reaction => reaction.emoji.name === "◀", {max: 2, time: 30000});

    if(help1.reactions.get("◀").count-1 === 1){
        help1.clearReactions();
        help1.edit(embed2)
        .then(() => {
          help1.react("◀")
        })
    }

    await help1.awaitReactions(reaction => reaction.emoji.name === "◀", {max: 2, time: 30000});

    if(help1.reactions.get("◀").count-1 === 1){
      help1.clearReactions();
        help1.edit(embed)
        .then(() => {
          help1.react("▶")
        })
    }

help1.delete(30000);

      } catch(err){
        require("../utils/error.js").error(bot, err);
      }
};

exports.help = {
  name:"help",
  description:"Sends this help message."
};
