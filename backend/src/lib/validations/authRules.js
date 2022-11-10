import { body } from 'express-validator'

import User from '../../models/User.js'
import validate from '../middlewares/validation.js'

export const signup = [
    body('username').trim(),
    body('username')
        .isString().withMessage('User name must be a string'),
    body('password')
        .isStrongPassword().withMessage('Password not strong enough'),
    // If user with the input name exists, throw error
    body('username').custom(async (name) => {
        const user = await User.findOne({ username: name })
        if (user) {
            return Promise.reject('Please choose other name')
        }

    }),
    validate
]

export const login = [
    body('username')
        .trim()
        .isString()
        .withMessage('User name must be a string'),
    body('password')
        .isString(),
    validate
]
