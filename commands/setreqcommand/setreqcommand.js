const mongo = require('../../mongo')
const reqroleschema = require('../../schemas/requiredRole-schema')

module.exports = {
    name: 'setreqcommand',
    description: 'Sets the command with some required roles',
    aliases: ['setreqcmd'],
    permissions: ['ADMINISTRATOR'],
    run: async (client, message, args) => {
        if (!message.member.hasPermission(this.permissions)){
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: `Permissions Required`,
                    description: `You need ${this.permissions.join(", ")} permission to use this command!`
                }
            })
        }
        await mongo().then(async mongoose => {
            try {
                
            } finally {
                mongoose.connection.close()
            }
        })
    }
}