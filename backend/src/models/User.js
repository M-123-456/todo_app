import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import httpErrors from 'http-errors'

const Schema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  password: { type: String, required: true },
  todolists: [{ type: mongoose.Types.ObjectId, ref: 'Todolist' }],
  friends: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  sentFriendRequests: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  receivedFriendRequests: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  tokens: [String]
})

// hash password before saving, if password is modified
Schema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10)
  }
  next()
})

// define response data
Schema.methods.toJSON = function () {
  const user = this
  const result = {
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    todolists: user.todolists,
    friends: user.friends,
    sentFriendRequests: user.sentFriendRequests,
    receivedFriendRequests: user.receivedFriendRequests
  }
  return result
}

Schema.methods.generateToken = function () {
  const user = this
  // Go through the existing tokens and if expired, delete
  user.tokens.forEach(token => {
    const verified = jwt.verify(token, process.env.SECRET_KEY, (err, verified) => (err ? null : verified))
    if (!verified) user.tokens.pull(token)
  })
  // create new token and push to tokens
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' })
  user.tokens.push(token)

  return token
}

Schema.statics.findByName = function (username) {
  return User.findOne().where('username').equals(username)
}

Schema.statics.findByEmail = function (email) {
  return User.findOne().where('email').equals(email)
}

Schema.statics.findByToken = function (token) {
  const verified = jwt.verify(token, process.env.SECRET_KEY, (err, verified) => {
    if (err) {
      throw httpErrors.Unauthorized()
    }
    return verified
  })

  return User.findById(verified._id).where('tokens').equals(token)
}

const User = mongoose.model('User', Schema, 'users')

export default User
