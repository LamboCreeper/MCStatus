const Discord = require('discord.js');
const request = require('request');
module.exports.server = function (server, mcstatus) {
	if (typeof server != 'undefined') {

		var url = "https://mcapi.us/server/status?ip=" + server
		request({
			url: url,
			json: true
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				if (body.motd == '') {
					const serverEmbded = new Discord.RichEmbed()

					.setColor('#66A866')
					serverEmbded.setTitle(server)
					serverEmbded.addField('Online', body.online)
					serverEmbded.addField('Players Online', "0/?")
					serverEmbded.addField('Game Version', "?")

					serverEmbded.setFooter('MCStatus by LamboCreeper')
					serverEmbded.setThumbnail('https://mcapi.ca/query/' + server + '/icon')
					serverEmbded.setURL('https://lambocreeper.uk/mcstatus')

					message.channel.sendEmbed(serverEmbded, '', { disableEveryone: true });
				} else {
					const serverEmbded = new Discord.RichEmbed()

					.setColor('#66A866')
					var motd = body.motd;
					var formattingCodes = ['§1', '§2', '§3', '§4', '§5', '§6', '§7', '§8', '§9', '§0', '§a', '§b', '§c', '§d', '§e', '§f', '§r', '§l', '§o', '§n', '§m', '§k']
					for (code in formattingCodes) {
						motd = motd.replace(new RegExp(formattingCodes[code], "g"), '');
					}
					serverEmbded.setTitle(motd)
					serverEmbded.addField('Online', body.online)
					serverEmbded.addField('Players Online', body.players.now + "/" + body.players.max)
					serverEmbded.addField('Game Version', body.server.name)

					serverEmbded.setFooter('MCStatus by LamboCreeper')
					serverEmbded.setThumbnail('https://mcapi.ca/query/' + server + '/icon')
					serverEmbded.setURL('https://lambocreeper.uk/mcstatus/')

					mcstatus.sendEmbed(serverEmbded, '', { disableEveryone: true });
				}
			} else {
				mcstatus.sendMessage('Could not connect to Mojang\'s API.');
			}
		});

	} else {
		mcstatus.sendMessage(msg.server.not_defined);
		mcstatus.sendMessage(msg.server.usage);
	}
}
