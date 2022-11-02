import mongoose from 'mongoose'

const todolistSchema = mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    icon: { type: String, default: '📝'},
    title: { type: String, required: true },
    todos: [{ type: mongoose.Types.ObjectId }],
    position: { type: Number }
})

const Todolist = mongoose.model('Todolist', todolistSchema)

export default Todolist