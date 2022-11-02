import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import './src/config/config.js'


// Connect to db
try {
    mongoose.connect(process.env.DB_URL)
    console.log('Connecting to db...')
} catch (err) {
    console.log('Something went wrong with connecgtion to db')
}

const app = express()

app.use(express.json())

// Cors
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// Routes


// 404 error handling
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' })
})

// General error handling
app.use((error, req, res, next) => {
    res.status(error.status || 505).json({ message: error.message })
})


app.listen(process.env.PORT, () => {
    console.log('Listening on server....')
})

