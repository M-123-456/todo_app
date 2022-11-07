import express from 'express'
import 'express-async-errors'

import * as controller from '../controllers/usersController.js'

const router = express.Router()

router.route('/:id')
    // Get user data by Id
    .get(controller.getUserById)
    // Update user data
    .patch(controller.updateUser)
    // Delete user
    .delete(controller.deleteUser)

// Get all friends
router.get('/:id/friends', controller.getAllFriends)
// Add friend
router.patch('/:id/friends/add', controller.addFriend)
// Delete friend
router.patch('/:id/friends/delete', controller.deleteFriend)

// Get all friend requests
router.get('/:id/friends/requests', controller.getAllFriendRequests)
// Send friend request
router.patch('/:id/friends/requests/add', controller.sendFriendRequest)
// Cancel friend request
router.patch('/:id/friends/requests/delete', controller.cancelFriendRequest)



export default router