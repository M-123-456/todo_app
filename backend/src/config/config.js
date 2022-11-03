import * as dotenv from 'dotenv'

const workdir = process.cwd()

if (process.env.NODE_ENV === 'production') {
    console.log('Production environment')
    dotenv.config()
} else {
    console.log('Development environment')
    dotenv.config({ path: `${workdir}/.env.dev`})
}