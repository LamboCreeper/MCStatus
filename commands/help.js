const Discord = require('discord.js');
const request = require('request');
const msg = require('../messages.json');
module.exports.help = function(sender, mcstatus, data) {
	var docs = msg.documentation;
	var response = '';

	const aboutEmbded = new Discord.RichEmbed()

	.setTitle('MCStatus')
	.setColor('#66A866')
	.setDescription(msg.about.p1 + sender + msg.about.p2)

	for (cmd in docs) {
	   aboutEmbded.addField(docs[cmd].name, "**Usage:** " + docs[cmd].command + "\n**Example:** " + docs[cmd].example + "\n**Description:** " + docs[cmd].description)
	}

	aboutEmbded.addField('Donations', '[WheezyGold7931](https://twitter.com/WheezyGold7931) - £2.00')

	aboutEmbded.addField('Links', ' [GitHub](http://github.com/LamboCreeper/MCStatus) | [Invite](http://lcurl.xyz/MCStatusBot) | [Website](https://lambocreeper.uk/mcstatus) | [Donate](https://lambocreeper.uk/donate)')

	aboutEmbded.setThumbnail('https://hydra-media.cursecdn.com/minecraft.gamepedia.com/1/1e/Observer_PE.png?version=8156987803ff022df44a2a839f2fdc96')
	aboutEmbded.setFooter('Proudly developed by LamboCreeper and used by ' + data.users.size + ' users in ' + data.guilds.size + ' guilds.')
	aboutEmbded.setURL('https://lambocreeper.uk/mcstatus')

	mcstatus.sendEmbed(aboutEmbded, '', { disableEveryone: true });
}
