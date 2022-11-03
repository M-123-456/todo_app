import express from 'express'
import 'express-async-errors'

import * as controller from '../controllers/todolistController.js'

const router = express.Router()

router.route('/')
    .get(controller.getAllTodolists)
    .post(controller.createTodolist)

router.route('/:listId')
    .get(controller.getTodolistById)
    .patch(controller.updateTodoList)

router.get('/:listId/members', controller.getSharingMembers)
// ? structure ?
router.patch('/:listId/members/add', controller.addSharingMembers)
router.patch('/:listId/members/delete', controller.deleteSharingMembers)


export default router
