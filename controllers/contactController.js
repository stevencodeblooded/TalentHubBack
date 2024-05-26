const Contact = require('../model/messageModel')

const contact = async (req, res) => {
    const { name, email, message } = req.body

    let messageForm
    
    try {
        messageForm = new Contact({ name, email, message })
        await messageForm.save()
        res.status(201).json({ message: 'Message successfully submitted.'})
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong, Try again later.'})
    }
}

module.exports = { contact }