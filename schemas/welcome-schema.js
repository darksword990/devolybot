const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const welcomeSchema = new mongoose.Schema({
    Guild: reqString,
    channelId: reqString,
    title: reqString,
    description: reqString,
    color: Number,
    image: Object
})

module.exports = mongoose.model('welcome-channels', welcomeSchema)