exports.run = (bot, guild) =>
{

  let jlLogs = bot.channels.get("486364248499552267");
  jlLogs.send(`**Joined a new guild! Here is some info**: \n **Guild Name and ID**: ${guild.name} (\`${guild.id}\`) \n **__Owner:__** ${guild.owner.user.tag} (${guild.owner.user.id})
   **__Size:__** ${guild.memberCount}`);

}
