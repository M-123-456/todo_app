import { body, validationResult } from 'express-validator'
import User from '../models/User.js'

export const validate = (req, res, next) => {
    const errors = validationResult(req)
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

export const userSignupValidationRules = () => {
    return [
        body('username')
            .isLength({ min: 4 })
            .withMessage('User name should have more than 4 letters'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password should have more than 8 letters'),
        body('username').custom(name => {
            return User.findOne({ username: name })
            .then(user => {
                if(user) {
                    return Promise.reject('This user name exists already')
                }
            })
        })
    ]
}

export const userLoginValidationRules = () => {
    return [
        body('username')
            .isLength({ min: 4 })
            .withMessage('User name should have more than 4 letters'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password should have more than 8 letters'),
        body('username').custom(name => {
            return User.findOne({ username: name })
                .then(user => {
                    if (!user) {
                        return Promise.reject('This user does not exist. Please check your input or sign up')
                    }
                })
        })
    ]
}

