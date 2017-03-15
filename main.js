const Discord = require('discord.js');
const client = new Discord.Client();

const msg = require('./messages.json');
const auth = require('./auth.json');

var prefix = '[MCStatus] ';

client.on('ready', () => {
	console.log(prefix + "Starting Up...");

	client.user.setGame('http://lcurl.xyz/')

	console.log(prefix + "Ready to go!");
});

client.login(auth.token);
