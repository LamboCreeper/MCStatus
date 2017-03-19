const Discord = require('discord.js');
const client = new Discord.Client();

var request = require("request");
const msg = require('./messages.json');
const auth = require('./auth.json');

var prefix = '[MCStatus] ';

client.on('ready', () => {
	console.log(prefix + "Starting Up...");

	client.user.setGame('http://lcurl.xyz/')

	console.log(prefix + "Ready to go!");
});

client.on('message', message => {

	// Make the input in capitals so for CaSeSENsiTivIty reasons.
	msgSent = message.content.toUpperCase();

	// About command - @MCStatus
	if (msgSent == '<@291623138457026560>') {

	}

	// Server status command - @MCStatus server
	if (message.content.startsWith('<@291623138457026560>')) {

		// Creating arguments and making them not CaSeSENsiTivItE.
		var args = message.content.split(" ").slice(1);

		if (typeof args[0] != 'undefined') {
			arg0 = args[0].toUpperCase();

			if (arg0 == 'SERVER') {
				if (typeof args[1] != 'undefined') {

					var url = "https://mcapi.us/server/status?ip=" + args[1]
					request({
					    url: url,
					    json: true
					}, function (error, response, body) {
					    if (!error && response.statusCode === 200) {
							const serverEmbded = new Discord.RichEmbed()

							.setColor('#66A866')
							var motd = body.motd;
							var formattingCodes = ['§1', '§2', '§3', '§4', '§5', '§6', '§7', '§8', '§9', '§0', '§a', '§b', '§c', '§d', '§e', '§f', '§r', '§l', '§o', '§n', '§m', '§k']
							for (code in formattingCodes) {
								motd = motd.replace(formattingCodes[code], '');
							}
							serverEmbded.setTitle(motd)
							serverEmbded.addField('Online', body.online)
							serverEmbded.addField('Players Online', body.players.now + "/" + body.players.max)
							serverEmbded.addField('Game Version', body.server.name)

							serverEmbded.setFooter('MCStatus by LamboCreeper')
							serverEmbded.setThumbnail('https://mcapi.ca/query/' + args[1] + '/icon')
							serverEmbded.setURL('http://lambocreeper.uk/mcstatus')

							message.channel.sendEmbed(serverEmbded, '', { disableEveryone: true });
					    }
					});

				} else {
					message.channel.sendMessage(msg.server.not_defined);
					message.channel.sendMessage(msg.server.usage);
				}
			} else if (arg0 == 'OFFICIAL') {
				var url = "https://mcapi.ca/mcstatus"
				request({
					url: url,
					json: true
				}, function (error, response, body) {
					if (!error && response.statusCode === 200) {
						const officialEmbded = new Discord.RichEmbed()

						.setColor('#66A866')
						.setTitle('Official Minecraft Services Status')

						.addField('Minecraft.net', body['minecraft.net'].status)
						.addField('Minecraft Session', body['session.minecraft.net'].status)
						.addField('Minecraft Skins', body['skins.minecraft.net'].status)
						.addField('Minecraft Textures', body['textures.minecraft.net'.status])
						.addField('Mojang.com', body['mojang.com'].status)
						.addField('Mojang Authentication', body['auth.mojang.com'].status)
						.addField('Mojang Session Servers', body['sessionserver.mojang.com'].status)
						.addField('Mojang Acccounts', body['account.mojang.com'].status)
						.addField('Mojang API', body['api.mojang.com'].status)

						.setFooter('MCStatus by LamboCreeper')
						.setThumbnail('http://vgboxart.com/resources/logo/3993_mojang-prev.png')
						.setURL('http://lambocreeper.uk/mcstatus')

						message.channel.sendEmbed(officialEmbded, '', { disableEveryone: true });
					}
				});
			}
		} else {
			var docs = msg.documentation;
			var response = '';

			const aboutEmbded = new Discord.RichEmbed()

			.setTitle('MCStatus')
			.setColor('#66A866')
			.setDescription(msg.about.p1 + message.author + msg.about.p2)

			for (cmd in docs) {
			   aboutEmbded.addField(docs[cmd].name, "**Usage:** " + docs[cmd].command + "\n**Example:** " + docs[cmd].example + "\n**Description:** " + docs[cmd].description)
		   	}

			aboutEmbded.setFooter('v1.0.0b')
			aboutEmbded.setThumbnail('https://pbs.twimg.com/profile_images/815197590237151232/t75x3eEB_bigger.jpg')
			aboutEmbded.setURL('http://lambocreeper.uk/mcstatus')

			message.channel.sendEmbed(aboutEmbded, '', { disableEveryone: true });
		}
	}
});

client.login(auth.token);
