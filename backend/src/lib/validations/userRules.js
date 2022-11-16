import { body } from 'express-validator'
import validate, { validatePassword } from '../middlewares/validation.js'

export const updateProfile = [
    body('username').trim().optional().isString(),
    body('avatar').optional().isString(),
    validate
]

export const changePassword = [
    body('password').isString(),
    body('newPassword').isStrongPassword().withMessage('New password is not strong enough'),
    validate,
    validatePassword
]

