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
					console.log(args[1]);
					// $.get( "https://mcapi.us/server/status?ip=" + args[1], function( data ) {
					//   	 result = data;
					// });

					var url = "https://mcapi.us/server/status?ip=" + args[1]
					request({
					    url: url,
					    json: true
					}, function (error, response, body) {
					    if (!error && response.statusCode === 200) {
					        console.log(body) // Print the json response
							var result = body;
							console.log('-');
							console.log(result);
							message.channel.sendMessage(JSON.stringify(result));
					    }
					});

				} else {
					message.channel.sendMessage(msg.server.not_defined);
					message.channel.sendMessage(msg.server.usage);
				}
			}
		} else {
			message.channel.sendMessage(msg.about.p1 + message.author + msg.about.p2);
		}
	}
});

client.login(auth.token);
