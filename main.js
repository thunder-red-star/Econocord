const { BaseCluster } = require('kurasuta');

module.exports = class extends BaseCluster {
    async launch() {
        const Discord = require("discord.js");
        const Chalk = require("chalk");
        const Database = require("./utils/Database")
        const settings = require("./config/settings.json")
        const Tedious = require("tedious");


        const fs = require("fs");

        const client = new Discord.Client();
        this.client.Database = Database;

        this.client.connection = new Database(process.env.db_url, "Econocord", process.env.db_user, process.env.db_pass);

        this.client.modules = [
            "config",
            "economy",
            "info",
            "miscellaneous"
        ]

        this.client.commands = new Discord.Collection();
        this.client.aliases = new Discord.Collection();

        this.client.modules.forEach(c => {
            fs.readdir(`./commands/${c}/`, (err, files) => {
                if (err) throw err;
                files.forEach(f => {
                    const props = require(`./commands/${c}/${f}`);
                    this.client.commands.set(props.help.name, props);
                    props.conf.aliases.forEach(alias => {
                        this.client.aliases.set(alias, props.help.name);
                    });
                });
            });
        });

        this.client.elevation = message => {
            if (message.channel.type === 'dm') return;
            let permlvl = 0;
            if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
            if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
            if (message.member.hasPermission("MANAGE_GUILD")) permlvl = 3;
            if (message.member.id === message.guild.ownerID) permlvl = 4;
            if (message.author.id === settings.ownerid) permlvl = 5;
            return permlvl;
        };

        require('./utils/eventLoader.js')(this.client);

        this.client.login(process.env.token);
    }
};

