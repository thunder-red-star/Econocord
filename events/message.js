const Discord = require('discord.js'),
    settings = require('../config/settings.json'),
    fs = require("fs"),
    humanizeDuration = require("humanize-duration"),
    cooldowns = new Discord.Collection(),
    { Request, Connection } = require("tedious")
axios = require('axios');

let cooldownMessages = [
    "Chill out bro!",
    "Slow it down a little!",
    "Stop spamming!",
    "Too fast!",
    "Take a chill pill!"
]

function randomthing(array) {
    return array[Math.floor(Math.random() * array.length)]
}

module.exports = async message => {
    // get the client
    let client = message.client;

    // ignore certain kinds of messages
    if (message.channel.type == "dm") return;
    if (message.author.bot || message.webhookID) return;

    // get prefix
    let prefix = await client.Database.get_prefix(client.connection, message.guild.id)

    // send prefix on ping
    if (message.content.includes("<@!868170219569426472>")) {
        message.channel.send("My prefix is `" + prefix + "`.")
    }

    // ignore messages that don't start with prefix
    if (!message.content.startsWith(prefix)) return;

    // parse input to get the command
    let command = message.content.split(' ')[0].slice(prefix.length),
        params = message.content.split(' ').slice(1),
        perms = client.elevation(message),
        cmd;

    // check for command in handler
    if (client.commands.has(command)) {
        cmd = client.commands.get(command)
    }
    // or aliases
    else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    }

    // if there is a command, set a cooldown for the user
    if (cmd) {
        if (!cooldowns.has(cmd.help.name)) {
            cooldowns.set(cmd.help.name, new Discord.Collection());
        }

        const now = Date.now(),
            timestamps = cooldowns.get(cmd.help.name)

        cooldownAmount = cmd.conf.cooldown * 1000 || 0
        if (message.author.id != settings.ownerid) {

            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now);
                    const ratelimitEmbed = new Discord.MessageEmbed()
                        .setTitle(randomthing(cooldownMessages))
                        .setDescription(`Please wait ${humanizeDuration(timeLeft)} before reusing the \`${command}\` command. The cooldown for this command is ${cmd.conf.cooldown} seconds.`)
                    return message.reply(ratelimitEmbed);
                }
            }
        }
        
        fs.appendFileSync(`./logs/commandlog`, `[ ${(new Date).toString().split(" ").slice(1, 5).join(" ")} ] Command: ${settings.prefix + cmd.help.name} - Guild: ${message.guild.name} (${message.guild.id}) - Author: ${message.author.tag} (${message.author.id})\n`);

        if (perms < cmd.conf.permLevel) {
            return console.log(`Command: ${guildSettings.prefix}` + cmd.help.name + " - Guild: " + message.guild.name + " ID: " + message.guild.id)
        }

        try {
            cmd.run(client, message, params, perms);
            console.log(`Command: ${prefix}` + cmd.help.name + " - Guild: " + message.guild.name + " ID: " + message.guild.id)
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }
        catch (err) {
            console.log(err)
        }
    } else { return; }


};
