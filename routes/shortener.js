const Router = require('express').Router()
const ifLogged = require('./../middlewares/ifLogged')

Router.get('/', ifLogged, (req, res) => {
    res.render('index')
})

module.exports = Router