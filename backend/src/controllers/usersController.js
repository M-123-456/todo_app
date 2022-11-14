import User from '../models/User.js'
import httpErrors from 'http-errors'


/** @type {import("express").RequestHandler} */
export const getUser = async (req, res) => {
    const user = req.user
    res.status(200).send(user)
}

/** @type {import("express").RequestHandler} */
export const updateProfile = async (req, res) => {
    const user = req.user
    const { username, avatar } = req.body

    const foundUser = await User.findByName(username)

    if (foundUser && foundUser.email !== user.email) {
        throw httpErrors.Unauthorized('User with the name exists already')
    }

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

// FRIENDS REQUEST

/** @type {import("express").RequestHandler} */
export const getSentFriendRequests = async (req, res) => {
    let user = req.user

    user = await user.populate('sentFriendRequests')

    res.status(200).send(user.sentFriendRequests)
}

/** @type {import("express").RequestHandler} */
export const getReceivedFriendRequests = async (req, res) => {
    let user = req.user

    user = await user.populate('receivedFriendRequests')

    res.status(200).send(user.receivedFriendRequests)
}

/** @type {import("express").RequestHandler} */
export const sendFriendRequest = async (req, res) => {
    const user = req.user
    const friendId = req.body.friendId

    const friend = await User.findById(friendId)
    if (!friend) return httpErrors.NotFound()

    // STEP1: Add user to receivedFriendRequests of selected user
    if (!friend.receivedFriendRequests.includes(user._id) && !friend.friends.includes(user._id)) {
        try {
            friend.receivedFriendRequests.push(user._id)
            await friend.save()
        } catch (err) {
            throw httpErrors.InternalServerError('Could not send friend request to the selected user')
        }
    }

    // STEP2: Add selected user to sentFriendRequests of user
    if (!user.sentFriendRequests.includes(friendId) && !user.friends.includes(friendId)) {
        try {
            user.sentFriendRequests.push(friendId)
            await user.save()
        } catch (err) {
            // If error occurs, cancel STEP1 and send error
            friend.receivedFriendRequests.pull(user._id)
            await friend.save()
            throw httpErrors.InternalServerError('Could not send friend request to the selected user')
        }
    }

    const friendRequests = await User.findById(user._id).select('-_id sentFriendRequests receivedFriendRequests')

    res.status(200).send(friendRequests)
}

// Cancel friend request
/** @type {import("express").RequestHandler} */
export const cancelFriendRequest = async (req, res) => {
    const user = req.user
    const friendId = req.body.friendId

    const friend = await User.findById(friendId)
    if (!friend) return httpErrors.NotFound()

    // STEP1: Delete user to receivedFriendRequests of selected user, if he/she exist
    if (friend.receivedFriendRequests.includes(user._id)) {
        try {
            friend.receivedFriendRequests.pull(user._id)
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
            friend.receivedFriendRequests.push(user._id)
            await friend.save()
            throw httpErrors.InternalServerError('Could not cancel friend request to the selected user')
        }
    }

    const friendRequests = await User.findById(user._id).select('-_id sentFriendRequests receivedFriendRequests')

    res.status(200).send(friendRequests)
}


// FRIENDS

/** @type {import("express").RequestHandler} */
export const getAllFriends = async (req, res) => {
    const user = req.user

    await user.populate('friends')

    // ? populate like this?
    const userFriendsPopulated = await user.populate('friends')

    res.status(200).send(userFriendsPopulated)
}

/** @type {import("express").RequestHandler} */
export const addFriend = async (req, res) => {
    const user = req.user
    const friendId = req.body.friendId

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
    if (!friend.friends.includes(user._id)) {
        try {
            friend.friends.push(user._id)
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
    const user = req.user
    const friendId = req.body.friendId

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
    if (friend.friends.includes(user._id)) {
        try {
            friend.friends.pull(user._id)
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