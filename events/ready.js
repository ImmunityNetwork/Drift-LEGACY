exports.run = (bot,message) =>
{
  console.log(`\n\n${bot.user.username} is at your service.`);
  console.log("\n\nReady to begin! Serving in " + bot.guilds.size + " guilds.\n\n");
  bot.user.setPresence({ status: "online", game: { name: "in " + bot.guilds.size + " servers." } });
        setInterval(() => {
                if(bot.users.get("403335081609134092").presence.status=="offline") {
                        bot.channels.get("489136409383534605").fetchMessage("489564059000373278").then(message => message.edit(":octagonal_sign: Bot Offline We are aware the bot is down and we're currently looking into it. We will have a status update when the bot is back online and fixed! :tools:"))
                } else {
                        bot.channels.get("489136409383534605").fetchMessage("489564059000373278").then(message => message.edit(":white_check_mark: Bot Online The bot is back up and functional, all issues should be resolved if you find anything wrong please report it in #bug-reports. Thank you!"))
                }
        },30000); 
};
