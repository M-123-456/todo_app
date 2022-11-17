import mongoose from 'mongoose'
import '../config/config.js'

// Connect to db
try {
  mongoose.connect(process.env.DB_URL)
  console.log('Connecting to db...')
} catch (err) {
  console.log('Something went wrong with connecgtion to db')
}
