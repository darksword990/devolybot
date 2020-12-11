const mongoose = require('mongoose')

const reqroleSchema = new mongoose.Schema({
    Guild: {
        type: String,
        required: true
    },
    Command: {
      type: Object,
      required: true
    }
})

module.exports = mongoose.model('required-cmdroles', reqroleSchema)