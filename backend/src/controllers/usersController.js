import User from '../models/User.js'
import Todolist from '../models/Todolist.js'
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
    if (!friend) throw httpErrors.NotFound('Cannot find the user')

    // ? Error bad request?
    // For below cases, send following messages to inform user about it
    // 'friend' is already friend
    // user sent already friend request
    // user received friend request from 'friend'
    if (user.friends.includes(friendId)) {
        throw httpErrors.BadRequest('The user is already your friend')
    }

    if (user.receivedFriendRequests.includes(friendId)) {
        throw httpErrors.BadRequest("You've already received a friend request from the user. Please accept the request to become friends")
    }

    if (user.sentFriendRequests.includes(friendId)) {
        throw httpErrors.BadRequest("You've already sent a friend request to the user. Please wait till the request is accepted.")
    }


    // STEP1: Add user to receivedFriendRequests of "friend"
    if (!friend.receivedFriendRequests.includes(user._id) && !friend.friends.includes(user._id)) {
        try {
            friend.receivedFriendRequests.push(user._id)
            await friend.save()
        } catch (err) {
            throw httpErrors.InternalServerError('Could not send friend request to the selected user')
        }
    }

    // STEP2: Add "friend" to sentFriendRequests of user
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

    res.status(200).send(user.sentFriendRequests)
}

/** @type {import("express").RequestHandler} */
export const cancelFriendRequest = async (req, res) => {
    const user = req.user
    const friendId = req.body.friendId

    const friend = await User.findById(friendId)
    if (!friend) throw httpErrors.NotFound('Cannot find the user')

    if (!user.sentFriendRequests.includes(friendId)) {
        throw httpErrors.BadRequest("There is no open friend request to the user")
    }

    // STEP1: Delete user from receivedFriendRequests of friend, if exists
    if (friend.receivedFriendRequests.includes(user._id)) {
        try {
            friend.receivedFriendRequests.pull(user._id)
            await friend.save()
        } catch (err) {
            throw httpErrors.InternalServerError('Could not cancel friend request to the selected user')
        }
    }

    // STEP2: Delete friend from sentFriendRequests of user, if exists
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

    res.status(200).send(user.sentFriendRequests)
}

/** @type {import("express").RequestHandler} */
export const acceptFriendRequest = async (req, res) => {
    const user = req.user
    const friendId = req.body.friendId

    const friend = await User.findById(friendId)
    if (!friend) throw httpErrors.NotFound('Cannot find the user')

    // Check if the request is still valid and throw error if not
    if (!user.receivedFriendRequests.includes(friendId)) throw httpErrors.BadRequest("There is no open friend request from the user. Please send a friend request to become friends")

    // STEP1: Delete friend from receivedFriendRequests
    try {
        user.receivedFriendRequests.pull(friendId)
        await user.save()
    } catch (err) {
        throw httpErrors.InternalServerError('Something went wrong, please try later')
    }

    // STEP2: Delete user from sentFriendRequests of friend
    try {
        friend.sentFriendRequests.pull(user._id)
        await user.save()
    } catch (err) {
        // If error occurs, cancel STEP1 and send error
        user.receivedFriendRequests.push(friendId)
        await user.save()
        throw httpErrors.InternalServerError('Something went wrong, please try later')
    }

    // STEP3: Add friend to user's friends, if not exists yet
    if (!user.friends.includes(friendId)) {
        try {
            user.friends.push(friendId)
            await user.save()
        } catch (err) {
            // If error occurs, cancel STEP1 and 2 and send error
            user.receivedFriendRequests.push(friendId)
            await user.save()
            friend.sentFriendRequests.pull(user._id)
            await user.save()
            throw httpErrors.InternalServerError('Could not add the user to friends')
        }
    }

    // STEP4: Add user to friend's friends, if he/she doesn't exist yet
    if (!friend.friends.includes(user._id)) {
        try {
            friend.friends.push(user._id)
            await friend.save()
        } catch (err) {
            // If error occurs, cancel STEP1, 2, 3 and send error
            user.receivedFriendRequests.push(friendId)
            await user.save()
            friend.sentFriendRequests.pull(user._id)
            await user.save()
            user.friends.pull(friendId)
            await user.save()
            throw httpErrors.InternalServerError('Could not add the user to friends')
        }
    }

    res.status(200).json(user.friends)
}

/** @type {import("express").RequestHandler} */
export const declineFriendRequest = async (req, res) => {
    const user = req.user
    const friendId = req.body.friendId

    const friend = await User.findById(friendId)
    if (!friend) throw httpErrors.NotFound('Cannot find the user')

    // Check if the request is still valid and respond if not
    if (!user.receivedFriendRequests.includes(friendId)) throw httpErrors.BadRequest("There is no open friend request to the user")

    // STEP1: Delete friend from receivedFriendRequests
    try {
        user.receivedFriendRequests.pull(friendId)
        await user.save()
    } catch (err) {
        throw httpErrors.InternalServerError('Something went wrong, please try later')
    }

    // STEP2: Delete user from sentFriendRequests of friend
    // ? Leave it as it is?
    // try {
    //     friend.sentFriendRequests.pull(user._id)
    //     await user.save()
    // } catch (err) {
        // If error occurs, cancel STEP1 and send error
    //     user.receivedFriendRequests.push(friendId)
    //     await user.save()
    //     throw httpErrors.InternalServerError('Something went wrong, please try later')
    // }

    res.status(200).json(user.receivedFriendRequests)
}


// FRIENDS

/** @type {import("express").RequestHandler} */
export const getAllFriends = async (req, res) => {
    const user = req.user

    //! select information
    await user.populate('friends')

    res.status(200).send(user.friends)
}

/** @type {import("express").RequestHandler} */
export const deleteFriend = async (req, res) => {
    const user = req.user
    const friendId = req.body.friendId

    if (!user.friends.includes(friendId)) throw httpErrors.BadRequest('The user is no longer your friend')

    const friend = await User.findById(friendId)
    if (!friend) throw httpErrors.NotFound('Cannot find the user')

    // STEP1: Delete friend from user's friends
    try {
        user.friends.pull(friendId)
        await user.save()
    } catch (err) {
        throw httpErrors.InternalServerError('Could not delete the user from friends')
    }

    // STEP2: Delete user from friend's friends
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

    // ?
    // STEP3: Check user's todolists shared with friend and edit members
    for(const todolistId of user.todolists) {
        const sharedList = await Todolist.find({ _id: todolistId, members: { _id: {$in: [user._id, friendId]} }})
        // check if there is any other members with admin right
        let otherMemberIsAdmin = false
        for(const m of sharedList.members) {
            if (m.isAdmin && m._id !== user._id && m._id !== friendId) {
                otherMemberIsAdmin = true
            }
        }
        // If user is owner and no one else sharing the todolist is admin, delete friend from member
        if(sharedList.owner === user._id && !otherMemberIsAdmin) {
            sharedList.members.pull(friend)
        }

        // If friend is owner and no one else sharing the todolist is admin, delete user from member
        if (sharedList.owner === friendId && !otherMemberIsAdmi) {
            sharedList.members.pull(user)
        }

        sharedList.save()
    }  

    res.status(200).json(user.friends)
}