import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    avatar: { type: String },
    password: { type: String, required: true },
    todolists: [{ type: mongoose.Types.ObjectId, ref: 'Todolists' }],
    friends: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    friendRequests: [{ type: mongoose.Types.ObjectId, ref: 'User' }]
})

const User = mongoose.model('User', userSchema)

export default User