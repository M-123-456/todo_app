import express from 'express'
import 'express-async-errors'
import * as validations from '../lib/validations/authRules.js'

import * as controller from '../controllers/authController.js'

const router = express.Router()

// Sign up
router.post(
    '/signup', 
    ...validations.signup, 
    controller.signup
)

// Login
router.post(
    '/login', 
    ...validations.login, 
    controller.login
)


export default router