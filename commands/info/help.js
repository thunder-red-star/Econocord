const Discord = require("discord.js"),
    superagent = require("superagent"),
    fs = require("fs")


function permlevel(input) {
    if (input == 5)
        return "Can only be used by owner of bot";
    else if (input == 4)
        return "Can only be used by guild owner";
    else if (input == 3)
        return "Manage Guild";
    else if (input == 2)
        return "Ban Members";
    else if (input == 1)
        return "Manage Messages";
    else return "Anyone can use this command!";
}

exports.run = async (client, message, args, tools) => {
    return message.channel.send("Coming soon!")
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["h"],
    cooldown: 5,
    perms: ["USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    permLevel: 0
};

exports.help = {
    name: "help",
    description:
        "Returns a list of categories of commands, a list of commands for a category, or help for a command itself.",
    usage: "help <command or category>",
};
