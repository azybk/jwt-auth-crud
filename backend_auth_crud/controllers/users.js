const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getUsers = async(req, res) => {
    try {
        const result = await userModel.findAll({
            attributes: ['id', 'name', 'email']
        })
        res.json(result)

    } catch(err) {
        console.log(err)
    }
}

const register = async(req, res) => {
    const { name, email, password, confPassword } = req.body
    
    if(password !== confPassword) {
        return res.status(400).json({
            message: 'Password dan Confirm Password tidak sama'
        })
    }

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)

    try {
        await userModel.create({
            name: name,
            email: email,
            password: hashPassword
        })

        res.json({
            message: 'Register Berhasil'
        })

    } catch(err) {
        console.error(err)
    }
}

const login = async(req, res) => {
    try {
        const user = await userModel.findAll({
            where: {
                email: req.body.email
            }
        })

        const match = await bcrypt.compare(req.body.password, user[0].password)
        if(!match) {
            return res.status(400).json({
                message: 'Password Salah'
            })
        }

        const userId = user[0].id
        const name = user[0].name
        const email = user[0].email

        const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        })

        const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })

        await userModel.update({ refresh_token:  refreshToken}, {
            where: {
                id: userId
            }
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        res.json({
            accessToken
        })

    } catch(err) {
        res.status(404).json({
            message: 'Email tidak ditemukan'
        })
        // res.json(err.message)
    }
}

const logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.sendStatus(204)

    const user = await userModel.findAll({
        where: {
            refresh_token: refreshToken
        }
    })
    if(!user[0]) return res.sendStatus(204)

    const userid = user[0].id

    await userModel.update({refresh_token: null}, {
        where: {
            id: userid
        }
    })

    res.clearCookie('refreshToken')
    
    return res.sendStatus(200)
}

module.exports = { getUsers, register, login, logout }