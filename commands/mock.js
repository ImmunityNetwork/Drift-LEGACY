const { RichEmbed } = require("discord.js");
module.exports.run = async (bot, message, args) => {
  let mockm = await bot.API.mock(args.join(" "));

  const embed = new RichEmbed()
    .setTitle("Mocked")
    .setColor(0x8e8e8e)
    .setImage("https://i.imgur.com/B8s1txO.jpg")
    .setDescription(mockm)
    .setTimestamp();
  message.channel.send({
    embed
  });
};

exports.help = {
  name: "mock"
};
