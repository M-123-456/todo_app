import Todolist from "../models/Todolist.js"
import httpErrors from 'http-errors'

// Get all todolists of the login user
/** @type {import("express").RequestHandler} */
export const getAllTodolists = async (req, res) => {
    const userId = req.body.user
    const todolists = await Todolist.find({ user: userId })
    res.status(200).send(todolists)
}

// Create a new todolist of the login user
/** @type {import("express").RequestHandler} */
export const createTodolist = async (req, res) => {
    const userId = req.body.user

    // Get length of todolists of the user
    const todolistCount = await Todolist.find({ user: userId }).count()

    const newTodolist = await Todolist.create({
        user: userId,
        // position new todolist at the end
        position: todolistCount > 0 ? todolistCount : 0
    })
    res.status(201).send(newTodolist)
}

// Get todolist by id of todolist
/** @type {import("express").RequestHandler} */
export const getTodolistById = async (req, res) => {
    const id = req.params.id

    const todolist = await Todolist.findById(id).populate('todos', '-_id -__v')
    if(!todolist) throw httpErrors.NotFound()

    res.status(200).send(todolist)
}

// Update todolist 
/** @type {import("express").RequestHandler} */
export const updateTodoList = async (req, res) => {
    const id = req.params.id
    const members = req.body.sharingMembers

    const todolist = await Todolist.findById(id)
    if (!todolist) throw httpErrors.NotFound()

    for (const key in req.body) {
        if(key !== 'sharingMembers') {
            todolist[key] = req.body[key]
        }
        for (const member of req.body.sharingMembers) {
            todolist.sharingMembers.push(member)
        }
    }
    await todolist.save()

    res.status(200).send(todolist)
}


