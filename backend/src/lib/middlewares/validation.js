import { validationResult } from 'express-validator'
import httpErrors from 'http-errors'
import bcrypt from 'bcrypt'

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

export default validate