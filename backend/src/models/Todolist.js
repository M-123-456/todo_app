import mongoose from 'mongoose'

const Schema = mongoose.Schema({
    owner: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    icon: { type: String, default: '📝'},
    title: { type: String, default: '' },
    position: { type: Number },
    todos: [{
        todo: { type: String },
        isCompleted: { type: Boolean, default: false, required: true },
    }],
    members: [{
        id: { type: mongoose.Types.ObjectId, ref: 'User'},
        isEdit: { type: Boolean, default: true },
        isAdmin: { type: Boolean, default: false }
    }]
})

const Todolist = mongoose.model('Todolist', Schema, 'todolists')

export default Todolist