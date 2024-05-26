const mongoose = require('mongoose')

const Schema = mongoose.Schema

const jobDescSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    company_info: {
        type: String,
        required: true
    },
    job_description: {
        type: Array,
        required: true
    },
    requirements: {
        type: Array,
        required: true
    },
    benefits: {
        type: Array,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
}) 


module.exports = mongoose.model('JobDescription', jobDescSchema)