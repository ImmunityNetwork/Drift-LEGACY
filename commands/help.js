const { RichEmbed } = require("discord.js");
const botSettings = require("../botsettings.json")
module.exports.run = async (bot, message, args) => {
  const embed = new RichEmbed()
    .setTitle("Drift Help | Prefix " + botSettings.prefix)
    .setColor("#1bade2")
    .setThumbnail("https://cdn.discordapp.com/avatars/417450858024796161/0e4870e7a97dff4a12333eb4d2822ddf.png")
    .addField("about -", "Read some information about Drift!", true)
    .addField("bug -", "Report a Bug for us!", true)
    .addField("help -", "Sends this help screen.", true)
    .addField("invite -", "Invite this bot to your server!", true)
    .addField("ping -", "Check the bot's ping!", true)
    .addField("server -", "Read some information about your own server!", true)
    .addField("user", "Read some interesting information about yourself.", true)
    .addField("info", "Read some interesting information about the bot.", true)
    .addField("suggest -", "Suggest your idea to the Drift team!", true)
    .addField("feedback -", "Give your 10 cents about Drift.", true)
    .setDescription("Commands you can use for Drift!")
    .setTimestamp()
    .setFooter("Drift Development Team | Page 1");

    const embed2 = new RichEmbed()
    .setTitle("Drift Help | Moderation")
    .setColor("#BA3B46")
    .setThumbnail("https://cdn.discordapp.com/avatars/417450858024796161/0e4870e7a97dff4a12333eb4d2822ddf.png")
    .addField("addrole -", "Make a special role.", true)
    .addField("giverole -", "Give a role to someone special.", true)
    .addField("ban -", "Invoke the great power of the BAN HAMMER on someone.", true)
    .addField("banlist -", "Gives a list of banned users.", true)
    .addField("delrole -", "Delete a role.", true)
    .addField("takerole -", "Take off a role off of someone.", true)
    .addField("kick -", "Give someone the boot from the server.", true)
    .addField("mute -", "Silence someone with the power of the Mute Command.", true)
    .addField("purge -", "Destroys the evidence.", true)
    .addField("softban -", "Bans then unbans a user.", true)
    .addField("tempban -", "Temporarily bans a user.", true)
    .addField("tempmute -", "Temporarily mutes a user", true)
    .addField("unban", "Pardon someone from the BAN HAMMER.", true)
    .addField("unmute -", "Unmutes a user.", true)
    .addField("warn -", "Give a friendly warning to someone.", true)
    .setDescription("Commands you can use for Drift!")
    .setTimestamp()
    .setFooter("Drift Development Team | Page 2");

    const embed3 = new RichEmbed()
    .setTitle("Drift Help | Miscellaneous")
    .setColor("#61C9A8")
    .setThumbnail("https://cdn.discordapp.com/avatars/417450858024796161/0e4870e7a97dff4a12333eb4d2822ddf.png")
    .addField("avatar -", "Get a avatar off of a User!", true)
    .addField("embed  -", "Announce something as an embed!", true)
    .addField("launch  -", "Launch someone into space!", true)
    .addField("lmgtfy  -", "LMGTFY!", true)
    .addField("math  -", "Math solver, and can also convert!", true)
    .addField("mock -", "Mock someone in a hillarious way!", true)
    .addField("music -", "Sends a help embed for music commands.", true)
    .addField("nickname -", "Set yourself a nickname!", true)
    .addField("npm -", "Find information on your NPM packages", true)
    .addField("reminder -", "Remind yourself about something!", true)
    .addField("urban -", "Explore the Urban Dictionary! `-NSFW`", true)
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
