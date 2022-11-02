import mongoose from 'mongoose'

const todoSchema = mongoose.Schema({
    todo: { type: String },
    isCompleted: { type: Boolean, default: false, required: true },
})

const Todo = mongoose.model('Todo', todoSchema)

export default todoSchema