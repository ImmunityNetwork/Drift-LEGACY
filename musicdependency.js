const Discord = require('discord.js');
const YoutubeDL = require('youtube-dl');
const ytdl = require('ytdl-core');

/**
 * Takes a discord.js client and turns it into a music bot.
 * Thanks to 'derekmartinez18' for helping.
 * 
 * @param {Client} client - The discord.js client.
 * @param {object} options - (Optional) Options to configure the music bot. Acceptable options are:
 * 							prefix: The prefix to use for the commands (default '!').
 * 							global: Whether to use a global queue instead of a server-specific queue (default false).
 * 							maxQueueSize: The maximum queue size (default 20).
 * 							anyoneCanSkip: Allow anybody to skip the song.
 * 							clearInvoker: Clear the command message.
 * 							volume: The default volume of the player.
 */
module.exports = function (client, options) {
	// Get all options.
	let PREFIX = (options && options.prefix) || '!';
	let GLOBAL = (options && options.global) || false;
	let MAX_QUEUE_SIZE = (options && options.maxQueueSize) || 20;
	let DEFAULT_VOLUME = (options && options.volume) || 50;
	let ALLOW_ALL_SKIP = (options && options.anyoneCanSkip) || false;
    let CLEAR_INVOKER = (options && options.clearInvoker) || false;
	
	
	
	// Create an object of queues.
	let queues = {};

	// Catch message events.
	client.on('message', msg => {
		const message = msg.content.trim();

		// Check if the message is a command.
		if (message.toLowerCase().startsWith(PREFIX.toLowerCase())) {
			// Get the command and suffix.
			const command = message.substring(PREFIX.length).split(/[ \n]/)[0].toLowerCase().trim();
			const suffix = message.substring(PREFIX.length + command.length).trim();

			// Process the commands.
			switch (command) {
				case 'play':
					return play(msg, suffix);
				case 'skip':
					return skip(msg, suffix);
				case 'queue':
					return queue(msg, suffix);
				case 'pause':
					return pause(msg, suffix);
				case 'resume':
					return resume(msg, suffix);
				case 'volume':
					return volume(msg, suffix);
				case 'leave':
					return leave(msg, suffix);
				case 'clearqueue':
					return clearqueue(msg, suffix);
			}
			if (CLEAR_INVOKER) {
				msg.delete();
			}
		}
	});

	/**
	 * Checks if a user is an admin.
	 * 
	 * @param {GuildMember} member - The guild member
	 * @returns {boolean} - 
	 */
	function isAdmin(member) {
		return member.hasPermission("ADMINISTRATOR");
	}

	/**
	 * Checks if the user can skip the song.
	 * 
	 * @param {GuildMember} member - The guild member
	 * @param {array} queue - The current queue
	 * @returns {boolean} - If the user can skip
	 */
	function canSkip(member, queue) {
		if (ALLOW_ALL_SKIP) return true;
		else if (queue[0].requester === member.id) return true;
		else if (isAdmin(member)) return true;
		else return false;
	}

	/**
	 * Gets the song queue of the server.
	 * 
	 * @param {integer} server - The server id. 
	 * @returns {object} - The song queue.
	 */
	function getQueue(server) {
		// Check if global queues are enabled.
		if (GLOBAL) server = '_'; // Change to global queue.

		// Return the queue.
		if (!queues[server]) queues[server] = [];
		return queues[server];
	}

	/**
	 * The command for adding a song to the queue.
	 * 
	 * @param {Message} msg - Original message.
	 * @param {string} suffix - Command suffix.
	 * @returns {<promise>} - The response edit.
	 */
	function play(msg, suffix) {
		// Make sure the user is in a voice channel.
		let embedNotInVoice = new Discord.RichEmbed()
		.setAuthor('Drift Music -')
		.setColor(0x00AE86)
		.addField('Error -', 'You are not in a voice channel!')
		.setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
	
		if (msg.member.voiceChannel === undefined) return msg.channel.send({embed: embedNotInVoice});

		// Make sure the suffix exists.
		let embedNoVideoSelected = new Discord.RichEmbed()
		.setAuthor('Drift Music -')
		.setColor(0x00AE86)
		.addField('Error -', 'No video Selected!')
		.setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
	
		if (!suffix) return msg.channel.send({embed: embedNoVideoSelected});

		// Get the queue.
		const queue = getQueue(msg.guild.id);

		// Check if the queue has reached its maximum size.
		let embedMaxQueue = new Discord.RichEmbed()
		.setAuthor('Drift Music -')
		.setColor(0x00AE86)
		.addField('Error -', 'The queue is at a max limit!')
		.setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
	
		if (queue.length >= MAX_QUEUE_SIZE) {
			return msg.channel.send({embed: embedMaxQueue});
		}

		// Get the video information.
		let embedSearching = new Discord.RichEmbed()
		.setAuthor('Drift Music -')
		.setColor(0x00AE86)
		.addField('Searching...', 'The bot overlords are searching for your video!')
		.setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
	
		msg.channel.send({embed: embedSearching}).then(response => {
			var searchstring = suffix
			if (!suffix.toLowerCase().startsWith('http')) {
				searchstring = 'gvsearch1:' + suffix;
			}

			YoutubeDL.getInfo(searchstring, ['-q', '--no-warnings', '--force-ipv4'], (err, info) => {
				// Verify the info.
	let embedInvalidVideo = new Discord.RichEmbed()
		.setAuthor('Drift Music -')
		.setColor(0x00AE86)
		.addField('Error -', 'Invalid Video!')
		.setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
    
				if (err || info.format_id === undefined || info.format_id.startsWith('0')) {
					return response.edit({embed: embedInvalidVideo});
				}

				info.requester = msg.author.id;

				// Queue the video.
	let embedQueued = new Discord.RichEmbed()
        .setAuthor('Drift Music -')
		.setColor(0x00AE86)
        .addField('Queued: ' + info.title, 'The bot overlords have answered your call!')
        .setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
	
				response.edit({embed: embedQueued}).then(() => {
					queue.push(info);
					// Play if only one element in the queue.
					if (queue.length === 1) executeQueue(msg, queue);
				}).catch(console.log);
			});
		}).catch(console.log);
	}


	/**
	 * The command for skipping a song.
	 * 
	 * @param {Message} msg - Original message.
	 * @param {string} suffix - Command suffix.
	 * @returns {<promise>} - The response message.
	 */
	function skip(msg, suffix) {
		// Get the voice connection.
	let embedNoMusicPlaying1 = new Discord.RichEmbed()
		.setAuthor('Drift Music -')
		.setColor(0x00AE86)
		.addField('Error -', 'Their is no music playing!')
		.setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
	
		const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
		if (voiceConnection === null) return msg.channel.send({embed: embedNoMusicPlaying1});

		// Get the queue.
		const queue = getQueue(msg.guild.id);
		let embedCantSkipBecauseDidntQueue = new Discord.RichEmbed()
		.setAuthor('Drift Music -')
		.setColor(0x00AE86)
		.addField('Error -', 'You can not skip this song because you did not queue it!')
		.setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
	
		if (!canSkip(msg.member, queue)) return msg.channel.send({embed: embedCantSkipBecauseDidntQueue}).then((response) => {
			response.delete(5000);
		});

		// Get the number to skip.
		let toSkip = 1; // Default 1.
		if (!isNaN(suffix) && parseInt(suffix) > 0) {
			toSkip = parseInt(suffix);
		}
		toSkip = Math.min(toSkip, queue.length);

		// Skip.
		queue.splice(0, toSkip - 1);

		// Resume and stop playing.
		const dispatcher = voiceConnection.player.dispatcher;
		if (voiceConnection.paused) dispatcher.resume();
		dispatcher.end();
		let embedSkipped = new Discord.RichEmbed()
		.setAuthor('Drift Music -')
		.setColor(0x00AE86)
		.addField('Skipped' + toSkip + '!', 'Get skipped! Who plays hopscotch anymore?')
		.setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
	
		msg.channel.send({embed: embedSkipped});
	}

	/**
	 * The command for listing the queue.
	 * 
	 * @param {Message} msg - Original message.
	 * @param {string} suffix - Command suffix.
	 */
	function queue(msg, suffix) {
		// Get the queue.
		const queue = getQueue(msg.guild.id);

		// Get the queue text.
		const text = queue.map((video, index) => (
			(index + 1) + ': ' + video.title
		)).join('\n');

		// Get the status of the queue.
		let queueStatus = 'Stopped';
		const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
		if (voiceConnection !== null) {
			const dispatcher = voiceConnection.player.dispatcher;
			queueStatus = dispatcher.paused ? 'Paused' : 'Playing';
		}

		// Send the queue and status.
		let embedQueueStatus = new Discord.RichEmbed()
		.setAuthor('Drift Music -')
		.setColor(0x00AE86)
		.addField('Queue (' + queueStatus + '):\n' + text, 'The bot hamsters are trying to find the phone!')
		.setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
	
		msg.channel.send({embed: embedQueueStatus});
	}

	/**
	 * The command for pausing the current song.
	 * 
	 * @param {Message} msg - Original message.
	 * @param {string} suffix - Command suffix.
	 * @returns {<promise>} - The response message.
	 */
	function pause(msg, suffix) {
		// Get the voice connection.
	let embedNoMusicPlaying2 = new Discord.RichEmbed()
		.setAuthor('Drift Music -')
		.setColor(0x00AE86)
		.addField('Error -', 'Their is no music playing!')
		.setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
	
		const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
		if (voiceConnection === null) return msg.channel.send({embed: embedNoMusicPlaying2});
		let embedNotAuthorized1 = new Discord.RichEmbed()
		.setAuthor('Drift Music -')
		.setColor(0x00AE86)
		.addField('Error -', 'You are not authorized to do this!')
		.setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
		
		if (!isAdmin(msg.member))
			return msg.channel.send({embed: embedNotAuthorized1});

		// Pause.
		let embedPaused = new Discord.RichEmbed()
		.setAuthor('Drift Music -')
		.setColor(0x00AE86)
		.addField('Playback -', 'Playback Paused')
		.setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
	
		msg.channel.send({embed: embedPaused});
		const dispatcher = voiceConnection.player.dispatcher;
		if (!dispatcher.paused) dispatcher.pause();
	}

	/**
	 * The command for leaving the channel and clearing the queue.
	 * 
	 * @param {Message} msg - Original message.
	 * @param {string} suffix - Command suffix.
	 * @returns {<promise>} - The response message.
	 */
	function leave(msg, suffix) {
	
		if (isAdmin(msg.member)) {
			const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
	let embedNotInChannel = new Discord.RichEmbed()
		.setAuthor('Drift Music -')
		.setColor(0x00AE86)
		.addField('Error -', 'I am not in any channel!')
		.setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
	
			if (voiceConnection === null) return msg.channel.send({embed: embedNotInChannel});
			// Clear the queue.
			const queue = getQueue(msg.guild.id);
			queue.splice(0, queue.length);

			// End the stream and disconnect.
			voiceConnection.player.dispatcher.end();
			voiceConnection.disconnect();
		} else {
			let embedNotAuthorized2 = new Discord.RichEmbed()
			.setAuthor('Drift Music -')
			.setColor(0x00AE86)
			.addField('Error -', 'You are not authorized to do this!')
			.setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
			
			msg.channel.send({embed: embedNotAuthorized2});
		}
	}

	/**
	 * The command for clearing the song queue.
	 * 
	 * @param {Message} msg - Original message.
	 * @param {string} suffix - Command suffix.
	 */
	function clearqueue(msg, suffix) {
	
		if (isAdmin(msg.member)) {
			const queue = getQueue(msg.guild.id);

			queue.splice(0, queue.length);
	let embedQueueCleared = new Discord.RichEmbed()
		.setAuthor('Drift Music -')
		.setColor(0x00AE86)
		.addField('Queue Cleared!', 'The bot overlords have wiped out the bots memory!')
		.setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
	
			msg.channel.send({embed: embedQueueCleared});
		} else {
			let embedNotAuthorized3 = new Discord.RichEmbed()
			.setAuthor('Drift Music -')
			.setColor(0x00AE86)
			.addField('Error -', 'You are not authorized to do this!')
			.setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
			
			msg.channel.send({embed: embedNotAuthorized3});
		}
	}

	/**
	 * The command for resuming the current song.
	 * 
	 * @param {Message} msg - Original message.
	 * @param {string} suffix - Command suffix.
	 * @returns {<promise>} - The response message.
	 */
	function resume(msg, suffix) {
		// Get the voice connection.
	let embedNoMusicPlaying3 = new Discord.RichEmbed()
		.setAuthor('Drift Music -')
		.setColor(0x00AE86)
		.addField('Error -', 'Their is no music playing!')
		.setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
	
		const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
		if (voiceConnection === null) return msg.channel.send({embed: embedNoMusicPlaying3});
		let embedNotAuthorized4 = new Discord.RichEmbed()
		.setAuthor('Drift Music -')
		.setColor(0x00AE86)
		.addField('Error -', 'You are not authorized to do this!')
		.setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
		
		if (!isAdmin(msg.member))
			return msg.channel.send({embed: embedNotAuthorized4});

		// Resume.
		let embedResume = new Discord.RichEmbed()
		.setAuthor('Drift Music -')
		.setColor(0x00AE86)
		.addField('Playback -', 'Playback Resumed!')
		.setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
	
		msg.channel.send({embed: embedResume});
		const dispatcher = voiceConnection.player.dispatcher;
		if (dispatcher.paused) dispatcher.resume();
	}

	/**
	 * The command for changing the song volume.
	 * 
	 * @param {Message} msg - Original message.
	 * @param {string} suffix - Command suffix.
	 * @returns {<promise>} - The response message.
	 */
	function volume(msg, suffix) {
		// Get the voice connection.
	let embedNoMusicPlaying4 = new Discord.RichEmbed()
		.setAuthor('Drift Music -')
		.setColor(0x00AE86)
		.addField('Error -', 'Their is no music playing!')
		.setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
	
		const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
		if (voiceConnection === null) return msg.channel.send({embed: embedNoMusicPlaying4});
		let embedNotAuthorized5 = new Discord.RichEmbed()
		.setAuthor('Drift Music -')
		.setColor(0x00AE86)
		.addField('Error -', 'You are not authorized to do this!')
		.setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
	
		if (!isAdmin(msg.member))
			return msg.channel.send({embed: embedNotAuthorized5});

		// Get the dispatcher
		const dispatcher = voiceConnection.player.dispatcher;
		let embedVolumeRange = new Discord.RichEmbed()
		.setAuthor('Drift Music -')
		.setColor(0x00AE86)
		.addField('Error -', 'Volume out of range!')
		.setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
	
		if (suffix > 200 || suffix < 0) return msg.channel.send({embed: embedVolumeRange}).then((response) => {
			response.delete(5000);
		});
		let embedVolume = new Discord.RichEmbed()
		.setAuthor('Drift Music -')
		.setColor(0x00AE86)
		.addField('Volume set to ' + suffix, 'The bot hampsters are setting your audio capacity!')
		.setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
	
		msg.channel.send({embed: embedVolume});
		dispatcher.setVolume((suffix/100));
	}

	/**
	 * Executes the next song in the queue.
	 * 
	 * @param {Message} msg - Original message.
	 * @param {object} queue - The song queue for this server.
	 * @returns {<promise>} - The voice channel.
	 */
	function executeQueue(msg, queue) {
		// If the queue is empty, finish.
		if (queue.length === 0) {
	let embedFinished = new Discord.RichEmbed()
		.setAuthor('Drift Music -')
		.setColor(0x00AE86)
		.addField('Playback -', 'Playback Finished!')
		.setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
	
			msg.channel.send({embed: embedFinished});

			// Leave the voice channel.
			const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
			if (voiceConnection !== null) return voiceConnection.disconnect();
		}

		new Promise((resolve, reject) => {
			// Join the voice channel if not already in one.
			const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
			if (voiceConnection === null) {
				// Check if the user is in a voice channel.
				if (msg.member.voiceChannel) {
					msg.member.voiceChannel.join().then(connection => {
						resolve(connection);
					}).catch((error) => {
						console.log(error);
					});
				} else {
					// Otherwise, clear the queue and do nothing.
					queue.splice(0, queue.length);
					reject();
				}
			} else {
				resolve(voiceConnection);
			}
		}).then(connection => {
			// Get the first item in the queue.
			const video = queue[0];

			console.log(video.webpage_url); 

			// Play the video.
	let embedNowPlaying = new Discord.RichEmbed()
	 	.setAuthor('Drift Music -')
		.setColor(0x00AE86)
		.addField('Now Playing: ' + video.title, 'The bot hampsters are turning your CD!')
		.setFooter("Drift is protected under GPL-3.0.", "https://cdn.discordapp.com/attachments/390285194617421835/394940813865385995/FFADA4B0-4EF6-4441-BAE8-C525975E7418.png");
	
			msg.channel.send({embed: embedNowPlaying}).then(() => {
				let dispatcher = connection.playStream(ytdl(video.webpage_url, {filter: 'audioonly'}), {seek: 0, volume: (DEFAULT_VOLUME/100)});

				connection.on('error', (error) => {
					// Skip to the next song.
					console.log(error);
					queue.shift();
					executeQueue(msg, queue);
				});

				dispatcher.on('error', (error) => {
					// Skip to the next song.
					console.log(error);
					queue.shift();
					executeQueue(msg, queue);
				});

				dispatcher.on('end', () => {
					// Wait a second.
					setTimeout(() => {
						if (queue.length > 0) {
							// Remove the song from the queue.
							queue.shift();
							// Play the next song in the queue.
							executeQueue(msg, queue);
						}
					}, 1000);
				});
			}).catch((error) => {
				console.log(error);
			});
		}).catch((error) => {
			console.log(error);
		});
	}
}

/**
 * Wrap text in a code block and escape grave characters.
 * 
 * @param {string} text - The input text.
 * @returns {string} - The wrapped text.
 */
function wrap(text) {
	return '```\n' + text.replace(/`/g, '`' + String.fromCharCode(8203)) + '\n```';
}