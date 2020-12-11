const mongoose = require('mongoose')

const required = {
    type: String,
    required: true
}

const prefixSchema = new mongoose.Schema({
    Guild: required,
    antiadStatus: required
})

module.exports = mongoose.model('anti-ads', prefixSchema)