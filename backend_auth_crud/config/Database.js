const Sequelize  = require('sequelize')

const db = new Sequelize('auth_db', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = db