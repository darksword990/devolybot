let prefix;

const ms = require('ms')


module.exports = async (message, mongo, client) => {
  

  if (!message.member) {
    message.member = await message.guild.fetchMember(message);
  }
  if (!message.content.toLowerCase().startsWith(prefix)) return;
  if (!message.guild) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd) || client.commands.find(c => c.aliases && c.aliases.includes(cmd));

  if (!command) return;

  if (!message.member.hasPermission(command.permissions)){ 
    return message.channel.send({embed: {color: 0xff0000, title: `You are missing \`${command.permissions.join(', ')}\` permissions!`}})
  }
}