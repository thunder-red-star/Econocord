const reqEvent = event => require(`../events/${event}`);
module.exports = client => {
  client.on('ready', () => reqEvent('ready')(client));
  client.on('messageCreate', reqEvent('messageCreate')); // reflects the change in the event name
  client.on('guildCreate', reqEvent('guildCreate'));
  //client.on('guildMemberAdd', reqEvent('guildMemberAdd'))
};
