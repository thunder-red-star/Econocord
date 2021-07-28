const Discord = require("discord.js"),
    superagent = require("superagent"),
    fs = require("fs")

exports.run = async (client, message, args, tools) => {
    let prefix = args[0]
    if (prefix == "" || prefix == undefined) {
        return message.channel.send("You didn't provide a prefix, please try again.")
    }
    try {
        client.Database.set_prefix(client.connection, message.guild.id, prefix)
        let embed = new Discord.MessageEmbed().setTitle("Prefix Change").setDescription("My prefix is now `" + prefix + "`").setTimestamp()
        message.channel.send(embed)
    } catch {
        message.channel.send("An error occurred.")
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["pf"],
    cooldown: 5,
    perms: ["USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    permLevel: 0
};

exports.help = {
    name: "prefix",
    description: "Sets the prefix for the bot in your server.",
    usage: "invite",
};
