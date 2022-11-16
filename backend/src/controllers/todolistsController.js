import Todolist from "../models/Todolist.js"
import User from '../models/User.js'
import httpErrors from 'http-errors'

/** @type {import("express").RequestHandler} */
export const getAllTodolists = async (req, res) => {
    let user = req.user

    const todolists = await Todolist.find().where('user').equals(user._id)

    res.status(200).send(todolists)
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
            owner: user._id,
            // position new todolist at the end
            position: todolistCount > 0 ? todolistCount : 0,
            members: [{
                isEdit: true,
                isAdmin: true
            }]
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

/** @type {import("express").RequestHandler} */
export const getTodolistById = async (req, res) => {
    const listId = req.params.listId
    const todolist = await Todolist.findById(listId)

    res.status(200).send(todolist)
}

// Update of icon, title
/** @type {import("express").RequestHandler} */
export const updateTodoList = async (req, res) => {
    const listId = req.params.listId

    const todolist = await Todolist.findById(listId)

    for (const key in req.body) {
        todolist[key] = req.body[key]
    }
    await todolist.save()

    res.status(200).send(todolist)
}

// SHARING MEMBERS //
/** @type {import("express").RequestHandler} */
export const getMembers = async (req, res) => {
    const listId = req.params.listId

    const todolist = await Todolist.findById(listId)

    res.status(200).send(todolist.members)
}

/** @type {import("express").RequestHandler} */
export const addMembers = async (req, res) => {
    const user = req.user
    const member = req.member
    const listId = req.params.listId

    const todolist = await Todolist.findById(listId)

    // If the 'member' is already sharing the todolist, respond with below message
    if (todolist.members.includes(member._id)) return res.status(200).send('The user is already sharing the todolist')

    // STEP1: Add member
    if (!todolist.members.includes(member._id)) {
        try {
            todolist.members.push(member)
            await todolist.save()
        } catch (err) {
            throw httpErrors.InternalServerError('Could not add the user to the sharing members of the todo list')
        }
    }

    // STEP2: Add todolist to member
    if (!member.todolists.includes(listId)) {
        try {
            member.todolists.push(listId)
            await member.save()
        } catch (err) {
            // If error occurs, cancel STEP1 and send error
            todolist.members.pull(member)
            await todolist.save()
            throw httpErrors.InternalServerError('Could not share the todolist with the selected friend')
        }
    }

    res.status(200).json(todolist.members)
}

// Delete sharingMembers
/** @type {import("express").RequestHandler} */
export const deleteMembers = async (req, res) => {
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


