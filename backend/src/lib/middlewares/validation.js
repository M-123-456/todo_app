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
    if(!correctPassword) throw httpErrors.Unauthorized()
    next()
}

// ? Category
export const memberValidation = async (req, res, next) => {
    const user = req.user
    const memberId = req.body.memberId

    // Check if the new member already exists in user's friends
    if (!user.friends.includes(memberId)) throw httpErrors('You are not authorized to add this user. Please become friends first!')

    // Search for member by id and throw an error, if it cannot be found
    const member = await User.findById(memberId)
    if (!member) throw httpErrors.NotFound('User cannot be found')

    req.member = member

    next()
}

export default validate