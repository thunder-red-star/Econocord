const Discord = require("discord.js"),
    superagent = require("superagent"),
    fs = require("fs")

exports.run = async (client, message, args, tools) => {
    let button = new Discord.MessageButton()
    .setLabel("Invite me here.")
    .setURL("https://discord.com/oauth2/authorize?client_id=868170219569426472&permissions=4228377809&scope=bot")
    .setStyle("url");
    message.channel.send("Invite me with the button below!", button)
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
