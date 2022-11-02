import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    todolists: [{ type: mongoose.Types.ObjectId, ref: 'Todolists' }]
})

const User = mongoose.model('User', userSchema)

export default User