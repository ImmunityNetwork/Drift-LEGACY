const encode = require('strict-uri-encode');

module.exports.run = async (bot, message, args) => {
  if (args.length < 1) return message.reply("You must give something to search.")
  let question = encode(args.join(' '));
  let link = `https://www.lmgtfy.com/?q=${question}`;
  message.channel.send(`**<${link}>**`);;
}

module.exports.help = {
  name:"lmgtfy",
  description:"Hey! Let me google that for you!",
  category: ""
}
