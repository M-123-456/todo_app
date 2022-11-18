import { validationResult } from 'express-validator'
import httpErrors from 'http-errors'
import bcrypt from 'bcrypt'

import User from '../../models/User.js'

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(error => { return { [error.param]: error.msg } })
    throw httpErrors.BadRequest(formattedErrors)
  }
  next()
}

export const validatePassword = async (req, res, next) => {
  const user = req.user
  const correctPassword = await bcrypt.compare(req.body.password, user.password)
  if (!correctPassword) throw httpErrors.Unauthorized()
  next()
}

export const isFriend = async (req, res, next) => {
  const user = req.user
  const memberId = req.body.memberId
  
  if (user._id.valueOf() === memberId) throw httpErrors.BadRequest('You are trying to add yourself!')

  // Check if the new member already exists in user's friends
  if (!user.friends.includes(memberId)) throw httpErrors.BadRequest('You are not authorized to add this user. Please become friends first!')

  // Search for member by id and throw an error, if it cannot be found
  const member = await User.findById(memberId)
  if (!member) throw httpErrors.NotFound('User cannot be found')

  next()
}

export const memberExists = async (req, res, next) => {
  const memberId = req.body.memberId

  // Search for member by id and throw an error, if it cannot be found
  const member = await User.findById(memberId)
  if (!member) throw httpErrors.NotFound('User cannot be found')

  req.member = member

  next()
}

export const isMember = async (req, res, next) => {
  const member = req.member
  const todolist = req.todolist

  const isAlreadyMember = !!todolist.members.find(m => {
    return m._id.valueOf() === member._id.valueOf()
  })

  req.isMember = isAlreadyMember
  next()
}

export default validate
