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

router.route('/:listId/members')
    .get(controller.getSharingMembers)
    .patch(controller.addSharingMembers)

router.delete('/:id/members/:memberId', )

export default router
