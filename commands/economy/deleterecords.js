const Discord = require("discord.js"),
    superagent = require("superagent"),
    fs = require("fs")

exports.run = async (client, message, args, tools, buttons) => {
    let hascoins = await client.Database.get_coins(client.connection, message.author.id)
    if (hascoins == undefined) {
        return message.channel.send("You don't have accounts with this bot!")
    }
    else {
        try {
            await client.Database.delete_coins(client.connection, message.author.id)
            await client.Database.delete_gems(client.connection, message.author.id)
            
            let startedEmbed = new Discord.MessageEmbed()
                .setTitle("Accounts Deleted!")
                .setDescription("Your account and all of its data has been successfully deleted.")
                .setTimestamp()
            return message.channel.send({embeds: [startedEmbed]})
        } catch (err) {
            return message.channel.send("An error occurred, please try again later.\n" + "```" + err + "```")
            console.log(err)
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["delrecs"],
    cooldown: 5,
    perms: ["USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    permLevel: 0
};

exports.help = {
    name: "deleterecords",
    description:
        "Deletes all your accounts in the bot. USE WITH CAUTION",
    usage: "deleterecords",
};
