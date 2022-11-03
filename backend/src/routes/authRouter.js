import express from 'express'
import 'express-async-errors'

import * as controller from '../controllers/authController.js'

const router = express.Router()

// Sign up
router.post('/signup', controller.signup)

// Login
router.post('/login', controller.login)


export default router