const Discord = require("discord.js"),
    superagent = require("superagent"),
    fs = require("fs")

exports.run = async (client, message, args, tools, buttons) => {
    let hascoins = await client.Database.get_coins(client.connection, message.author.id)
    if (hascoins != undefined) {
        return message.channel.send("You've already set up your accounts!")
    }
    else {
        try {
            await client.Database.init_coins(client.connection, message.author.id)
            await client.Database.init_gems(client.connection, message.author.id)
            let startedEmbed = new Discord.MessageEmbed()
            .setTitle("Accounts Created!")
            .setDescription("Your account has been successfully created. Congratulations and thank you for using this bot!")
            .setTimestamp()
            return message.channel.send(startedEmbed)
        } catch (err) {
            return message.channel.send("An error occurred, please try again later.\n" + "```" + err + "```")
            console.log(err)
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["init", "initialize"],
    cooldown: 5,
    perms: ["USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    permLevel: 0
};

exports.help = {
    name: "start",
    description:
        "Initialize your accounts in the bot.",
    usage: "start",
};
