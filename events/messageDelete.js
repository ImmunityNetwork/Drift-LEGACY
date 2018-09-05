exports.run = (bot, msg) => 
{
    if (msg.author.id == bot.user.id) return;
    let modlogs = msg.guild.channels.find('name', 'mod-logs');

    if(!modlogs) {
        try{
            modlogs = msg.guild.createChannel(
                `mod-logs`,
                `text`);
            //TODO Fix this.
            //message.reply("Please set up the permissions for #mod-logs according to your needs manually. Automatic setup of #mod-logs will come shortly. Thanks for your cooperation.");
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
    msg.guild.channels.get(modlogs.id).send({embed: embed});
}