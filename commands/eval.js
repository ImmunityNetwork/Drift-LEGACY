module.exports.run = (bot, message, args) => {
  let devs = ["328580491290607616", "283739077507809288", "203516441683558400", "483363661285687317", "250536623270264833", "322643069730029569", "240310996390903808", "246837377920794626", "236975433176842240"];
  if (!devs.includes(message.author.id)) return;
  const content = message.content.split(' ').slice(1).join(' ');
  const result = new Promise((resolve, reject) => resolve(eval(content)));

  return result.then(output => {
    if (typeof output !== 'string') output = require('util').inspect(output, {
      depth: 0
    });
    if (output.includes(bot.token)) output = output.replace(bot.token, 'Not for your eyes');
    if (output.length > 1990) console.log(output), output = 'Too long to be printed (content got console logged)';

    return message.channel.send(output, {
      code: 'js'
    });
  }).catch(err => {
    console.error(err);
    err = err.toString();

    if (err.includes(bot.token)) err = err.replace(bot.token, 'Not for your eyes');

    return message.channel.send(err, {
      code: 'js'
    });
  });
}


exports.help = {
  name: "eval",
  description:"Evaluates Code.",
  category: ""
}
