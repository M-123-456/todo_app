import express from 'express'
import 'express-async-errors'

import * as controller from '../controllers/usersController.js'
import auth from '../lib/middlewares/auth.js'
import { validatePassword } from '../lib/middlewares/validation.js'
import * as validations from '../lib/validations/userRules.js'

const router = express.Router()

router.get('/:id', auth, controller.getUser)
router.patch(
    '/:id/change-profile',
    auth,
    validations.updateProfile,
    controller.updateProfile
)
router.patch('/:id/change-password', auth, validatePassword, controller.changePassword)
router.delete('/:id/delete', auth, controller.deleteFriend)

// FRIENDS //
router.get('/:id/friends', auth, controller.getAllFriends)
router.patch('/:id/friends/add', auth, controller.addFriend)
router.patch('/:id/friends/delete', auth, controller.deleteFriend)

// FRIEND REQUESTS //
router.get('/:id/friend-requests', auth, controller.getAllFriendRequests)
router.patch('/:id/friend-requests/send', auth, controller.sendFriendRequest)
router.patch('/:id/friends-requests/cancel', auth, controller.cancelFriendRequest)

export default router