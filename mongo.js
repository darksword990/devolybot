const mongoose = require('mongoose')
require('dotenv').config()

module.exports = async () => {
    await mongoose.connect(process.env.mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    return mongoose
}