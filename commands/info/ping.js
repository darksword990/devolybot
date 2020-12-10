module.exports = {
    name: 'ping',
    description: 'pong',
    run: async (client, message, args) => {
        message.channel.send('Pong!').then(msg => {
            const ping = msg.createdTimestamp - message.createdTimestamp
            msg.edit({embed: {author: {name: message.author.tag, icon_url: message.author.displayAvatarURL({format: `png`, dynamic: true})}, description: `:white_check_mark:\nPing: ${ping}ms\nAPI: ${client.ws.ping}`}})
        })
    }
}