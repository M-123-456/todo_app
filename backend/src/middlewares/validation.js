import { body, validationResult } from 'express-validator'
import httpErrors from 'http-errors'


const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

