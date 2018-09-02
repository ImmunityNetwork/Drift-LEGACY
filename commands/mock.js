const { RichEmbed } = require("discord.js");
module.exports.run = async (bot, message, args) => {
  let mockm = await bot.API.mock(args.join(" "));

  const embed = new RichEmbed()
    .setTitle("Mocked")
    .setColor("#1bade2")
    .setImage("https://i.imgur.com/B8s1txO.jpg")
    .setDescription(mockm)
    .setTimestamp();
  message.channel.send({
    embed
  });
};

exports.help = {
  name: "mock",
  description:"Mock some text just like ~~spongebob~~ spongemock."
};
