import Todolist from "../models/Todolist.js"
import User from '../models/User.js'
import httpErrors from 'http-errors'

// Get all todolists of the login user
/** @type {import("express").RequestHandler} */
export const getAllTodolists = async (req, res) => {
    let user = req.user
    
    //! 
    user = await user.populate('todolists')

    res.status(200).send(user.todolists)
}

// Create a new todolist of the login user
/** @type {import("express").RequestHandler} */
export const createTodolist = async (req, res) => {
    const user = req.user

    // create new todolist
    let newTodolist;
    try {
        // Get length of todolists of the user
        const todolistCount = await Todolist.findOne().where('user').equals(user._id).count()

        newTodolist = await Todolist.create({
            user: user._id,
            // position new todolist at the end
            position: todolistCount > 0 ? todolistCount : 0
        })
    } catch (err) {
        throw httpErrors.InternalServerError('Todolist could not be created. Please try later!')
    }

    // Add todolist to user
    try {
        user.todolists.push(newTodolist)
        await user.save()
    } catch (err) {
        await Todolist.deleteOne({ _id: newTodolist._id })
        throw httpErrors.InternalServerError('Todolist could not be created. Please try later!')
    }

    res.status(201).send(newTodolist)
}

// Get todolist by id of todolist
/** @type {import("express").RequestHandler} */
export const getTodolistById = async (req, res) => {
    const id = req.params.listId

    const todolist = await Todolist.findById(id).populate('todos', '-_id -__v')
    if (!todolist) throw httpErrors.NotFound()

    res.status(200).send(todolist)
}

// Update todolist (icon, title, position)
/** @type {import("express").RequestHandler} */
export const updateTodoList = async (req, res) => {
    const id = req.params.listId

    const todolist = await Todolist.findById(id)
    if (!todolist) throw httpErrors.NotFound()

    for (const key in req.body) {
        todolist[key] = req.body[key]
    }
    await todolist.save()

    res.status(200).send(todolist)
}

// Get sharingMembers
/** @type {import("express").RequestHandler} */
export const getSharingMembers = async (req, res) => {
    const id = req.params.listId

    const todolist = await Todolist.findById(id)
    if (!todolist) throw httpErrors.NotFound()

    res.status(200).send(todolist.sharingMembers)
}

// Add sharingMembers
/** @type {import("express").RequestHandler} */
export const addSharingMembers = async (req, res) => {
    const listId = req.params.listId
    const memberId = req.body.memberId

    // Search for todolist and member by id and throw an error, if one of them cannot be found
    const todolist = await Todolist.findById(listId)
    if (!todolist) throw httpErrors.NotFound()

    const member = await User.findById(memberId)
    if (!member) throw httpErrors.NotFound('User cannot be found')

    // Add member in sharingMembers, if the members are not in list yet
    if (!todolist.sharingMembers.includes(memberId)) {
        try {
            todolist.sharingMembers.push(memberId)
            await todolist.save()
        } catch (err) {
            throw httpErrors.InternalServerError('Could not add the user to the sharing members of the todo list')
        }
    }

    // Add todolist to member
    if (!member.todolists.includes(listId)) {
        try {
            member.todolists.push(listId)
            await member.save()
        } catch (err) {
            throw httpErrors.InternalServerError('Could not share the todolist with the selected friend')
        }
    }

    res.status(200).json(todolist.sharingMembers)
}

// Delete sharingMembers
/** @type {import("express").RequestHandler} */
export const deleteSharingMembers = async (req, res) => {
    const listId = req.params.listId
    const memberId = req.body.memberId

    // Search for todolist and member by id and throw an error, if one of them cannot be found
    const todolist = await Todolist.findById(listId)
    if (!todolist) throw httpErrors.NotFound()

    const member = await User.findById(memberId)
    if (!member) throw httpErrors.NotFound('User cannot be found')

    // Remove member in sharingMembers, if the members are in list
    if (todolist.sharingMembers.includes(memberId)) {
        try {
            todolist.sharingMembers.pull(memberId)
            await todolist.save()
        } catch (err) {
            throw httpErrors.InternalServerError('Could not add the user to the sharing members of the todo list')
        }
    }

    // Remove todolist from member's todolist, if list exists in the members todolists
    if (member.todolists.includes(listId)) {
        try {
            member.todolists.pull(listId)
            await member.save()
        } catch (err) {
            throw httpErrors.InternalServerError('Could not share the todolist with the selected friend')
        }
    }

    res.status(200).json(todolist.sharingMembers)
}


