const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const request = require('request');
const getYoutubeID = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info');

const botSettings = require('../botsettings.json');

module.exports.run = async (bot, message, args) => {

    
    const yt_api_key = botSettings.yt_api_key;
    const bot_controller = botSettings.bot_controller;

    let queue = [];
    let isPlaying = false;
    let dispatcher = null;
    let voiceChannel = null;
    let skipReq = 0;
    let skippers = [];

    let musiclogs = bot.channels.find('name', 'music-logs');

    if(!musiclogs) {
        try{
            modlogs = await message.guild.createChannel(
                `music-logs`,
                `text`);
            message.reply("Please set up the permissions for #music-logs according to your needs manually. Automatic setup of #music-logs will come shortly. Thanks for your cooperation.");
        }catch(e){
            console.log(e.stack);
        }
    }
    
    function isYoutube(str) {
        return str.toString().toLowerCase().indexOf("youtube.com") > -1;
    }
    
    function search_video(query, callback) {
        request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_api_key, function(error, response, body) {
            let json = JSON.parse(body);
            callback(json.items[0].id.videoID)
        })
    }
    
    function getID(str, cb) {
        if (isYoutube(str)) {
            cb(getYoutubeID(str));
        }else{
            search_video(str, function(id){
                cb(id);
            });
        }
    }
    
    function add_to_queue(strID) {
        if(isYoutube(strID)) {
            queue.push(getID(getYoutubeID(strID)));
        }else{
            queue.push(strID);
        }
    }
    
    function skip_song(message){
        dispatcher.end();
        if(queue.length > 1) {
            playMusic(queue[0], message);
        }else{
            skipReq = 0
            skippers = [];
        }
    }

    function playMusic(id, message){
        voiceChannel = message.member.voiceChannel;

        if(!voiceChannel){
            const errorEmbed = new Discord.RichEmbed()
            .setTitle('')
            .setAuthor('Drift Music -', message.author.avatarURL)
            .setColor(0x00AE86)
            .addField('Error - ',  `I cannot play music if you are not in a voice channel!`)
            .setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
            message.channel.sendEmbed(errorEmbed).then(message => message.delete(60000));
        }

        voiceChannel.join().then(function (connection){
            stream = ytdl("https://www.youtube.com/watch?v=" + id, {
                filter: "audioonly"
            });
            skipReq = 0;
            skippers = [];

            dispatcher = connection.playStream(stream);
            dispatcher.on('end', function() {
                skipReq = 0;
                skippers = [];
                queue.shift();
                if(queue.length === 0) {
                    queue = [];
                    isPlaying = false;
                }else{
                    playMusic(queue[0], message);
                }
            });
        });
    }

    switch (args[0].toLowerCase()){
        case "play":
            if (queue.legnth > 0 || isPlaying){
                getID(args, function (id) {
                    add_to_queue(id);
                    fetchVideoInfo(id, function (err, videoInfo) {
                        if (err) throw new Error(err);
                        const playEmbed = new Discord.RichEmbed()
                        .setTitle('')
                        .setAuthor('Drift Music -', message.author.avatarURL)
                        .setColor(0x00AE86)
                        .addField('Song - ', '**' + videoInfo.title + `** has been added to the queue.`)
                        .addField('Queued by - ', `${message.author.username}#${message.author.discriminator}`)
                        .setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
                        message.channel.sendEmbed(playEmbed).then(message => message.delete(60000));
                        bot.channels.get(musiclogs.id).sendEmbed(playEmbed);
                    });
                });

            }else{
                isPlaying = true;
                getID(args, function(id) {
                    queue.push("placeholder");
                    playMusic(id, message);
                    fetchVideoInfo(id, function (err, videoInfo) {
                        if (err) throw new Error(err);
                        const playEmbed2 = new Discord.RichEmbed()
                        .setTitle('')
                        .setAuthor('Drift Music -', message.author.avatarURL)
                        .setColor(0x00AE86)
                        .addField('Song - ', '**' + videoInfo.title + `** is now playing.`)
                        .addField('Queued by - ', `${message.author.username}#${message.author.discriminator}`)
                        .setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
                        message.channel.sendEmbed(playEmbed2).then(message => message.delete(60000));
                        bot.channels.get(musiclogs.id).sendEmbed(playEmbed2);
                    });
                });
            }
            break;
        case "skip":
            if(skippers.indexOf(message.author.id) === -1){
                skippers.push(message.author.id);
                skipReq++;
                if(skipReq >= Math.ceil((voiceChannel.size - 1) / 2)){
                    skip_song(message);
                    const skipEmbed = new Discord.RichEmbed()
                    .setTitle('')
                    .setAuthor('Drift Music -', message.author.avatarURL)
                    .setColor(0x00AE86)
                    .addField('Skip - ',  `Your skip requests have been accepted. Skipping song now.`)
                    .setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
                    message.channel.sendEmbed(errorEmbed).then(message => message.delete(60000));
                    bot.channels.get(musiclogs.id).sendEmbed(skipEmbed);
                } else {
                    const skipEmbed2 = new Discord.RichEmbed()
                    .setTitle('')
                    .setAuthor('Drift Music -', message.author.avatarURL)
                    .setColor(0x00AE86)
                    .addField('Skip - ', `Your skip request has been recorded. You need **` + Math.ceil((voiceChannel.size - 1) / 2) - skipReq) + "** more Skip Requests. ";
                    message.channel.sendEmbed(skipEmbed2).then(message => message.delete(60000));
                }
            }else{
                const skipEmbed3 = new Discord.RichEmbed()
                    .setTitle('')
                    .setAuthor('Drift Music - ', message.avatar.avatarURL)
                    .setColor(0x00AE86)
                    .addField('Skip - ', `You already requested for a song skip!`)
                    .setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
            }
            break;
        case "volume":
            break;
        case "help":
            break;
    }

//    29:07

}

module.exports.help = {
    name: "music"
}
