const Router = require('express').Router()
const userController = require('./../controllers/userController')
const ifNotLogged = require('./../middlewares/ifNotLogged')
const ifLogged = require('./../middlewares/ifLogged')


Router.get('/login', ifNotLogged, (req, res) => {
    res.render('auth/login')
})

Router.get('/logout', (req, res) => {
    req.session.user = null
    req.flash('success_msg', 'You have successfully logged out')
    res.redirect('/')
})

Router.post('/login', userController.login)

Router.get('/register', ifNotLogged, (req, res) => {
    res.render('auth/register')
})

Router.get('/settings', ifLogged, (req, res) => {
    res.render('auth/settings')
})

Router.post('/register', userController.register)

Router.get('/forget_password', (req, res) => {
    res.render('auth/forget')
})




module.exports = Router