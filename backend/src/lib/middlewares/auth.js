import httpErrors from 'http-errors'
import User from '../../models/User.js'

const auth = async (req, res, next) => {
    const token = req.headers['x-auth']

    if(!token) throw httpErrors.Unauthorized()

    const user = await User.findByToken(token)

    if(!user) throw httpErrors.Unauthorized()

    req.user = user
    next()
}

export default auth