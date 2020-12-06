module.exports = {
    name: 'ping',
    description: 'pong',
    run: async (client, message, args, mongoose) => {
        message.channel.send('Pong!').then(msg => {
            const ping = msg.createdTimestamp - message.createdTimestamp
            message.channel.send(`Ping: ${ping}ms\nAPI: ${client.ws.ping}`)
        })
    }
}