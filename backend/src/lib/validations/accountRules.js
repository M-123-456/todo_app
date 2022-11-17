import { body } from 'express-validator'
import httpErrors from 'http-errors'

import User from '../../models/User.js'
import validate from '../middlewares/validation.js'

export const signup = [
  body('username')
    .trim()
    .isString().withMessage('User name must be a string')
    .custom(async (name) => {
      const user = await User.findByName(name)
      if (user) {
        throw httpErrors.Unauthorized('Please choose other name')
      }
    }),
  body('email')
    .normalizeEmail()
    .isEmail()
    .custom(async email => {
      const user = await User.findByEmail(email)
      if (user) {
        throw httpErrors.Unauthorized('Please choose other email')
      }
    }),
  body('password')
    .isStrongPassword().withMessage('Password not strong enough'),
  validate
]

export const login = [
  body('email')
    .normalizeEmail()
    .isEmail(),
  body('password')
    .isString(),
  validate
]
