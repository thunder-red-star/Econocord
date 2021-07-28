const Discord = require("discord.js"),
    superagent = require("superagent"),
    fs = require("fs")

exports.run = async (client, message, args, tools) => {
    return message.channel.send("https://discord.com/oauth2/authorize?client_id=868170219569426472&permissions=4228377809&scope=bot")
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["invme"],
    cooldown: 5,
    perms: ["USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    permLevel: 0
};

exports.help = {
    name: "invite",
    description:
        "Invite the bot.",
    usage: "invite",
};
