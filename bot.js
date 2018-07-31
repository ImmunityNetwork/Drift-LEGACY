const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = botSettings.prefix;
const Idiot = require("idiotic-api");
const bot = new Discord.Client();
bot.API = new Idiot.Client("your-token-here", { dev: true });
bot.commands = new Discord.Collection();

fs.readdir("./Commands/", (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
        console.log('')
        console.log("No commands to be loaded!")
        return;
    }

    console.log(``)
    console.log(`Loading ${jsfiles.length} commands!`)

    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });

});

// Bot Events

bot.on("message", async message => {
   if(message.content === botSettings.token){
            message.delete(0);
        }
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    let args = messageArray.slice(1);

    console.log(message.channel.id);
    if (message.channel.id === "450830883440558091") {
      console.log("New suggestion in " + message.channel.name);
      message.react("👍").then(message.react("👎"));
    }

    if(!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length))
    if(cmd) cmd.run(bot, message, args);



})


bot.on('guildDelete', guild => {
  let jlLogs = bot.channels.get('473337788402761750');
  jlLogs.send(`**Left a guild! Here is some info**: \n **Guild Name and ID**: ${guild.name} (\`${guild.id}\`) \n **__Owner:__** ${guild.owner.user.tag} (${guild.owner.user.id})
 **__Size:__** ${guild.memberCount}`);
  console.log(`I have left ${guild.name}.`);
})

bot.on ('guildCreate', guild => {
  let jlLogs = bot.channels.get('473337788402761750');
  jlLogs.send(`**Joined a new guild! Here is some info**: \n **Guild Name and ID**: ${guild.name} (\`${guild.id}\`) \n **__Owner:__** ${guild.owner.user.tag} (${guild.owner.user.id})
 **__Size:__** ${guild.memberCount}`);
  console.log(`I have joined ${guild.name}.`);
})

bot.on('messageDelete', msg => {
    let modlogs = msg.guild.channels.find('name', 'mod-logs');

    if(!modlogs) {
        try{
            modlogs = message.guild.createChannel(
                `mod-logs`,
                `text`);
            message.reply("Please set up the permissions for #mod-logs according to your needs manually. Automatic setup of #mod-logs will come shortly. Thanks for your cooperation.");
        }catch(e){
            console.log(e.stack);
        }
    }
    const embed = new Discord.RichEmbed()
        .setTitle('')
        .setAuthor('Drift Moderation - ')
        .setColor(0x00AE86)
        .addField('Action - ', 'Message Deletion')
        .addField('User - ', msg.author.tag)
        //.addField('Message - ', msg.cleanContent)
    bot.channels.get(modlogs.id).sendEmbed(embed);
});

bot.on("ready", async () => {
    console.log(``)
    console.log(`${bot.user.username} is at your service.`)
    console.log(``)
    console.log("Ready to begin! Serving in " + bot.guilds.size + " guilds.")
    console.log(``)
    console.log(bot.commands)
    bot.user.setPresence({ status: 'online', game: { name: 'in ' + bot.guilds.size + ' servers.' } })

});

bot.login(botSettings.token);
