import express from 'express'
import 'express-async-errors'
import auth from '../lib/middlewares/auth.js'
import * as validations from '../lib/validations/authRules.js'
import * as controller from '../controllers/authController.js'

const router = express.Router()

router.post('/signup', ...validations.signup, controller.signup)

router.post('/login', ...validations.login, controller.login)

// userRouter?
router.post('/logout', auth, controller.logout)

export default router