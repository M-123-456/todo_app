import express from 'express'
import 'express-async-errors'
import { userSignupValidationRules, userLoginValidationRules, validate } from '../middlewares/validation.js'

import * as controller from '../controllers/authController.js'

const router = express.Router()

// Sign up
router.post('/signup', userSignupValidationRules(), validate, controller.signup)

// Login
router.post('/login', userLoginValidationRules(), validate, controller.login)


export default router