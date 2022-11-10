import httpErrors from 'http-errors'
import bcrypt from 'bcrypt'

import User from '../models/User.js'

/** @type {import("express").RequestHandler} */
export const signup = async (req, res) => {
    const user = await new User(req.body)
    await user.generateToken()
    await user.save()
    res.status(201).json(user)
}

/** @type {import("express").RequestHandler} */
export const login = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findByName(username)

    if (!user) throw httpErrors.Unauthorized()

    const correctPassword = await bcrypt.compare(password, user.password)

    if (!correctPassword) throw httpErrors.Unauthorized()

    await user.generateToken()
    await user.save()

    res.status(200).send(user.token)
}

/** @type {import("express").RequestHandler} */
export const logout = async (req, res) => {
    const user = req.user

    user.token = undefined

    await user.save()

    res.status(204)
}

//todo 
/** @type {import("express").RequestHandler} */
export const deleteAccount = async (req, res) => {
    const user = req.user


    res.status(200).send("Successfully deleted")
}



