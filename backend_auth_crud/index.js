const db = require('./config/Database')
// const users = require('./models/userModel')
const { router } = require('./routes/index')

const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')

dotenv.config()
const app = express()
const port = 5000

try {
    db.authenticate()
    console.log('Database Connected...')
    // users.sync()

} catch(err) {
    console.error(err)
}

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(cookieParser())
app.use(express.json())
app.use(router)

app.listen(port, () => {
    console.log('Server is running...')
})