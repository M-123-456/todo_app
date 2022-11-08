import express from 'express'
import 'express-async-errors'
import { validateInputs } from '../middlewares/validation.js'
import { loginValidationRules, signupValidationRules } from '../lib/validation/authRules.js'

import * as controller from '../controllers/authController.js'

const router = express.Router()

// Sign up
router.post('/signup', validateInputs(signupValidationRules), controller.signup)

// Login
router.post('/login', validateInputs(loginValidationRules), controller.login)


export default router