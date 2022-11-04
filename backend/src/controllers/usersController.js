import User from '../models/User.js'
import httpErrors from 'http-errors'

// Get user data (Accessible for all user)
/** @type {import("express").RequestHandler} */
export const getUserById = async (req, res) => {
    const userId = req.params.id
    const user = await User.findById(userId).select('username todolists')
    if(!user) httpErrors.NotFound()
    res.status(200).send(user)
}

// Update user data (Accessible only for the user)
/** @type {import("express").RequestHandler} */
export const updateUser = async (req, res) => {
    const userId = req.params.id
    const { username, password, newPassword } = req.body

    const user = await User.findById(userId)
    
    if (!user) httpErrors.NotFound()

    if (username) user.username = username

    if (password) {
        if (password === user.password) {
            user.password = newPassword
        } else {
            throw httpErrors.Unauthorized('Wrong password')
        }
    }

    res.status(200).send(user)
}

/** @type {import("express").RequestHandler} */
export const deleteUser = async (req, res) => {
    const userId = req.params.id

    const user = await User.findById(userId)

    if (!user) httpErrors.NotFound()

    await User.deleteOne({ _id: userId })

    res.status(200).send("Successfully deleted")
}