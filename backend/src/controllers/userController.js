import User from '../models/User.js'
import httpErrors from 'http-errors'

/** @type {import("express").RequestHandler} */
export const getUserById = async (req, res) => {
    const userId = req.params.id
    const user = await User.findById(userId).select('username todolists')
    if(!user) httpErrors.NotFound()

    res.status(200).send(user)
}