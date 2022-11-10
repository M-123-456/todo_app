import mongoose from 'mongoose'

const Schema = mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    icon: { type: String, default: '📝'},
    title: { type: String, default: 'My Todolist' },
    position: { type: Number },
    todos: [{
        todo: { type: String },
        isCompleted: { type: Boolean, default: false, required: true },
    }],
    sharingMembers: [{ type: mongoose.Types.ObjectId, ref: 'User'}]
})

const Todolist = mongoose.model('Todolist', Schema)

export default Todolist