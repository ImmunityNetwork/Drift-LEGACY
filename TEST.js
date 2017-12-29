				////////////////////////////////////////////////////////////////////////////////   
				//    This program is free software: you can redistribute it and/or modify    //   
				//    it under the terms of the GNU General Public License as published by    //   
				//    the Free Software Foundation, either version 3 of the License, or       //   
				//    (at your option) any later version.                                     //   
				//                                                                            //   
				//    This program is distributed in the hope that it will be useful,         //   
				//    but WITHOUT ANY WARRANTY; without even the implied warranty of          //   
				//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the           //   
				//    GNU General Public License for more details.                            //   
				//                                                                            //   
				//    You should have received a copy of the GNU General Public License       //   
				//    along with this program.  If not, see <http://www.gnu.org/licenses/>.   //   
				////////////////////////////////////////////////////////////////////////////////

const Discord = require("discord.js");
const fs = require("fs");
const ytdl = require("ytdl-core");
const request = require("request");

const bot = new Discord.Client({autoReconnect: true, max_message_cache: 0});

const dm_text = "Hey there! Use !commands on a public chat room to see the command list.";
const mention_text = "Use !commands to see the command list.";
var aliases_file_path = "aliases.json";

var stopped = false;
var inform_np = true;

var now_playing_data = {};
var queue = [];
var aliases = {};

var voice_connection = null;
var voice_handler = null;
var text_channel = null;

var yt_api_key = null;

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

var commands = [

	{
		command: "stop",
		description: "Stops playlist (will also skip current song!)",
		parameters: [],
		execute: function(message, params) {
			if(stopped) {
				message.reply("Playback is already stopped!");
			} else {
				stopped = true;
				if(voice_handler !== null) {
					voice_handler.end();
				}
				message.reply("Stopping!");
			}
		}
	},
	
	{
		command: "resume",
		description: "Resumes playlist",
		parameters: [],
		execute: function(message, params) {
			if(stopped) {
				stopped = false;
				if(!is_queue_empty()) {
					play_next_song();
				}
			} else {
				message.reply("Playback is already running");
			}
		}
	},

    {
        command: "request",
        description: "Adds the requested video to the playlist queue",
        parameters: ["video URL, video ID, playlist URL or alias"],
        execute: function (message, params) {
            if(aliases.hasOwnProperty(params[1].toLowerCase())) {
                params[1] = aliases[params[1].toLowerCase()];
            }

            var regExp = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
            var match = params[1].match(regExp);

            if (match && match[2]){
                queue_playlist(match[2], message);
            } else {
                add_to_queue(params[1], message);
            }
        }
    },

	{
		command: "search",
		description: "Searches for a video on YouTube and adds it to the queue",
		parameters: ["query"],
		execute: function(message, params) {
			if(yt_api_key === null) {
				message.reply("You need a YouTube API key in order to use the !search command. Please see https://github.com/agubelu/discord-music-bot#obtaining-a-youtube-api-key");
			} else {
				var q = "";
				for(var i = 1; i < params.length; i++) {
					q += params[i] + " ";
				}
				search_video(message, q);
			}
		}
	},

	{
		command: "np",
		description: "Displays the current song",
		parameters: [],
		execute: function(message, params) {

			var response = "Now playing: ";
			if(is_bot_playing()) {
				response += "\"" + now_playing_data["title"] + "\" (requested by " + now_playing_data["user"] + ")";
			} else {
				response += "nothing!";
			}

			message.reply(response);
		}
	},

	{
		command: "setnp",
		description: "Sets whether the bot will announce the current song or not",
		parameters: ["on/off"],
		execute: function(message, params) {

			if(params[1].toLowerCase() == "on") {
				var response = "Will announce song names in chat";
				inform_np = true;
			} else if(params[1].toLowerCase() == "off") {
				var response = "Will no longer announce song names in chat";
				inform_np = false;
			} else {
				var response = "Sorry?";
			}
			
			message.reply(response);
		}
	},

	{
		command: "commands",
		description: "Displays this message, duh!",
		parameters: [],
		execute: function(message, params) {
			var response = "Available commands:";
			
			for(var i = 0; i < commands.length; i++) {
				var c = commands[i];
				response += "\n!" + c.command;
				
				for(var j = 0; j < c.parameters.length; j++) {
					response += " <" + c.parameters[j] + ">";
				}
				
				response += ": " + c.description;
			}
			
			message.reply(response);
		}
	},

	{
		command: "skip",
		description: "Skips the current song",
		parameters: [],
		execute: function(message, params) {
			if(voice_handler !== null) {
				message.reply("Skipping...");
				voice_handler.end();
			} else {
				message.reply("There is nothing being played.");
			}
		}
	},

	{
		command: "queue",
		description: "Displays the queue",
		parameters: [],
		execute: function(message, params) {
			var response = "";
	
			if(is_queue_empty()) {
				response = "the queue is empty.";
			} else {
				var long_queue = queue.length > 30;
				for(var i = 0; i < (long_queue ? 30 : queue.length); i++) {
					response += "\"" + queue[i]["title"] + "\" (requested by " + queue[i]["user"] + ")\n";
				}

				if(long_queue) response += "\n**...and " + (queue.length - 30) + " more.**";
			}
			
			message.reply(response);
		}
	},

	{
		command: "clearqueue",
		description: "Removes all songs from the queue",
		parameters: [],
		execute: function(message, params) {
			queue = [];
			message.reply("Queue has been clered!");
		}
	},

	{
		command: "remove",
		description: "Removes a song from the queue",
		parameters: ["Request index or 'last'"],
		execute: function(message, params) {
			var index = params[1];

			if(is_queue_empty()) {
				message.reply("The queue is empty");
				return;
			} else if(isNaN(index) && index !== "last") {
				message.reply("Argument '" + index + "' is not a valid index.");
				return;
			}

			if(index === "last") { index = queue.length; }
			index = parseInt(index);
			if(index < 1 || index > queue.length) {
				message.reply("Cannot remove request #" + index + " from the queue (there are only " + queue.length + " requests currently)");
				return;
			}

			var deleted = queue.splice(index - 1, 1);
			message.reply('Request "' + deleted[0].title +'" was removed from the queue.');
		}
	},
	
	{
		command: "aliases",
		description: "Displays the stored aliases",
		parameters: [],
		execute: function(message, params) {

			var response = "Current aliases:";
			
			for(var alias in aliases) {
				if(aliases.hasOwnProperty(alias)) {
					response += "\n" + alias + " -> " + aliases[alias];
				}
			}
			
			message.reply(response);
		}
	},
	
	{
		command: "setalias",
		description: "Sets an alias, overriding the previous one if it already exists",
		parameters: ["alias", "video URL or ID"],
		execute: function(message, params) {

			var alias = params[1].toLowerCase();
			var val = params[2];
			
			aliases[alias] = val;
			fs.writeFileSync(aliases_file_path, JSON.stringify(aliases));
			
			message.reply("Alias " + alias + " -> " + val + " set successfully.");
		}
	},
	
	{
		command: "deletealias",
		description: "Deletes an existing alias",
		parameters: ["alias"],
		execute: function(message, params) {

			var alias = params[1].toLowerCase();

			if(!aliases.hasOwnProperty(alias)) {
				message.reply("Alias " + alias + " does not exist");
			} else {
				delete aliases[alias];
				fs.writeFileSync(aliases_file_path, JSON.stringify(aliases));
				message.reply("Alias \"" + alias + "\" deleted successfully.");
			}
		}
	},

	{
    command: "setusername",
		description: "Set username of bot",
		parameters: ["Username or alias"],
		execute: function (message, params) {

			var userName = params[1];
			if (aliases.hasOwnProperty(userName.toLowerCase())) {
				userName = aliases[userName.toLowerCase()];
			}

			bot.user.setUsername(userName).then(user => {
				message.reply('✔ Username set!');
			})
			.catch((err) => {
				message.reply('Error: Unable to set username');
				console.log('Error on setusername command:', err);
			});
		}
	},
  
  {
    command: "setavatar",
		description: "Set bot avatar, overriding the previous one if it already exists",
		parameters: ["Image URL or alias"],
		execute: function (message, params) {

			var url = params[1];
			if (aliases.hasOwnProperty(url.toLowerCase())) {
				url = aliases[url.toLowerCase()];
			}

			bot.user.setAvatar(url).then(user => {
				message.reply('✔ Avatar set!');
			})
			.catch((err) => {
				message.reply('Error: Unable to set avatar');
				console.log('Error on setavatar command:', err); 
      });
		}
  }

];

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

bot.on("disconnect", event => {
	console.log("Disconnected: " + event.reason + " (" + event.code + ")");
});

bot.on("message", message => {
	if(message.channel.type === "dm" && message.author.id !== bot.user.id) { //Message received by DM
		//Check that the DM was not send by the bot to prevent infinite looping
		message.channel.sendMessage(dm_text);
	} else if(message.channel.type === "text" && message.channel.name === text_channel.name) { //Message received on desired text channel
		if(message.isMentioned(bot.user)) {
			message.reply(mention_text);
		} else {
			var message_text = message.content;
			if(message_text[0] == '!') { //Command issued
				handle_command(message, message_text.substring(1));
			}
		}
	}
});

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

function add_to_queue(video, message, mute = false) {

	if(aliases.hasOwnProperty(video.toLowerCase())) {
		video = aliases[video.toLowerCase()];
	}

	var video_id = get_video_id(video);

	ytdl.getInfo("https://www.youtube.com/watch?v=" + video_id, (error, info) => {
		if(error) {
			message.reply("The requested video (" + video_id + ") does not exist or cannot be played.");
			console.log("Error (" + video_id + "): " + error);
		} else {
			queue.push({title: info["title"], id: video_id, user: message.author.username});
			if (!mute) {
				message.reply('"' + info["title"] + '" has been added to the queue.');
			}
			if(!stopped && !is_bot_playing() && queue.length === 1) {
				play_next_song();
			}
		}
	});
}

function play_next_song() {
	if(is_queue_empty()) {
		text_channel.sendMessage("The queue is empty!");
	}

	var video_id = queue[0]["id"];
	var title = queue[0]["title"];
	var user = queue[0]["user"];

	now_playing_data["title"] = title;
	now_playing_data["user"] = user;

	if(inform_np) {
		text_channel.sendMessage('Now playing: "' + title + '" (requested by ' + user + ')');
		bot.user.setGame(title);
	}

	var audio_stream = ytdl("https://www.youtube.com/watch?v=" + video_id);
	voice_handler = voice_connection.playStream(audio_stream);

	voice_handler.once("end", reason => {
		voice_handler = null;
		bot.user.setGame();
		if(!stopped && !is_queue_empty()) {
			play_next_song();
		}
	});

	queue.splice(0,1);
}

function search_command(command_name) {
	for(var i = 0; i < commands.length; i++) {
		if(commands[i].command == command_name.toLowerCase()) {
			return commands[i];
		}
	}

	return false;
}

function handle_command(message, text) {
	var params = text.split(" ");
	var command = search_command(params[0]);

	if(command) {
		if(params.length - 1 < command.parameters.length) {
			message.reply("Insufficient parameters!");
		} else {
			command.execute(message, params);
		}
	}
}

function is_queue_empty() {
	return queue.length === 0;
}

function is_bot_playing() {
	return voice_handler !== null;
}

function search_video(message, query) {
	request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_api_key, (error, response, body) => {
		var json = JSON.parse(body);
		if("error" in json) {
			message.reply("An error has occurred: " + json.error.errors[0].message + " - " + json.error.errors[0].reason);
		} else if(json.items.length === 0) {
			message.reply("No videos found matching the search criteria.");
		} else {
			add_to_queue(json.items[0].id.videoId, message);
		}
	})
}

function queue_playlist(playlistId, message, pageToken = '') {
	request("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=" + playlistId + "&key=" + yt_api_key + "&pageToken=" + pageToken, (error, response, body) => {
		var json = JSON.parse(body);
		if ("error" in json) {
			message.reply("An error has occurred: " + json.error.errors[0].message + " - " + json.error.errors[0].reason);
		} else if (json.items.length === 0) {
			message.reply("No videos found within playlist.");
		} else {
			for (var i = 0; i < json.items.length; i++) {
				add_to_queue(json.items[i].snippet.resourceId.videoId, message, true)
			}
			if (json.nextPageToken == null){
				return;
			}
			queue_playlist(playlistId, message, json.nextPageToken)
		}
	});
}

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

function get_video_id(string) {
	var regex = /(?:\?v=|&v=|youtu\.be\/)(.*?)(?:\?|&|$)/;
	var matches = string.match(regex);

	if(matches) {
		return matches[1];
	} else {
		return string;
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

exports.run = function(server_name, text_channel_name, voice_channel_name, aliases_path, token) {

	aliases_file_path = aliases_path;

	bot.on("ready", () => {
		var server = bot.guilds.find("name", server_name);
		if(server === null) throw "Couldn't find server '" + server_name + "'";

		var voice_channel = server.channels.find(chn => chn.name === voice_channel_name && chn.type === "voice"); //The voice channel the bot will connect to
		if(voice_channel === null) throw "Couldn't find voice channel '" + voice_channel_name + "' in server '" + server_name + "'";
		
		text_channel = server.channels.find(chn => chn.name === text_channel_name && chn.type === "text"); //The text channel the bot will use to announce stuff
		if(text_channel === null) throw "Couldn't find text channel '#" + text_channel_name + "' in server '" + server_name + "'";

		voice_channel.join().then(connection => {voice_connection = connection;}).catch(console.error);

		fs.access(aliases_file_path, fs.F_OK, (err) => {
			if(err) {
				aliases = {};
			} else {
				try {
					aliases = JSON.parse(fs.readFileSync(aliases_file_path));
				} catch(err) {
					aliases = {};
				}
			}
		});

		bot.user.setGame();
		console.log("Connected!");
	});

	bot.login(token);
}

exports.setYoutubeKey = function(key) {
	yt_api_key = key;
}