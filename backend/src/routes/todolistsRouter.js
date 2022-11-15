import express from 'express'
import 'express-async-errors'

import auth, { authSingleTodolist } from '../lib/middlewares/auth.js'
import * as controller from '../controllers/todolistsController.js'

const router = express.Router()

// All todolists
router.route('/')
    .get(auth, controller.getAllTodolists)
    .post(auth, controller.createTodolist)

// Single todolist
router.route('/:listId')
    .get(auth, authSingleTodolist, controller.getTodolistById)
    .patch(auth, authSingleTodolist, controller.updateTodoList)


// Single todolist > sharedMembers
router.get('/:listId/members', auth, authSingleTodolist, controller.getSharingMembers)
router.patch('/:listId/add-members', auth, authSingleTodolist, controller.addSharingMembers)
router.patch('/:listId/delete-members', auth, authSingleTodolist, controller.deleteSharingMembers)

export default router
