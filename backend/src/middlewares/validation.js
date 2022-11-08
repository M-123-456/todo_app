import { validationResult } from 'express-validator'
import httpErrors from 'http-errors'

export const validateInputs = (rules) => {
    return [
        ...rules,
        (req, res, next) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const formattedErrors = errors.array().map(error => { return { [error.param]: error.msg } })
                throw httpErrors.BadRequest(formattedErrors)
            }
            next()
        }
    ]
}

