import { body } from 'express-validator'
import validate from '../middlewares/validation.js'

export const update = [
  body('icon').trim().optional().isString(),
  body('title').optional().isString(),
  validate
]

export const addTodo = [
  body('todo').isString(),
  body('isComplete').isBoolean()
]

export const updateTodo = [
  body('_id').isString(),
  body('todo').isString(),
  validate
]

export const updateIsComplete = [
  body('_id').isString(),
  body('isComplete').isBoolean(),
  validate
]
