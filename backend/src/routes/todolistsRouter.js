import express from 'express'
import 'express-async-errors'

import * as controller from '../controllers/todolistController.js'

const router = express.Router()

router.route('/')
    .get(controller.getAllTodolists)
    .post(controller.createTodolist)

router.route('/:id')
    .get(controller.getTodolistById)
    .patch(controller.updateTodoList)

export default router
