const { RichEmbed } = require('discord.js');


module.exports.run = async (bot, message, args) => {
    console.log(args);

    let user = message.mentions.users.first();
    let randomnumber = Math.floor(Math.random() * 2);



    if(message.mentions.users.size < 1) return message.reply("You must mention someone to launch them. (Logic at its finest.)").then(message => message.delete(60000));



    if(randomnumber === 1){
    let embed = new RichEmbed()
        .setTitle('')
        .setAuthor('Drift Rocket -', 'https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png')
        .setThumbnail('https://static.pexels.com/photos/73871/rocket-launch-rocket-take-off-nasa-73871.jpeg')
        .setColor(0x00AE86)
        .addField('Action - ', 'Launch')
        .addField(user.username + ' was launched into space by ' + message.author.username + '!', user.username + '`s rocket went to space!')
        .setImage('http://bestanimations.com/Sci-Fi/Rockets/nasa-rocket-in-space-animated-gif.gif');
    message.channel.sendEmbed(embed).then(message => message.delete(60000));
    } else {
    let embed = new RichEmbed()
        .setTitle('')
        .setAuthor('Drift Rocket -', 'https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png')
        .setThumbnail('https://static.pexels.com/photos/73871/rocket-launch-rocket-take-off-nasa-73871.jpeg')
        .setColor(0x00AE86)
        .addField('Action - ', 'Launch')
        .addField(user.username + ' was launched into space by ' + message.author.username + '!', user.username + '`s rocket blew up!')
        .setImage('https://i.imgur.com/8jO42v5.gif');
    message.channel.sendEmbed(embed).then(message => message.delete(60000));

    }

}

module.exports.help = {
    name: "launch"
}
