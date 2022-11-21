import express from 'express'
import 'express-async-errors'

import auth, { authSingleTodolist, authAdmin } from '../lib/middlewares/auth.js'
import * as controller from '../controllers/todolistsController.js'
import * as validations from '../lib/validations/todolistRules.js'
import * as validate from '../lib/middlewares/validation.js'

const router = express.Router()

// All todolists
router.route('/')
  .get(auth, controller.getAllTodolists)
  .post(auth, controller.createTodolist)

// Single todolist
router.route('/:listId')
  .get(auth, authSingleTodolist, controller.getTodolistById)
  .patch(auth, authSingleTodolist, validations.update, controller.updateTodoList)
  .delete(auth, authSingleTodolist, authAdmin, controller.deleteTodoList)

// Single todolist > todo
router.patch(
  '/:listId/add-todo', 
  auth, 
  authSingleTodolist,
  validations.addTodo,
  controller.addTodo
)
router.patch('/:listId/update-todo', auth, authSingleTodolist, validations.updateTodo, controller.updateTodo)
router.patch('/:listId/toggle-complete', auth, authSingleTodolist, validations.updateIsComplete, controller.toggleComplete)
router.patch('/:listId/delete-todo', auth, authSingleTodolist, controller.deleteTodo)
router.delete(':/listId/delete-all-todos', auth, authSingleTodolist, controller.deleteAllTodos)

// Single todolist > members
router.get(
  '/:listId/members',
  auth,
  authSingleTodolist,
  controller.getMembers
)

router.patch(
  '/:listId/add-member',
  auth,
  authSingleTodolist,
  authAdmin,
  validate.isFriend,
  validate.memberExists,
  validate.isMember,
  controller.addMembers
)

router.patch(
  '/:listId/update-admin-member',
  auth,
  authSingleTodolist,
  authAdmin,
  validate.memberExists,
  validate.isMember,
  controller.toggleAdminRight
)

router.patch(
  '/:listId/delete-member',
  auth,
  authSingleTodolist,
  authAdmin,
  validate.memberExists,
  controller.deleteMembers
)

// todo Get out of the todolist group
router.patch(
  '/:listId/cencel-membership',
  auth, 
  authSingleTodolist
)

export default router
