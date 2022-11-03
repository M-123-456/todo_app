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
    const todolistCount = await Todolist.find({ user: userId }).count()

    const newTodolist = await Todolist.create({
        user: userId,
        position: todolistCount > 0 ? todolistCount : 0
    })
    res.status(201).send(newTodolist)
}

// Get todolist by id of todolist
/** @type {import("express").RequestHandler} */
export const getTodolistById = async (req, res) => {

}

// Update todolist
/** @type {import("express").RequestHandler} */
export const updateTodoList = async (req, res) => {

}
