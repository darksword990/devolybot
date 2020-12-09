module.exports = {
    name: 'ping',
    description: 'pong',
    run: async (client, message, args) => {
        message.channel.send('Pong!').then(msg => {
            const ping = msg.createdTimestamp - message.createdTimestamp
            msg.edit(`Ping: ${ping}ms\nAPI: ${client.ws.ping}`)
        })
    }
}