const { RichEmbed } = require('discord.js');


module.exports.run = async (bot, message, args) => {

    let user = message.mentions.users.first() || message.author;
    let randomnumber = Math.floor(Math.random() * 2);


    if(randomnumber === 1){
    let embed = new RichEmbed()
        .setTitle('Rocket')
        .setAuthor('Drift Miscellaneous -', message.author.avatarURL)
        .setThumbnail('https://static.pexels.com/photos/73871/rocket-launch-rocket-take-off-nasa-73871.jpeg')
        .setColor("#1bade2")
        .addField('Action - ', 'Launch')
        .addField(user.username + ' was launched into space by ' + message.author.username + '!', user.username + '`s rocket went to space!')
        .setImage('http://bestanimations.com/Sci-Fi/Rockets/nasa-rocket-in-space-animated-gif.gif');
    message.channel.send(embed).then(message => message.delete(60000)).catch(e => require("../utils/error.js").error(bot, e));;
    } else {
    let embed = new RichEmbed()
        .setTitle('Rocket')
        .setAuthor('Drift Miscellaneous -', message.author.avatarURL)
        .setThumbnail('https://static.pexels.com/photos/73871/rocket-launch-rocket-take-off-nasa-73871.jpeg')
        .setColor("#1bade2")
        .addField('Action - ', 'Launch')
        .addField(user.username + ' was launched into space by ' + message.author.username + '!', user.username + '`s rocket blew up!')
        .setImage('https://i.imgur.com/8jO42v5.gif');
    message.channel.send(embed).then(message => message.delete(60000)).catch(e => require("../utils/error.js").error(bot, e));;

    }

}

module.exports.help = {
    name: "launch",
    description:"Launch someone into space!",
    category: ""
}
