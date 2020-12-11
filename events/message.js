const prefixschema = require('../schemas/prefix-schema')
const antiadschema = require('../schemas/antiad-schema')
const reqroleschema = require('../schemas/requiredRole-schema')
const mongo = require('../mongo')

let status;
let prefix;
let roles;

const ms = require('ms');

module.exports = async (message, client) => {
  await mongo().then(async mongoose => {
    let newStatus = await antiadschema.findOne({
      Guild: message.guild.id
    })
  
    newStatus ? (status = newStatus.antiadStatus) : (status = 'off');
  })

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
  
  await mongo().then(async mongoose => {
    try {
      let newPrefix = await prefixschema.findOne({Guild: message.guild.id});
      newPrefix ? (prefix = newPrefix.Prefix) : (prefix = "!");
    } finally {
      mongoose.connection.close();
    }
  })

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

  await mongo().then(async mongoose => {
    try {
      let newroles = await reqroleschema.findOne({Guild: message.guild.id})
      newroles ? (roles = newroles.requiredRoles) : (roles = ['779371168003653682', '776093229191397426'])
    } finally {
      mongoose.connection.close()
    }
  })

  const roleids = message.member.roles.cache.map(f => f.id)
  const data = []

  if (roles !== null){
    for (let i = 0; i < roleids.length; i++){
      for (let j = 0; j < roles.length; j++){
        if (roleids[i] !== roles[j]){
          const roleobj = await message.guild.roles.resolve(roles[i])
          data.push(roleobj)
        }
      }
    }
  }
  
  if (command.rolesRequired){
    
  }

  command.run(client, message, args)
}