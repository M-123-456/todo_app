import { body } from 'express-validator'

import User from '../../models/User.js'
import validate from '../middlewares/validation.js'

export const signup = [
    // sanitizer
    body('username').trim(),
    // validators
    body('username')
        .isLength({ min: 4 })
        .withMessage('User name should have more than 4 letters'),
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
        // sanitizer
        .trim()
        // validators
        .isString()
        .withMessage('User name must be a string'),
    body('password')
        .isString(),
    validate
]
