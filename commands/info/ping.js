module.exports = {
    name: 'ping',
    description: 'pong',
    run: async (client, message, args, mongoose) => {
        message.client.send('pong')
    }
}