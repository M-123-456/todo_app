import express from 'express'
import 'express-async-errors'

import * as controller from '../controllers/usersController.js'
import auth from '../lib/middlewares/auth.js'
import * as validations from '../lib/validations/userRules.js'

const router = express.Router()

router.get('/:id', auth, controller.getUser)

router.patch(
    '/:id/update-profile',
    auth,
    validations.updateProfile,
    controller.updateProfile
)

router.patch(
    '/:id/change-password', 
    auth, 
    validations.changePassword, 
    controller.changePassword
)

router.delete('/:id/delete', auth, controller.deleteAccount)

// FRIENDS //
router.get('/:id/friends', auth, controller.getAllFriends)
router.patch('/:id/add-friend', auth, controller.addFriend)
router.patch('/:id/delete-friend', auth, controller.deleteFriend)

// FRIEND REQUESTS //
router.get('/:id/sent-friend-requests', auth, controller.getSentFriendRequests)
router.get('/:id/received-friend-requests', auth, controller.getReceivedFriendRequests)

router.patch('/:id/send-friend-request', auth, controller.sendFriendRequest)
router.patch('/:id/cancel-friend-request', auth, controller.cancelFriendRequest)

export default router