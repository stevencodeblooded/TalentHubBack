const mongoose = require('mongoose')

const Schema = mongoose.Schema

const applicationSchema = new Schema({
    fullname: {
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
    },
    resume: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('JobApplication', applicationSchema)