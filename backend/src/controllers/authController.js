import User from '../models/User.js'
import httpErrors from 'http-errors'

/** @type {import("express").RequestHandler} */
export const signup = async (req, res) => {
    const newUser = await User.create(req.body)
    res.status(201).json(newUser)
}

/** @type {import("express").RequestHandler} */
export const login = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username: username })
    if(!user) throw httpErrors.NotFound()

    if(user.password === password) {
        res.status(200).json('successfully logged in')
    } else {
        throw httpErrors.Unauthorized()
    }
}

/** @type {import("express").RequestHandler} */
export const getUserById = async (req, res) => {
    
}
