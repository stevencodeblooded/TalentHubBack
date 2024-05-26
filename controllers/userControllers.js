const bcryptjs = require('bcryptjs')
const User = require('../model/userModel')

const register = async (req, res) => {
    const { name, email, password } = req.body

    const hashedPassword = await bcryptjs.hash(password, 12)

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(400).json({ message: 'User already exists, Kindly login.'})
        } else {
            const newUser = new User({ name, email, password:hashedPassword })
            try {
                await newUser.save()
                res.status(201).json({ message: 'User successfully created.' })
            } catch (error) {
                res.status(400).json({ message: 'Something went wrong!' })
            }
        }
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong!' })
    }
}


const login = async (req, res) => {
    const { email, password } = req.body

    let existingUser
    try {
        existingUser = await User.findOne({ email })
    } catch (error) {
        return res.status(400).json({ message: 'User does not exist!' })
    }

    let validPassword
    try {
        validPassword = await bcryptjs.compare(password, existingUser.password)
    } catch (error) {
        return res.status(400).json({ message: 'Invalid Credentials, Try again later' })
    }

    let loggedUser = existingUser && validPassword
    if (loggedUser) {
        existingUser.password = undefined
        return res.status(200).json({ message: `Welcome back, ${existingUser?.name}`, user: existingUser } )
    } else {
        return res.status(401).json({ message: 'Something went wrong!' } )

    } 
    
}


const updateUser = async (req, res) => {
    const userId = req.params.id
    // if (req.user.id !== userId) {
    if (!userId) {
        res.status(401).json({ message: 'You cannot update this account' })
    }

    const { name, email, password } = req.body

    let updatedUserData = {
        name,
        email,
    }

    if (password) {
        const hashedPassword = await bcryptjs.hash(password, 12)
        updatedUserData.password = hashedPassword
    }

    let newUser
    try {
        newUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true })
        return res.status(200).json({ message: 'User has been updated successfully', newUser })
    } catch (error) {
        return res.status(401).json({ message: 'Update Failed! Could not find user with the specified id'})
    }
}

module.exports = { register, login, updateUser }