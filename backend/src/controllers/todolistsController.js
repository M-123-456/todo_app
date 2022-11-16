import mongoose from 'mongoose'
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

    const userId = mongoose.Types.ObjectId(user._id)

    // create new todolist
    let newTodolist;
    try {
        // Get length of todolists of the user
        const todolistCount = await Todolist.findOne().where('user').equals(user._id).count()

        newTodolist = new Todolist({
            owner: user._id,
            // position new todolist at the end
            position: todolistCount > 0 ? todolistCount : 0,
            members: [{
                _id: userId,
                isEdit: true,
                isAdmin: true
            }]
        })

        await newTodolist.save()
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

// ! mongodb searching object in array
/** @type {import("express").RequestHandler} */
export const addMembers = async (req, res) => {
    const member = req.member
    const todolist = req.todolist

    // If the 'member' is already sharing the todolist, respond with below message
    let memberIsInMembers = false
    for(const m of todolist.members) {
        if(m._id.valueOf() === member._id.valueOf()) memberIsInMembers = true
    }
    if(memberIsInMembers) throw httpErrors.BadRequest('The user is already sharing this todolist')

    // STEP1: Add member
    try {
        todolist.members.push(member)
        await todolist.save()
    } catch (err) {
        throw httpErrors.InternalServerError('Could not add the user. Please try later!')
    }

    // STEP2: Add todolist to member
    if (!member.todolists.includes(todolist._id)) {
        try {
            member.todolists.push(todolist)
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

/** @type {import("express").RequestHandler} */
export const deleteMembers = async (req, res) => {
    const todolist = req.todolist
    const memberId = req.body.memberId    

    const member = await User.findById(memberId)
    if (!member) throw httpErrors.NotFound('User cannot be found')

    if(!todolist.members.includes(memberId)) {
        return res.status(200).send('The user is not a member of the todolist')
    }

    // STEP1: Remove member
    if (todolist.members.includes(memberId)) {
        try {
            todolist.members.pull(memberId)
            await todolist.save()
        } catch (err) {
            throw httpErrors.InternalServerError('Could not add the user to the sharing members of the todo list')
        }
    }

    // STEP2: Remove todolist from member's todolist
    if (member.todolists.includes(todolist)) {
        try {
            member.todolists.pull(todolist)
            await member.save()
        } catch (err) {
            // if error occurs, cancel STEP1 and send error
            todolist.members.push(memberId)
            await todolist.save()
            throw httpErrors.InternalServerError('Could not share the todolist with the selected friend')
        }
    }

    res.status(200).json(todolist.members)
}


