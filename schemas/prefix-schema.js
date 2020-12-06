const mongoose = require('mongoose')

const required = {
    type: String,
    required: true
}

const prefixSchema = mongoose.Schema({
    Guild: required,
    prefix: required
})

module.exports = mongoose.model('custom-prefix', prefixSchema)