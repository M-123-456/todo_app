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

Schema.statics.findByName = async function(username) {
    return await User.findOne().where('username').equals(username)
}

Schema.pre('save', async function() {
    const user = this
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
})

Schema.methods.generateToken = function() {
    const user = this
    user.token = Math.random().toString(36).slice(2, 7)
}

const User = mongoose.model('User', Schema)

export default User