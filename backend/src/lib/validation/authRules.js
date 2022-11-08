import { body } from 'express-validator'
import User from '../../models/User.js'


export const loginValidationRules = [
    body('username')
        .isLength({ min: 4 })
        .withMessage('User name should have more than 4 letters'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password should have more than 8 letters')
]

export const signupValidationRules = [
    body('username')
        .isLength({ min: 4 })
        .withMessage('User name should have more than 4 letters'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password should have more than 8 letters'),
    body('username').custom(async (name) => {
        return await User.findOne({ username: name })
            .then(user => {
                if (user) {
                    return Promise.reject('This user name exists already')
                }
            })
    })
]