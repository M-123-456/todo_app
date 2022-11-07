import express from 'express'
import 'express-async-errors'

import * as controller from '../controllers/todolistsController.js'

const router = express.Router()

// All todolists
router.route('/')
    .get(controller.getAllTodolists)
    .post(controller.createTodolist)

// Single todolist
router.route('/:listId')
    .get(controller.getTodolistById)
    .patch(controller.updateTodoList)

// Single todolist > todos
router.route('/:listId/todos')
    .get()
    .patch()

// Single todolist > sharedMembers
router.get('/:listId/members', controller.getSharingMembers)
router.patch('/:listId/members/add', controller.addSharingMembers)
router.patch('/:listId/members/delete', controller.deleteSharingMembers)


export default router
