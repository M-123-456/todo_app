import express from 'express'
import 'express-async-errors'

import * as controller from '../controllers/userController.js'

const router = express.Router()

router.route('/:id')
    // Get user data by Id
    .get(controller.getUserById)
    // Update user data
    .patch()
    // Delete user
    .delete()

export default router