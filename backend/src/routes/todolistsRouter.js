import express from 'express'
import 'express-async-errors'

import auth from '../lib/middlewares/auth.js'
import * as controller from '../controllers/todolistsController.js'

const router = express.Router()

// All todolists
router.route('/')
    .get(auth, controller.getAllTodolists)
    .post(auth, controller.createTodolist)

// Single todolist
router.route('/:listId')
    .get(auth, controller.getTodolistById)
    .patch(auth, controller.updateTodoList)


// Single todolist > sharedMembers
router.get('/:listId/members', auth, controller.getSharingMembers)
router.patch('/:listId/add-members',auth, controller.addSharingMembers)
router.patch('/:listId/delete-members',auth, controller.deleteSharingMembers)

export default router
