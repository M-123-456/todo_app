import User from '../models/User.js'

const signup = async (req, res) => {
    const newUser = await new User(req.body)
    newUser.save()
    res.json(newUser)
}

const login = (req, res) => {

}

export { signup, login }