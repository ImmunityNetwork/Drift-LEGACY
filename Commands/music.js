const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const request = require('request');
const getYoutubeID = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info');

const botSettings = require('../botsettings.json');

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Drift Music Help Menu - ")
        .setDescription("Commands you can use for Drift!")
        .setThumbnail("https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png")
        .setColor("#9B59B6")
        .addField("|play - ", "Request a video for the robot hamsters to play!")
        .addField("|skip - ", "Request a skip!.")
        .addField("|queue - ", "Displays the CD's coming up on the list to play.")
        .addField("|pause - ", "Make the robot hamsters pause the music!")
        .addField("|resume - ", "Make the robot hamsters resume the music!")
        .addField("|volume - ", "Change the volume!")
        .addField("|leave - ", "Make the bot clear the queue and leave the channel.")
        .addField("|clear - ", "Clear the music queue!")
        .setFooter(`Drift is protected under GPL-3.0. ${message.author.createdAt}.`, "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");

    console.log("About Command has been executed.");
    message.channel.send({embed: embed}).then(message => message.delete(60000));

    
}

module.exports.help = {
    name: "music"
}
