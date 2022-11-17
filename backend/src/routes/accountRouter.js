import express from 'express'
import 'express-async-errors'
import auth from '../lib/middlewares/auth.js'
import * as validations from '../lib/validations/accountRules.js'
import * as controller from '../controllers/accountController.js'

const router = express.Router()

router.post('/signup', ...validations.signup, controller.signup)

router.post('/login', ...validations.login, controller.login)

router.post('/logout', auth, controller.logout)

router.delete('/delete', auth, controller.deleteAccount)

export default router
