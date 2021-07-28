const chalk = require('chalk');
module.exports = client => {
    client.user.setActivity(`with your money ⋙ e!help`, { type: 'PLAYING' })
    setInterval(() => {
        let totalusers = 0;
        client.guilds.cache.array().forEach(guild => {
            totalusers += guild.memberCount
        })
        client.user.setActivity(`with ${totalusers} users' money ⋙ e!help`, { type: 'PLAYING' })
    }, 20000);


};
