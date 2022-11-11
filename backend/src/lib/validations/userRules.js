import { body } from 'express-validator'
import User from '../../models/User.js'
import validate, { validatePassword } from '../middlewares/validation.js'

export const updateProfile = [
    body('username').trim(),
    body('username').optional().isString(),
    body('avatar').optional().isString(),
    validate
]

export const changePassword = [
    body('password').isString(),
    body('newPassword').isStrongPassword().withMessage('New password is not strong enough'),
    validate,
    validatePassword
]