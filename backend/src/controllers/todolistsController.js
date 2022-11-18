import mongoose from 'mongoose'
import httpErrors from 'http-errors'
import Todolist from '../models/Todolist.js'
import User from '../models/User.js'

/** @type {import("express").RequestHandler} */
export const getAllTodolists = async (req, res) => {
  const user = req.user

  const todolists = await Todolist.find().where('user').equals(user._id)

  res.status(200).json(todolists)
}

// Create a new todolist of the login user
/** @type {import("express").RequestHandler} */
export const createTodolist = async (req, res) => {
  const user = req.user

  const userId = mongoose.Types.ObjectId(user._id)

  // create new todolist
  let newTodolist
  try {
    // Get length of todolists of the user
    const todolistCount = await Todolist.findOne().where('user').equals(user._id).count()
    newTodolist = new Todolist({
      owner: user._id,
      // position new todolist at the end
      position: todolistCount > 0 ? todolistCount : 0,
      members: [{
        _id: userId,
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

  res.status(201).json(newTodolist)
}

/** @type {import("express").RequestHandler} */
export const getTodolistById = async (req, res) => {
  const todolist = req.todolist

  res.status(200).json(todolist)
}

// Update of icon, title
/** @type {import("express").RequestHandler} */
export const updateTodoList = async (req, res) => {
  const todolist = req.todolist

  for (const key in req.body) {
    todolist[key] = req.body[key]
  }
  await todolist.save()

  res.status(200).json(todolist)
}

/** @type {import("express").RequestHandler} */
export const deleteTodoList = async (req, res) => {
  const user = req.user
  const todolist = req.todolist

  // STEP1: delete todolist id from members todolists array
  try {
    todolist.members.forEach(async m => {
      const member = await User.findById(m._id)
      member.todolists.pull(todolist._id)
      await member.save()
    })
  } catch (err) {
    throw httpErrors.InternalServerError('Something went wrong! Please try later.')
  }

  // STEP2: delete todolist
  try {
    await Todolist.deleteOne().where('_id').equals(todolist._id)
  } catch (err) {
    // If error occurs, cancel STEP1 and throw error
    console.log(err)
    todolist.members.forEach(async m => {
      const member = await User.findById(m._id)
      member.todolists.push(todolist._id)
      await user.save()
    })
    throw httpErrors.InternalServerError('Something went wrong! Please try later.')
  }

  //! todolists not updated
  res.status(200).json(user.todolists)
}

// SHARING MEMBERS //
/** @type {import("express").RequestHandler} */
export const getMembers = async (req, res) => {
  const todolist = req.todolist

  res.status(200).json(todolist.members)
}

/** @type {import("express").RequestHandler} */
export const addMembers = async (req, res) => {
  const member = req.member
  const todolist = req.todolist
  const isMember = req.isMember
  // If the 'member' is already sharing the todolist, respond with below message
  if (isMember) throw httpErrors.BadRequest('The user is already sharing this todolist')
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
      // If error occurs, cancel STEP1 and json error
      todolist.members.pull(member)
      await todolist.save()
      throw httpErrors.InternalServerError('Could not share the todolist with the selected friend')
    }
  }

  res.status(200).json(todolist.members)
}

/** @type {import("express").RequestHandler} */
export const toggleAdminRight = async (req, res) => {
  const user = req.user
  const todolist = req.todolist
  const member = req.member
  const isMember = req.isMember

  if (member._id === user._id) throw httpErrors.BadRequest('You are trying to edit your admin right')

  if (!isMember) throw httpErrors.BadRequest('The user is not sharing this todolist')

  // If the 'member' is already sharing the todolist, respond with below message
  for (const m of todolist.members) {
    if (m._id.valueOf() === member._id.valueOf()) {
      m.isAdmin = !m.isAdmin
      todolist.save()
    }
  }
  res.status(200).json(todolist.members)
}

/** @type {import("express").RequestHandler} */
export const deleteMembers = async (req, res) => {
  const todolist = req.todolist
  const member = req.member
  const isMember = req.isMember

  // If 'member' is not the member of todolist, send error
  if (!isMember) throw httpErrors.BadRequest('The user is not sharing this todolist')

  // STEP1: Remove member
  try {
    todolist.members.pull(member)
    await todolist.save()
  } catch (err) {
    throw httpErrors.InternalServerError('Could not add the user to the sharing members of the todo list')
  }

  // STEP2: Remove todolist from member's todolist
  if (member.todolists.includes(todolist)) {
    try {
      member.todolists.pull(todolist)
      await member.save()
    } catch (err) {
      // if error occurs, cancel STEP1 and json error
      todolist.members.push(member)
      await todolist.save()
      throw httpErrors.InternalServerError('Could not share the todolist with the selected friend')
    }
  }

  res.status(200).json(todolist.members)
}
