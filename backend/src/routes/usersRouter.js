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

// FRIEND REQUESTS //
router.get('/:id/sent-friend-requests', auth, controller.getSentFriendRequests)
router.get('/:id/received-friend-requests', auth, controller.getReceivedFriendRequests)

router.patch('/:id/send-friend-request', auth, controller.sendFriendRequest)
router.patch('/:id/cancel-friend-request', auth, controller.cancelFriendRequest)

router.patch('/:id/accept-friend-request', auth, controller.acceptFriendRequest)
router.patch('/:id/decline-friend-request', auth, controller.declineFriendRequest)

// FRIENDS //
router.get('/:id/friends', auth, controller.getAllFriends)
router.patch('/:id/delete-friend', auth, controller.deleteFriend)




export default router