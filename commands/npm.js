const {RichEmbed} = require('discord.js')
const packageJson = require('package-json');
const npmRequestJson = require('npm-request-json');
const fs = require('fs');
const getPackageInfo = require('sb-package-info');
const sortPackageJson = require("sort-package-json");
module.exports.run = async (bot, message, args) => {
    let embed3 = new RichEmbed()
    .setTitle("Incorrect Usage")
    .setAuthor("NPM Command")
    .setColor("#BA1B1D")
    .addField("Correct Usage", "```dr!npm <package name>```")
    .setDescription("If a word is in asterisks/stars, it means it is OPTIONAL.");
if(args < 1) return message.channel.send(embed3).then(message => message.delete(10000));
const query = args.join(' ');
const packInfo = await packageJson(query.toLowerCase());
const descInfo = await npmRequestJson({ name: packInfo.name, version: 'latest' });
 
// getPackageInfo(descInfo.name).then(function(contents) {
//     let data = JSON.stringify(contents.dependencies, null, 2);
//     fs.writeFile("./commands/test.json", data, (err) => {
//     if(err) throw err;
//     message.channel.send(data);
// })
// })
console.log(descInfo)
try {
getPackageInfo(descInfo.name).then(function(contents) {
let data = JSON.stringify(contents.dependencies, null, 2);
const embed = new RichEmbed()
.setColor(0xCB3837)
.setAuthor('Drift Miscellaneous -', message.author.avatarURL)
.setTitle(`${descInfo.name} - npmjs Package Information`)
.setThumbnail('https://i.imgur.com/8DKwbhj.png')
.addField(`Description`, `${descInfo.description || 'No description.'}`)
.addField('Version', `${descInfo.version}`, true)
.addField('License', `${descInfo.license || 'None'}`, true)
.addField('Author', `${descInfo.author.name} || ${descInfo._npmUser.name}`, true)
.addField('Installation', `\`npm i ${descInfo.name}\``, true)
.addField("Dependancies", `${Object.keys(contents.dependencies).join(" | ") || "None"}`, true)
.addField('NPMjs Package', `https://www.npmjs.com/package/${query.toLowerCase()}`)

message.channel.send({embed});
})
} catch (error) {
if(error) return message.channel.send('**Could not find any results.**');
console.log(error);
}
}
module.exports.help = {
name: "npm"
}
