# Discord.js Music Plugin

![alt text](https://nodei.co/npm/discord.js-music-v11.png?downloads=true&stars=true "discord.js-music-v11 stats")

This version is not yet stable, although has been mildly tested, it has not been that extensive.   
It's an update of the original by [ruiqimao](https://github.com/ruiqimao/discord.js-music) for [Discord.js](https://discord.js.org/)'s version v11.x, and adds a few extra sprinkles. It still requires tweaks and testing but yeah it's something.

__The commands available are:__  
* `play (<url>|<search string>)`: Play a video/music. It can take a URL from various services (YouTube, Vimeo, YouKu, etc). You can also search using a string.
* `skip [number]`: Skip some number of songs. Will skip 1 song if a number is not specified.
* `queue`: Display the current queue.
* `pause`: Pause music playback. (requires music manager)
* `resume`: Resume music playback. (requires music manager)
* `volume`: Adjust the playback volume between 1 and 200 (requires music manager)
* `leave`: Clears the song queue and leaves the channel.
* `clearqueue`: Clears the song queue.

__Permissions:__  
* If `anyoneCanSkip` is false then only admins and the user that requested the song can skip it.
* Only admins can change volume or resume/pause music.

__Things added:__  
* Search is working again.
* Added the command 'volume'
* Added the command 'leave'
* Added the command 'clearqueue'

__Things changed:__  
* Permissions

__Pre-installation:__  
1. `npm install discord.js` // The core discord.js framework.  
2. `npm install ffmpeg-binaries` // Gives your ability the bot to hear (required to join vc)  
3. `npm install node-opus` or `npm install opusscript` // Required to stream audio, node-opus recommended

__Installation:__  
1. `npm install discord.js-music-v11`

__Common installation issues:__  
__Issue:__ FFMPEG was not found on your system, so audio cannot be played. Please make sure FFMPEG is installed and in your PATH.  
__Fix:__ `npm install ffmpeg-binaries`  
__Issue:__ Couldn't find an Opus engine.  
__Fix:__ `npm install node-opus` or `npm install opusscript`  
__Issue:__ Any node-gyp errors. (build fail, missing cl.exe, etc.)  
__Fix:__ This one is a little more complicated.  
1. Download and install [Visual Studio 2015](https://www.visualstudio.com/downloads/)  
2. New project -> Visual C++  
3. Install Visual C++  

If that doesn't fix your issue;  
1. Download and install the [Windows 8.1 SDK](https://developer.microsoft.com/en-us/windows/downloads/windows-8-1-sdk)

This is a music plugin for Discord.js. Using it is as easy as:  
```javascript
const Discord = require('discord.js');
const music = require('discord.js-music-v11');
const Bot = new Discord.Client();
const token = "<auth_token>" // Recommended to load from json file.

Bot.on('ready', () => {
    console.log(`[Start] ${new Date()}`);
});

music(Bot);
Bot.login(token);
```

The module consists of a single function, which takes two arguments:  
```javascript
/*
 * @param {Client} client - The discord.js client.
 * @param {object} options - (Optional) Options to configure the music bot. Acceptable options are:
 * 		prefix: The prefix to use for the commands (default '!').
 * 		global: Whether to use a global queue instead of a server-specific queue (default false).
 * 		maxQueueSize: The maximum queue size (default 20).
 * 		anyoneCanSkip: Allow anybody to skip the song.
 * 		clearInvoker: Clear the command message.
 * 		volume: The default volume of the player.
 */
music(client, options);
```
