module.exports = {
    name: 'ping',
    description: 'pong',
    run: async (client, message, args) => {
        message.channel.send('Pong!').then(msg => {
            const ping = msg.createdTimestamp - message.createdTimestamp
            msg.edit({embed: {color: 0x00ff00,author: {name: message.author.tag, icon_url: message.author.displayAvatarURL({format: `png`, dynamic: true})}, description: `:white_check_mark:\n**Ping:** ${ping}ms\n**API:** ${client.ws.ping}`}})
        })
    }
}