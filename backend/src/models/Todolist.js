import mongoose from 'mongoose'

const todolistSchema = mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    icon: { type: String, default: '📝'},
    title: { type: String, default: 'My Todolist' },
    position: { type: Number },
    todos: [{ type: mongoose.Types.ObjectId, ref: "Todo" }],
    sharingMembers: [{ type: mongoose.Types.ObjectId, ref: 'User'}]
})

const Todolist = mongoose.model('Todolist', todolistSchema)

export default Todolist