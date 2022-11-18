import express from 'express'
import 'express-async-errors'

import * as controller from '../controllers/usersController.js'
import auth from '../lib/middlewares/auth.js'
import * as validations from '../lib/validations/userRules.js'

const router = express.Router()

router.get('/', auth, controller.getUser)

router.patch(
  '/update-profile',
  auth,
  validations.updateProfile,
  controller.updateProfile
)

router.patch(
  '/change-password',
  auth,
  validations.changePassword,
  controller.changePassword
)

// FRIEND REQUESTS //
router.get('/sent-friend-requests', auth, controller.getSentFriendRequests)
router.get('/received-friend-requests', auth, controller.getReceivedFriendRequests)

router.patch('/send-friend-request', auth, controller.sendFriendRequest)
router.patch('/cancel-friend-request', auth, controller.cancelFriendRequest)

router.patch('/accept-friend-request', auth, controller.acceptFriendRequest)
router.patch('/decline-friend-request', auth, controller.declineFriendRequest)

// FRIENDS //
router.get('/friends', auth, controller.getAllFriends)
router.patch('/delete-friend', auth, controller.deleteFriend)

export default router
