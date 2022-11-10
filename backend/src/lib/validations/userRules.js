import { body } from 'express-validator'
import validate from '../middlewares/validation.js'

export const updateProfile = [
    body('username').trim(),
    body('name').optional().isString(),
    body('avatar').optional().isString(),
    validate
]