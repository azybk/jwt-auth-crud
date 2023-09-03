const express = require('express')
const router = express.Router()

const { getUsers, register, login, logout } = require('../controllers/users')
const verifyToken = require('../middleware/VerifyToken')
const refreshToken = require('../controllers/refreshToken')

router.get('/users', verifyToken, getUsers)
router.post('/users', register)
router.post('/login', login)
router.get('/token', refreshToken)
router.delete('/logout', logout)

module.exports = {
    router
}