const Discord = require('discord.js');
const request = require('request');
module.exports.compare = function (server1, server2, mcstatus) {
	const compareEmbed = new Discord.RichEmbed().setColor('#66A866').setTitle('Compare');
	var url = "https://mcapi.us/server/status?ip=" + server1;
	request({
		url: url,
		json: true
	}, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			if (body.motd != '') {
				compareEmbed.addField('MOTD of ' + server1, body.motd);
				compareEmbed.addField('Player Count of ' + server1, body.players.now + '/' + body.players.max, true)
			}
		}
		var url = "https://mcapi.us/server/status?ip=" + server2;
		request({
			url: url,
			json: true
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				if (body.motd != '') {
					compareEmbed.addField('MOTD of ' + server2, body.motd, false);
					compareEmbed.addField('Player Count of ' + server1, body.players.now + '/' + body.players.max, true)
				}
			}
			compareEmbed.setThumbnail('https://hydra-media.cursecdn.com/minecraft.gamepedia.com/1/1e/Observer_PE.png?version=8156987803ff022df44a2a839f2fdc96')
			compareEmbed.setFooter('MCStatus by LamboCreeper')
			compareEmbed.setURL('https://lambocreeper.uk/mcstatus')
			mcstatus.sendEmbed(compareEmbed, '', {disableEveryone: true});
		});
	});
}
