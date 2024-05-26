const express = require('express')
const bodyParser =  require('body-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')

const app = express()

dotenv.config()
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/users', userRoutes)

mongoose
    .connect('mongodb+srv://Testuser:qfUGg1WgX3M0q2j1@cluster0.p3mcyyf.mongodb.net/TalentHub?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        app.listen(process.env.PORT || 5000)
    })
    .catch(err => {
        console.log(err);
    }
)