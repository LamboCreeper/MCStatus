const Discord = require('discord.js');
const request = require('request');
module.exports.official = function (mcstatus) {
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

			mcstatus.sendEmbed(officialEmbded, '', { disableEveryone: true });
		} else {
			mcstatus.sendMessage('Could not connect to Mojang\'s API.');
		}
	});
}
