import httpErrors from 'http-errors'
import User from '../../models/User.js'
import Todolist from '../../models/Todolist.js'

const auth = async (req, res, next) => {
    const token = req.headers['x-auth']

    if (!token) throw httpErrors.Unauthorized()

    const user = await User.findByToken(token)

    if (!user) throw httpErrors.Unauthorized()

    req.user = user
    req.token = token
    next()
}

export const authSingleTodolist = (req, res, next) => {
    const user = req.user
    const listId = req.params.listId

    if (!user.todolists.includes(listId)) throw httpErrors.Unauthorized('You are not authorized to view this todolist')

    next()
}

export const authAdmin = async (req, res, next) => {
    const user = req.user
    const listId = req.params.listId

    const todolist = await Todolist.findById(listId)

    if (!todolist) throw httpErrors.NotFound()

    let userIsAdmin = false
    for (const member of todolist.members) {
        //! objectId
        if (member._id.valueOf() === user._id.valueOf()) {
            userIsAdmin = member.isAdmin
        }
    }

    if (!userIsAdmin) throw httpErrors.Unauthorized('You are not allowed to edit members')

    req.todolist = todolist
    next()
}


export default auth