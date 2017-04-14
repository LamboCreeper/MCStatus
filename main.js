const Discord = require('discord.js');
const client = new Discord.Client({ fetchAllMembers: true });

var request = require("request");

const msg = require('./messages.json');
const auth = require('./auth.json');

const compare = require('./commands/compare.js');
const server = require('./commands/server.js');
const official = require('./commands/official.js');
const help = require('./commands/help.js');

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
				server.server(args[1], message.channel);
			} else if (arg0 == 'OFFICIAL') {
				official.official(message.channel);
			} else if (arg0 == 'COMPARE') {
				compare.compare(args[1], args[2], message.channel);
			} else if (arg0 == '-G') {
				message.channel.sendMessage(client.guilds.size + ' ' + client.users.size);
			} else if (arg0 == '-P') {
				message.channel.sendMessage(client.ping);
			} else if (arg0 == '-U') {
				message.channel.sendMessage(convertMillisecondsToDigitalClock(client.uptime).clock);
			} else if (arg0 == 'HELP') {
				help.help(message.author, message.channel, client);
			}
		} else {
			help.help(message.author, message.channel, client);
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
