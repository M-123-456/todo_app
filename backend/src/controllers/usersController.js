import User from '../models/User.js'
import httpErrors from 'http-errors'


// Get user data (Accessible for all user)
/** @type {import("express").RequestHandler} */
export const getUserById = async (req, res) => {
    const userId = req.params.id
    const user = await User.findById(userId).select('username todolists')
    if(!user) return httpErrors.NotFound()
    res.status(200).send(user)
}

// Update user data (Accessible only for the user)
/** @type {import("express").RequestHandler} */
export const updateUser = async (req, res) => {
    const userId = req.params.id
    const { username, avatar, password, newPassword } = req.body

    const user = await User.findById(userId)
    if (!user) return httpErrors.NotFound()

    if (username) user.username = username

    if (avatar) user.avatar = avatar

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
    if (!user) return httpErrors.NotFound()

    await User.deleteOne({ _id: userId })

    res.status(200).send("Successfully deleted")
}

// USER FRIENDS

// Get all friends
/** @type {import("express").RequestHandler} */
export const getAllFriends = async (req, res) => {
    const userId = req.params.id
    
    const user = await User.findById(userId).select('-_id friends')
    if(!user) return httpErrors.NotFound()

    res.status(200).send(user.friends)
}

// Add a friend
/** @type {import("express").RequestHandler} */
export const addFriend = async (req, res) => {
    const userId = req.params.id
    const friendId = req.body.friendId

    const user = await User.findById(userId)
    if (!user) return httpErrors.NotFound()

    const friend = await User.findById(friendId)
    if (!friend) return httpErrors.NotFound()

    user.friends.push(friendId)

    res.status(200).send(user.friends)
}

