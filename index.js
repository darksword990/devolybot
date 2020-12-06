const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()
client.commands = new Discord.Collection()
const config = require('./config.json')
const mongo = require('./mongo')
const commands = fs.readdirSync('./commands')
require('dotenv').config()

async function mongoose(){
  return await mongo()
}

for (const dir of commands){
  const commandfiles = fs.readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'))
  for (const command of commandfiles){
    const file = require(`./commands/${dir}/${command}`)
    client.commands.set(file.name, file)
    console.log(`Loaded: ${file.name}`)
  }
}

client.on('ready', async () => {
  console.log(`${client.user.tag} is ready`)

 
  try {
    console.log(`Connected to mongo!`)
  } finally {
    (await mongoose()).connection.close()
  }
})

// message
client.on('message', async message => {
  require('./events/message')(message, (await mongoose()), client)
})

// member join
client.on('guildMemberAdd', async member => {
  require('./events/guildMemberAdd')(member, (await mongoose()), client)
})


// client joined
client.on('guildCreate', async guild => {
  require('./events/guildCreate')(guild, (await mongoose()), client)
})
client.login(process.env.token)