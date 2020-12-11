let prefix;

const prefixschema = require('../../schemas/prefix-schema')
const mongo = require('../../mongo')

module.exports = {
    name: 'setprefix',
    description: 'Sets the server prefix',
    aliases: ['prefix'],
    rolesRequired: true,
    run: async (client, message, args) => {
        if (!args.length){
            await mongo().then(async mongoose => {
                try {
                    let newPrefix = await prefixschema.findOne({Guild: message.guild.id})
                    if (newPrefix){
                        prefix = newPrefix.Prefix
                        message.channel.send(`Prefix for this server is: ${prefix}`)
                    } else if (!newPrefix){
                        prefix = "!"
                        message.channel.send(`Prefix for this server is: ${prefix}`)
                    }
                } finally {
                    mongoose.connection.close()
                }
            })
            return
        }
        await mongo().then(async mongoose => {
            try {
                let serverprefix = await prefixschema.findOneAndUpdate(
                    {
                        Guild: message.guild.id
                    },
                    {
                        Guild: message.guild.id,
                        Prefix: args[0]
                    },
                    {
                        new: true,
                        upsert: true
                    }
                )
                message.channel.send(`Prefix for this server is now ${serverprefix.Prefix}`)
            } finally {
                mongoose.connection.close()
            }
        })
    }
}