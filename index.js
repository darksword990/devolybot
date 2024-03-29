const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()
client.commands = new Discord.Collection()
const config = require('./config.json')
const mongo = require('./mongo')
const commands = fs.readdirSync('./commands')
require('dotenv').config()

for (const dir of commands){
  const commandfiles = fs.readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'))
  for (const command of commandfiles){
    const file = require(`./commands/${dir}/${command}`)
    client.commands.set(file.name, file)
    console.log(`Loaded: ${file.name}`)
  }
}

client.on('ready', async () => {
  client.user.setActivity(`over ${client.guilds.cache.size} guilds`, { type: `WATCHING` })
  console.log(`${client.user.tag} is ready`)

  await mongo().then(async mongoose => {
    try {
      console.log(`Connected to mongo!`)
    } finally {
      mongoose.connection.close()
    }
  })
})

// message
client.on('message', async message => {
  require('./events/message')(message, client)
})

client.login(process.env.BOTTOKEN)