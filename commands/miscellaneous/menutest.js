const Discord = require("discord.js"),
    superagent = require("superagent"),
    fs = require("fs")

exports.run = async (client, message, args, tools) => {
    let option = new client.buttons.MessageMenuOption()
        .setLabel('Potato')
        .setEmoji('🥔')
        .setValue('menuid')
        .setDescription('Baked Potato')

    let option1 = new client.buttons.MessageMenuOption()
        .setLabel('Potato')
        .setEmoji('🍟')
        .setValue('menuid1')
        .setDescription('Fried Potato (french fries)')

    let option2 = new client.buttons.MessageMenuOption()
        .setLabel('Potato')
        .setEmoji('🍠')
        .setValue('menuid2')
        .setDescription('The Pressed Potato')

    let select = new client.buttons.MessageMenu()
        .setID('customid')
        .setPlaceholder('Favorite food?')
        .setMaxValues(3)
        .setMinValues(1)
        .addOption(option)
        .addOption(option1)
        .addOption(option2)

    message.channel.send('What is your favorite food? (totally not a menu test)', select);

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
    name: "menutest",
    description: "Test menus for future stuff.",
    usage: "menutest",
};
