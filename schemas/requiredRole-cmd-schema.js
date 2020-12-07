const mongoose = require('mongoose')

const requiredvar = {
    type: String,
    required: true
}

const prefixSchema = mongoose.Schema({
    Guild: requiredvar,
    CommandName: requiredvar,
    Roles: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('requiredroles-cmd', prefixSchema)