exports.run = (bot, guild) =>
{

  let jlLogs = bot.channels.get("486364248499552267");
  jlLogs.send(`**Left a guild! Here is some info**: \n **Guild Name and ID**: ${guild.name} (\`${guild.id}\`) \n **__Owner:__** ${guild.owner.user.tag} (${guild.owner.user.id})
   **__Size:__** ${guild.memberCount}`);

  guild.owner.send("Sorry we didn't get to meet your expectations! But thank you for having us along, and a thank you from Drift Developement! We hope if you could provide some feedback on what we can do to improve or something we have done wrong. Join our server at https://discord.gg/dErs78w")

};
