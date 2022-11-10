import { validationResult } from 'express-validator'
import httpErrors from 'http-errors'

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(error => { return { [error.param]: error.msg } })
        throw httpErrors.BadRequest(formattedErrors)
    }
    next()
}

export default validate