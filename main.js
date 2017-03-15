const Discord = require('discord.js');
const client = new Discord.Client();

const http = require('http');
const nQuery = require('nodeQuery');
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
		message.channel.sendMessage(msg.about.p1 + message.author + msg.about.p2);
	}

	// Server status command - @MCStatus server
	if (message.content.startsWith('<@291623138457026560>')) {

		// Creating arguments and making them not CaSeSENsiTivItE.
		var args = message.content.split(" ").slice(1);
		arg0 = args[0].toUpperCase();

		if (arg0 == 'SERVER') {
			if (typeof args[1] != 'undefined') {
				console.log(args[1]);
				var result;
				var app = function ($) {
					$.on('ready', function () {
						$.get( "https://mcapi.us/server/status?ip=" + args[1], function( data ) {
					  	 	result = data;
						});
					});
				}
				message.channel.sendMessage(result);

				nQuery.use(app);
			} else {
				message.channel.sendMessage(msg.server.not_defined);
				message.channel.sendMessage(msg.server.usage);
			}
		}
	}
});

client.login(auth.token);
