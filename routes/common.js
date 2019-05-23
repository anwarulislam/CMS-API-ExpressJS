const Router = require('express').Router()
//const userController = require('../controllers/userController')

Router.get('/c', (req, res) => {
    res.render('index')
})

module.exports = Router