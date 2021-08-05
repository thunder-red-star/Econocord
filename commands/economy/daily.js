const Discord = require("discord.js"),
    superagent = require("superagent"),
    fs = require("fs"),
    ms = require("ms"),
    humanizeDuration = require("humanize-duration")

exports.run = async (client, message, args, tools, buttons) => {
    let hascoins = await client.Database.get_coins(client.connection, message.author.id)

    if (hascoins == undefined) {
        return message.channel.send("You don't have accounts with this bot! Please use `e!start` to create accounts.")
    }

    else {
        try {
            let claims = JSON.parse(fs.readFileSync("./dailies/dailies.json"))
            let lastclaim;
            if (!claims[message.author.id.toString()]) {
                lastclaim = 0
                claims[message.author.id.toString()] = {}
            } else {
                lastclaim = claims[message.author.id.toString()]["last"]
            }
            if (message.createdTimestamp - lastclaim < 86400000) {
                let failEmbed = new Discord.MessageEmbed()
                    .setTitle("Daily")
                    .setDescription("You've already claimed your daily bonuses in the last 24 hours. Try again in " + humanizeDuration(86400000 - (message.createdTimestamp - lastclaim)) + ".")
                    .setTimestamp()
                return message.channel.send({embeds: [failEmbed]})
            }
            else {
                await client.Database.add_coins(client.connection, message.author.id, 2500)
                await client.Database.add_gems(client.connection, message.author.id, 25)

                claims[message.author.id.toString()]["last"] = message.createdTimestamp
                claims[message.author.id.toString()]["streak"] = 1

                fs.writeFileSync("./dailies/dailies.json", JSON.stringify(claims))
                let successEmbed = new Discord.MessageEmbed()
                    .setTitle("Daily")
                    .setDescription("Congratulations, you've gotten 2500 coins and 25 gems from today's daily claim. Come back in 24 hours!")
                    .setTimestamp()
                return message.channel.send({embeds: [successEmbed]})
            }
        } catch (err) {
            console.log(err)

            return message.channel.send("An error occurred, please try again later.\n" + "```" + err + "```")
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["today"],
    cooldown: 5,
    perms: ["USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    permLevel: 0
};

exports.help = {
    name: "daily",
    description:
        "Gives you 2500 coins and 25 gems.",
    usage: "daily",
};
