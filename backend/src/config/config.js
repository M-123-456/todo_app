import * as dotenv from 'dotenv'

const workdir = process.cwd()

if (process.env.NODE_ENV === 'production') {
    dotenv.config()
} else {
    dotenv.config({ path: `${workdir}/.env.dev`})
}