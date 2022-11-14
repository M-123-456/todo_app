import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const Schema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
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
        email: user.email,
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
    user.token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' })
}

Schema.statics.findByName = function (username) {
    return User.findOne().where('username').equals(username)
}

Schema.statics.findByEmail = function (email) {
    return User.findOne().where('email').equals(email)
}

Schema.statics.findByToken = function (token) {
    const verified = jwt.verify(token, process.env.SECRET_KEY)
    
    return User.findById(verified._id).where('token').equals(token)
}

const User = mongoose.model('User', Schema)

export default User