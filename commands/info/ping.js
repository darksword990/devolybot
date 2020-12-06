module.exports = {
    name: 'ping',
    description: 'pong',
    run: async (client, message, args, mongoose) => {
        message.channel.send('pong')
    }
}