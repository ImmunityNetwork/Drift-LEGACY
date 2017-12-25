const botSettings = require("./botsettings.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log("Drift is at your service. ${bot.user.username}")

});

bot.login(botSettings.token);