const Discord = require("discord.js"),
    superagent = require("superagent"),
    fs = require("fs")

exports.run = async (client, message, args, tools) => {
    let yesButton = new Discord.MessageButton()
        .setLabel("Yes")
        .setID("confirmYes")
        .setEmoji("811296394324869150", true)
        .setStyle("green");

    let noButton = new Discord.MessageButton()
        .setLabel("No")
        .setID("confirmNo")
        .setEmoji("811294703626223687", true)
        .setStyle("red");

    let row = new Discord.MessageActionRow()
        .addComponents(yesButton, noButton);

    let msg = await message.channel.send("Testing confirmation.", row)

    let confirmationCollector = await message.createButtonCollector({ time: 15000 })

    confirmationCollector.on("collect", async (button) => {
        await button.clicker.fetch();
        if (button.clicker.user.id == message.author.id) {
            confirmationCollector.end("collected button click from user")
        }
    })
    confirmationCollector.on("end", async (data) => {
        if (!data) { return message.channel.send("You didn't provide a response, so we canceled your action.") }
        else {
            if (data.first().id == "confirmYes") {
                await msg.edit("You responded with Yes.")
            }
            else if (data.first().id == "confirmNo") {
                await msg.edit("You responded with No.")
            }
            yesButton.setDisabled();
            noButton.setDisabled();
        }
    })


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
    name: "confirmation",
    description: "Test confirmation buttons for future stuff.",
    usage: "confirmation",
};
