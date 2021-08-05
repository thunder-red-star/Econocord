const Discord = require("discord.js"),
    superagent = require("superagent"),
    fs = require("fs")

exports.run = async (client, message, args, tools) => {
    let button = new client.buttons.MessageButton()
    .setLabel("This is a button!")
    .setID("myid")
    .setStyle("blurple");
    message.channel.send("This is a (useless) button!", button)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 5,
    perms: ["USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    permLevel: 0
};

exports.help = {
    name: "buttontest",
    description: "Test buttons for future stuff.",
    usage: "buttontest",
};
