import httpErrors from 'http-errors'
import User from '../../models/User.js'

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

    // ?
    if (!user.todolists.includes(listId)) throw httpErrors.Unauthorized('You are not authorized to view this todolist')

    next()
}


export default auth