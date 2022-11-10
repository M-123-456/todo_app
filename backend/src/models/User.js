import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const Schema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    avatar: { type: String },
    password: { type: String, required: true },
    todolists: [{ type: mongoose.Types.ObjectId, ref: 'Todolists' }],
    friends: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    sentFriendRequests: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    receivedFriendRequests: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    token: String
})

// hash password before saving, if password is modified
Schema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})

// define response data
Schema.methods.toJSON = function () {
    const user = this
    const result = {
        username: user.username,
        avatar: user.avatar,
        todolists: user.todolists,
        friends: user.friends,
        sentFriendRequests: user.sentFriendRequests,
        receivedFriendRequests: user.receivedFriendRequests
    }
    return result
}

Schema.methods.generateToken = function () {
    const user = this
    user.token = Math.random().toString(36).slice(2, 7)
}

Schema.statics.findByName = async function(username) {
    return await User.findOne().where('username').equals(username)
}

Schema.statics.findByToken = async function(token) {
    return await User.findOne().where('token').equals(token)
}


const User = mongoose.model('User', Schema)

export default User