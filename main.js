const Discord = require('discord.js');
const client = new Discord.Client({ fetchAllMembers: true });

var request = require("request");

const msg = require('./messages.json');
const auth = require('./auth.json');

var firebase = require("firebase");
var app = firebase.initializeApp({
	apiKey: auth.firebase.apiKey,
	authDomain: auth.firebase.authDomain,
	databaseURL: auth.firebase.databaseURL,
	projectId: auth.firebase.projectId,
	storageBucket: auth.firebase.storageBucket,
	messagingSenderId: auth.firebase.messagingSenderId
});
var database = firebase.database();

var prefix = '[MCStatus] ';

function convertMillisecondsToDigitalClock(ms) {
    hours = Math.floor(ms / 3600000), // 1 Hour = 36000 Milliseconds
    minutes = Math.floor((ms % 3600000) / 60000), // 1 Minutes = 60000 Milliseconds
    seconds = Math.floor(((ms % 360000) % 60000) / 1000) // 1 Second = 1000 Milliseconds
        return {
        hours : hours,
        minutes : minutes,
        seconds : seconds,
        clock : hours + ":" + minutes + ":" + seconds
    };
}

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
							if (body.motd == '') {
								const serverEmbded = new Discord.RichEmbed()

								.setColor('#66A866')
								serverEmbded.setTitle(args[1])
								serverEmbded.addField('Online', body.online)
								serverEmbded.addField('Players Online', "0/?")
								serverEmbded.addField('Game Version', "?")

								serverEmbded.setFooter('MCStatus by LamboCreeper')
								serverEmbded.setThumbnail('https://mcapi.ca/query/' + args[1] + '/icon')
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
								serverEmbded.setThumbnail('https://mcapi.ca/query/' + args[1] + '/icon')
								serverEmbded.setURL('https://lambocreeper.uk/mcstatus/')

								message.channel.sendEmbed(serverEmbded, '', { disableEveryone: true });
							}
						} else {
							message.channel.sendMessage('Could not connect to Mojang\'s API.');
						}
					});

				} else {
					message.channel.sendMessage(msg.server.not_defined);
					message.channel.sendMessage(msg.server.usage);
				}
			} else if (arg0 == 'OFFICIAL') {
				var url = "https://mcapi.ca/mcstatus";
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
						.addField('Minecraft Textures', body['textures.minecraft.net'].status)
						.addField('Mojang.com', body['mojang.com'].status)
						.addField('Mojang Authentication', body['auth.mojang.com'].status)
						.addField('Mojang Session Servers', body['sessionserver.mojang.com'].status)
						.addField('Mojang Acccounts', body['account.mojang.com'].status)
						.addField('Mojang API', body['api.mojang.com'].status)

						.setFooter('MCStatus by LamboCreeper')
						.setThumbnail('http://vgboxart.com/resources/logo/3993_mojang-prev.png')
						.setURL('https://lambocreeper.uk/mcstatus')

						message.channel.sendEmbed(officialEmbded, '', { disableEveryone: true });
					} else {
						message.channel.sendMessage('Could not connect to Mojang\'s API.');
					}
				});
			} else if (arg0 == '-G') {
				message.channel.sendMessage(client.guilds.size + ' ' + client.users.size);
			} else if (arg0 == '-P') {
				message.channel.sendMessage(client.ping);
			} else if (arg0 == '-U') {
				message.channel.sendMessage(convertMillisecondsToDigitalClock(client.uptime).clock);
			} else if (arg0 == 'HELP') {
				var docs = msg.documentation;
				var response = '';

				const aboutEmbded = new Discord.RichEmbed()

				.setTitle('MCStatus')
				.setColor('#66A866')
				.setDescription(msg.about.p1 + message.author + msg.about.p2)

				for (cmd in docs) {
				   aboutEmbded.addField(docs[cmd].name, "**Usage:** " + docs[cmd].command + "\n**Example:** " + docs[cmd].example + "\n**Description:** " + docs[cmd].description)
			   	}

				aboutEmbded.addField('Links', ' [GitHub](http://github.com/LamboCreeper/MCStatus) | [Invite](http://lcurl.xyz/MCStatusBot) | [Website](https://lambocreeper.uk/mcstatus) | [Donate](https://lambocreeper.uk/donate)')

				aboutEmbded.setThumbnail('https://hydra-media.cursecdn.com/minecraft.gamepedia.com/1/1e/Observer_PE.png?version=8156987803ff022df44a2a839f2fdc96')
				aboutEmbded.setFooter('Proudly developed by LamboCreeper and used by ' + client.users.size + ' users in ' + client.guilds.size + ' guilds.')
				aboutEmbded.setURL('https://lambocreeper.uk/mcstatus')

				message.channel.sendEmbed(aboutEmbded, '', { disableEveryone: true });
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

			aboutEmbded.addField('Links', ' [GitHub](http://github.com/LamboCreeper/MCStatus) | [Invite](http://lcurl.xyz/MCStatusBot) | [Website](https://lambocreeper.uk/mcstatus) | [Donate](https://lambocreeper.uk/donate)')

			aboutEmbded.setThumbnail('https://hydra-media.cursecdn.com/minecraft.gamepedia.com/1/1e/Observer_PE.png?version=8156987803ff022df44a2a839f2fdc96')
			aboutEmbded.setFooter('Proudly developed by LamboCreeper and used by ' + client.users.size + ' users in ' + client.guilds.size + ' guilds.')
			aboutEmbded.setURL('https://lambocreeper.uk/mcstatus')

			message.channel.sendEmbed(aboutEmbded, '', { disableEveryone: true });
		}
	}
});

client.on('guildMemberAdd', member => {
	firebase.database().ref().child('users').set(client.users.size);
});

client.on('guildMemberRemove', member => {
	firebase.database().ref().child('users').set(client.users.size);
});

client.on('guildCreate', guild => {
	firebase.database().ref().child('guilds').set(client.guilds.size);
	firebase.database().ref().child('users').set(client.users.size);
});

client.on('guildDelete', guild => {
	firebase.database().ref().child('guilds').set(client.guilds.size);
	firebase.database().ref().child('users').set(client.users.size);
});

client.login(auth.token);
