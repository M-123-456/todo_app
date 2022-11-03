import User from '../models/User.js'
import httpErrors from 'http-errors'

export const signup = async (req, res) => {
    const newUser = await new User(req.body)
    newUser.save()
    res.json(newUser)
}

export const login = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username: username })
    if(!user) throw httpErrors.NotFound()

    if(user.password === password) {
        res.status(200).json('successfully logged in')
    } else {
        throw httpErrors.Unauthorized()
    }
}
