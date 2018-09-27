const {RichEmbed} = require('discord.js')
const packageJson = require('package-json');
const npmRequestJson = require('npm-request-json');
const fs = require('fs');
const getPackageInfo = require('sb-package-info');
const sortPackageJson = require("sort-package-json");
module.exports.run = async (bot, message, args) => {
if (args.length === 0) return message.reply('You must supply a search term.');
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
