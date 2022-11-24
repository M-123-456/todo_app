import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import httpErrors from 'http-errors'
import cookieParser from 'cookie-parser'

import './src/db/db.js'
import accountRoute from './src/routes/accountRouter.js'
import usersRoute from './src/routes/usersRouter.js'
import todolistsRoute from './src/routes/todolistsRouter.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

// Cors
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true
}
app.use(cors(corsOptions))

// Routes
app.use('/api/v1/account', accountRoute)
app.use('/api/v1/user', usersRoute)
app.use('/api/v1/todolists', todolistsRoute)

// 404 error handling
app.use((req, res, next) => {
  throw httpErrors.NotFound()
})

// General error handling
app.use((error, req, res, next) => {
  res.status(error.status || 505).json([{ message: error.message }])
})

app.listen(process.env.PORT, () => {
  console.log('Listening on server....')
})
