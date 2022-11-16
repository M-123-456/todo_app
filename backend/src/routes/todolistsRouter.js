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
    '/:listId/update-edit-member',
    auth,
    authSingleTodolist,
    authAdmin, 
    validate.memberExists,
    validate.isMember,
    controller.toggleEditRight
)

router.patch(
    '/:listId/delete-member', 
    auth, 
    authSingleTodolist,
    authAdmin,
    validate.memberExists,
    controller.deleteMembers
)

export default router
