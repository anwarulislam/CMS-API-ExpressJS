const express = require('express')
const app = express()
const expressEjsLayouts = require('express-ejs-layouts')
const expressSession = require('express-session')
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser')
const flashConnect = require('connect-flash')

require('dotenv').config()
require('./dbconnect')

const User = require('./models/User')

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(expressValidator())
app.use(expressSession({
    secret: process.env.SECRET,
    resave: null,
    saveUninitialized: true
}))
app.use(cookieParser())
app.use(flashConnect())

app.use(async (req, res, next) => {
    app.locals.errors = req.flash('errors')

    req.isAuthenticated = req.session.user ? true : false

    if (req.isAuthenticated) {

        const user = await User.findOne({
            username: req.session.user.username
        })
        req.user = req.session.user
    }
    app.locals.user = req.session.user

    app.locals.success_msg = req.flash('success_msg')

    next()
})

app.get('/set', (req, res) => {
    req.session.name = req.query.name
    res.send(`Session started`)
})
app.get('/get', (req, res) => {
    res.json(req.user)
})

app.set('view engine', 'ejs')
app.use(expressEjsLayouts)

app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
})

app.use(express.static(__dirname + '/public'))

const authRouter = require('./routes/auth')
const commonRoute = require('./routes/common')
const shortenerRoute = require('./routes/shortener')
app.use('/auth', authRouter)
app.use(commonRoute)
app.use(shortenerRoute)