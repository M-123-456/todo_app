import User from '../models/User.js'
import httpErrors from 'http-errors'


// Get user data (Accessible for all user)
/** @type {import("express").RequestHandler} */
export const getUser = async (req, res) => {
    const user = req.user
    res.status(200).send(user)
}

/** @type {import("express").RequestHandler} */
export const updateProfile = async (req, res) => {
    const user = req.user
    const { username, avatar } = req.body

    if (username) user.username = username

    if (avatar) user.avatar = avatar

    await user.save()

    res.status(200).send(user)
}

/** @type {import("express").RequestHandler} */
export const changePassword = async (req, res) => {
    const user = req.user

    user.password = req.body.newPassword

    await user.save()

    res.status(200).send(user)
}

//todo 
/** @type {import("express").RequestHandler} */
export const deleteUser = async (req, res) => {
    const user = req.user


    res.status(200).send("Successfully deleted")
}

// FRIENDS REQUEST

// Get all friend requests
/** @type {import("express").RequestHandler} */
export const getAllFriendRequests = async (req, res) => {
    const userId = req.params.id

    const user = await User.findById(userId).select('-_id sentFriendRequests receivedFriendRequests').populate('sentFriendRequests').populate('receivedFriendRequests')
    if (!user) return httpErrors.NotFound()

    res.status(200).send(user)
}

// Send friend request
/** @type {import("express").RequestHandler} */
export const sendFriendRequest = async (req, res) => {
    const userId = req.params.id
    const friendId = req.body.friendId

    let user = await User.findById(userId)
    if (!user) return httpErrors.NotFound()

    const friend = await User.findById(friendId)
    if (!friend) return httpErrors.NotFound()

    // STEP1: Add user to receivedFriendRequests of selected user, if he/she doesn't exist yet
    if (!friend.receivedFriendRequests.includes(userId)) {
        try {
            friend.receivedFriendRequests.push(userId)
            await friend.save()
        } catch (err) {
            throw httpErrors.InternalServerError('Could not send friend request to the selected user')
        }
    }

    // STEP2: Add selected user to sentFriendRequests of user, if he/she doesn't exist yet
    if (!user.sentFriendRequests.includes(friendId)) {
        try {
            user.sentFriendRequests.push(friendId)
            await user.save()
        } catch (err) {
            // If error occurs, cancel STEP1 and send error
            friend.receivedFriendRequests.pull(userId)
            await friend.save()
            throw httpErrors.InternalServerError('Could not send friend request to the selected user')
        }
    }

    user = await User.findById(userId).select('-_id sentFriendRequests receivedFriendRequests')

    res.status(200).send(user)
}

// Cancel friend request
/** @type {import("express").RequestHandler} */
export const cancelFriendRequest = async (req, res) => {
    const userId = req.params.id
    const friendId = req.body.friendId

    let user = await User.findById(userId)
    if (!user) return httpErrors.NotFound()

    const friend = await User.findById(friendId)
    if (!friend) return httpErrors.NotFound()

    // STEP1: Delete user to receivedFriendRequests of selected user, if he/she exist
    if (friend.receivedFriendRequests.includes(userId)) {
        try {
            friend.receivedFriendRequests.pull(userId)
            await friend.save()
        } catch (err) {
            throw httpErrors.InternalServerError('Could not cancel friend request to the selected user')
        }
    }

    // STEP2: Delete selected user to sentFriendRequests of user, if he/she exist
    if (user.sentFriendRequests.includes(friendId)) {
        try {
            user.sentFriendRequests.pull(friendId)
            await user.save()
        } catch (err) {
            // If error occurs, cancel STEP1 and send error
            friend.receivedFriendRequests.push(userId)
            await friend.save()
            throw httpErrors.InternalServerError('Could not cancel friend request to the selected user')
        }
    }

    user = await User.findById(userId).select('-_id sentFriendRequests receivedFriendRequests')

    res.status(200).send(user)
}


// FRIENDS

// Get all friends
/** @type {import("express").RequestHandler} */
export const getAllFriends = async (req, res) => {
    const userId = req.params.id

    const user = await User.findById(userId).select('-_id friends').populate('friends')
    if (!user) return httpErrors.NotFound()

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

    // STEP1: Add friend to user's friends, if he/she doesn't exist yet
    if (!user.friends.includes(friendId)) {
        try {
            user.friends.push(friendId)
            await user.save()
        } catch (err) {
            throw httpErrors.InternalServerError('Could not add the user to friends')
        }
    }

    // STEP2: Add user to friend's friends, if he/she doesn't exist yet
    if (!friend.friends.includes(userId)) {
        try {
            friend.friends.push(userId)
            await friend.save()
        } catch (err) {
            // If error occurs, cancel STEP1 and send error
            user.friends.pull(friendId)
            await user.save()
            throw httpErrors.InternalServerError('Could not add the user to friends')
        }
    }

    res.status(200).json({ user: user.friends, friend: friend.friends })
}

// Delete a friend
/** @type {import("express").RequestHandler} */
export const deleteFriend = async (req, res) => {
    const userId = req.params.id
    const friendId = req.body.friendId

    const user = await User.findById(userId)
    if (!user) return httpErrors.NotFound()

    const friend = await User.findById(friendId)
    if (!friend) return httpErrors.NotFound()

    // STEP1: Add friend to user's friends, if he/she exists 
    if (user.friends.includes(friendId)) {
        try {
            user.friends.pull(friendId)
            await user.save()
        } catch (err) {
            throw httpErrors.InternalServerError('Could not delete the user from friends')
        }
    }

    // STEP2: Add user to friend's friends, if he/she exists
    if (friend.friends.includes(userId)) {
        try {
            friend.friends.pull(userId)
            await friend.save()
        } catch (err) {
            // If error occurs, cancel STEP1 and send error
            user.friends.push(friendId)
            await user.save()
            throw httpErrors.InternalServerError('Could not delete the user from friends')
        }
    }

    res.status(200).json({ user: user.friends, friend: friend.friends })
}