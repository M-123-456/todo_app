import express from 'express'
import 'express-async-errors'

import * as controller from '../controllers/userController.js'

const router = express.Router()

router.route('/:id')
    // Get user data by Id
    .get(controller.getUserById)
    // Update user data
    .patch(controller.updateUser)
    // Delete user
    .delete(controller.deleteUser)

export default router