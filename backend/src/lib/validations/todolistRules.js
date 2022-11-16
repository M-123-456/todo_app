import { body } from 'express-validator'
import validate from '../middlewares/validation.js'

export const update = [
    body('icon').trim().optional().isString(),
    body('title').optional().isString(),
    validate
]

