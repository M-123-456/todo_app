import httpErrors from 'http-errors'
import bcrypt from 'bcrypt'

import User from '../models/User.js'

/** @type {import("express").RequestHandler} */
export const signup = async (req, res) => {
  const user = await new User(req.body)
  const token = await user.generateToken()
  await user.save()

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax'
  }

  res
    .cookie('token', token, cookieOptions)
    .status(201)
    .json(user)
}

/** @type {import("express").RequestHandler} */
export const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findByEmail(email)

  if (!user) throw httpErrors.Unauthorized('Email or password incorrect')

  const correctPassword = await bcrypt.compare(password, user.password)

  if (!correctPassword) throw httpErrors.Unauthorized('Email or password incorrect')

  const token = await user.generateToken()
  await user.save()

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax'
  }

  res
    .cookie('token', token, cookieOptions)
    .status(200)
    .json(user)
}

/** @type {import("express").RequestHandler} */
export const logout = async (req, res) => {
  const user = req.user
  const token = req.cookies.token

  user.tokens.pull(token)
  await user.save()

  res
    .clearCookie('token')
    .status(204).json()
}

/** @type {import("express").RequestHandler} */
export const deleteAccount = async (req, res) => {
  const user = req.user

  await User.deleteOne().where('_id').equals(user._id)

  res
    .clearCookie('token')
    .status(202).json()
}
