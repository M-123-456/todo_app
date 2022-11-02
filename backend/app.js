import express from 'express'
import cors from 'cors'
import 'express-async-errors'

import './src/db/db.js'
import authRoute from './src/routes/auth.js'
import todolistRoute from './src/routes/todolist.js'

const app = express()

app.use(express.json())

// Cors
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// Routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/todolist', todolistRoute)

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

