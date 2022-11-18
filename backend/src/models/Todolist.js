import mongoose from 'mongoose'

const Schema = mongoose.Schema({
  owner: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  icon: { type: String, default: '📝' },
  title: { type: String, default: '' },
  position: { type: Number },
  todos: [{
    todo: { type: String, unique: true },
    isCompleted: { type: Boolean, default: false, required: true }
  }],
  members: [{
    _id: { type: mongoose.Types.ObjectId, ref: 'User' },
    isAdmin: { type: Boolean, default: false }
  }]
})

const Todolist = mongoose.model('Todolist', Schema, 'todolists')

export default Todolist
