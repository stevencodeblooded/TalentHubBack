const mongoose = require('mongoose')

const Schema = mongoose.Schema

const contactData = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Contact', contactData)