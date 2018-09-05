exports.run = (bot, guild) => 
{

    let jlLogs = bot.channels.get('473337788402761750');
    jlLogs.send(`**Joined a new guild! Here is some info**: \n **Guild Name and ID**: ${guild.name} (\`${guild.id}\`) \n **__Owner:__** ${guild.owner.user.tag} (${guild.owner.user.id})
   **__Size:__** ${guild.memberCount}`);
    console.log(`I have joined ${guild.name}.`);

}