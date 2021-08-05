const Discord = require("discord.js"),
    superagent = require("superagent"),
    fs = require("fs")

var parseUserInput = async function(input, client, guild) {
    await guild.members.fetch()
    try {
        if (input.length == 18 && input.replace(new RegExp("[^0-9.]", "g"), "").length == 18) {
            user = await client.users.fetch(input)
        }
        else if (input.replace(/ /g, "").replace("!", "").replace(new RegExp("[^0-9.]", "g"), "").length == 18) {
            let user = await client.users.fetch(input.replace(/ /g, "").replace("!", "").replace(new RegExp("[^0-9]", "g"), ""))
            return user
        }
        else {
            let member = await guild.members.cache.filter(el => el.user.username.includes(input)).first()
            return member.user
        }
    } catch (err) {
        console.log(err)
    }
}


exports.run = async (client, message, args, tools) => {
    let userinput = args.join(" ")

    let user = undefined;

    if (userinput == undefined || userinput == "") {
        user = message.author
    } else {
        user = await parseUserInput(userinput, client, message.guild)
        if (user == undefined) {
            return message.channel.send("I couldn't find that user, sorry.")
        }
    }

    let hascoins = await client.Database.get_coins(client.connection, user.id)

    if (hascoins == undefined) {
        return message.channel.send("That user hasn't started using this bot yet.")
    }
    else {
        try {
            let coins = await client.Database.get_coins(client.connection, user.id)
            let gems = await client.Database.get_gems(client.connection, user.id)
            let balEmbed = new Discord.MessageEmbed()
                .setTitle(user.username + "'s Balance")
                .addField("Coins", coins, true)
                .addField("Gems", gems, true)
                .setTimestamp()
            return message.channel.send({embeds: [balEmbed]})
        } catch (err) {
            return message.channel.send("An error occurred, please try again later.\n" + "```" + err + "```")
            console.log(err)
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["bal"],
    cooldown: 5,
    perms: ["USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    permLevel: 0
};

exports.help = {
    name: "balance",
    description:
        "Checks how many coins and gems you, or someone else, has.",
    usage: "balance [username, user id, or mention]",
};
