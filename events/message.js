const prefixschema = require('../schemas/prefix-schema')
const antiadschema = require('../schemas/antiad-schema')
let status;
let prefix;

const ms = require('ms')


module.exports = async (message, client) => {
  let newStatus = await antiadschema.findOne({
    Guild: message.guild.id
  })

  newStatus ? (status = newStatus.antiadStatus) : (status = 'off')

  if (status === 'on'){
    const guildinvites = await message.guild.fetchInvites()
    const codeinvites = guildinvites.map(f => f.code)
    codeinvites.push(message.guild.vanityURLCode)
    if (message.content.includes('discord.gg/')){
      const code = message.content.split('discord.gg/')[1]
      const checkinv = codeinvites.includes(code)
      if (checkinv == false){
        message.delete()
        message.channel.send('ads not allowed')
      }
    }
  }

  let newPrefix = await prefixschema.findOne({
    Guild: message.guild.id
  })

  newPrefix ? (prefix = newPrefix.Prefix) : (prefix = '!');

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (!message.member) {
    message.member = await message.guild.fetchMember(message);
  }
  if (!message.content.toLowerCase().startsWith(prefix)) return;
  if (!message.guild) return;

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd) || client.commands.find(c => c.aliases && c.aliases.includes(cmd));

  if (!command) return;

  if (!message.member.hasPermission(command.permissions)){ 
    return message.channel.send({embed: {color: 0xff0000, title: `You are missing \`${command.permissions.join(', ')}\` permissions!`}})
  }

  command.run(client, message, args)
}