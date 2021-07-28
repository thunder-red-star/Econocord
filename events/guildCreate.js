const Discord = require('discord.js'),
    settings = require('../config/settings.json'),
    fs = require('fs');

module.exports = async (guild) => {
    let owner = guild.ownerID,
        channel = guild.channels.cache.get(guild.systemChannelID),
        joinEmbed = new Discord.MessageEmbed()
            .setTitle("Econocord")
            .setDescription(`Hello ${guild.name}, thanks for inviting me to this server! My default prefix is ${settings.prefix}, however, you can use the command ${settings.prefix}prefix to set a new prefix!`)
    let message = await channel.send(joinEmbed)
    let client = message.client

    await client.Database.add_prefix(client.connection, guild.id, "e!")
}
