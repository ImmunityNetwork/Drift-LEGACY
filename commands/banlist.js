const Discord = require('discord.js');
const arraySort = require('array-sort');
const table = require('table');

module.exports.run = async (bot, message, args) => {

    let bans = await message.guild.fetchBans().catch(error => {
        return message.channel.send('Sorry, I don\'t have the proper permissions to view bans!');
    });

    bans = bans.array();

    arraySort(bans, 'size', {
        reverse: true
    });

    let config;

config = {
    columnCount: 1,
    columns: {
        0: {
            alignment: 'center'
        }
    }
};

    let possiblebans = bans.map(b => [b.username, b.id])
    possiblebans.unshift(['Users', 'ID'])

    const embed = new Discord.RichEmbed()
    .setAuthor('Drift Moderation -', message.author.avatarURL)
        .setColor(0xCB5A5E)
        .addField('Bans', `\`\`\`${table.table(possiblebans, config)}\`\`\``);
        // message.channel.send(embed);
    message.channel.fetchWebhooks().then(webhook => {
        let banListWH = webhook.find("name", "Drift")

        if(!banListWH) {
            message.channel.createWebhook("Drift", "https://cdn.discordapp.com/avatars/417450858024796161/0e4870e7a97dff4a12333eb4d2822ddf.png").catch(e => require("../utils/error.js").error(bot, e))
            webhook.send(embed).catch(e => require("../utils/error.js").error(bot, e))
        }

        banListWH.send(embed).catch(e => require("../utils/error.js").error(bot, e)); 

    }).catch(error => {
        return message.channel.send('Sorry, I don\'t have the proper permissions to view bans!');
    });
};

module.exports.help = {
    name: "banlist",
    description: "Returns a list of all bans",
    category: ""
}
