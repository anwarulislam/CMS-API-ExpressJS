const User = require('./../models/User')
const bcrypt = require('bcryptjs')

module.exports.login = async (req, res) => {
    //Username is required
    if (req.body.username.length === 0)
        req.check('username', 'Username is required').custom(() => false)
    else {
        req.check('username', 'Username should be atleast 3 character').isLength({ min: 3 })
    }
    //password 
    if (req.body.password.length === 0)
        req.check('password', 'Password is required').custom(() => false)
    else
        req.check('password', 'Password should be atleast 5 character').isLength({ min: 5 })

    // Check false return to save data
    if (!req.validationErrors()) {

        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            req.check('username', 'Username not found').custom(() => false)
        }
        if (user) {

            const passwordCheck = bcrypt.compareSync(req.body.password, user.password)

            if (passwordCheck) {

                try {
                    if (user) {
                        req.flash('success_msg', 'You have logged in successfully!!')
                        req.session.user = {
                            username: user.username,
                            email: user.email,
                            name: user.name
                        }
                        res.redirect('/')
                    }

                } catch (error) {
                    console.log(error)
                }

            }

            req.check('password', 'Your password is wrong').custom(() => false)
        }


    }
    // req.session.errors=req.validationErrors()
    req.flash('errors', req.validationErrors())
    res.redirect('back')

}

module.exports.register = async (req, res) => {

    //name is required
    if (req.body.name.length === 0)
        req.check('name', 'Name is required').custom(() => {
            return false
        })

    else
        req.check('name', "Name should be atleast 3 character").isLength({ min: 3 })


    //Username is required
    if (req.body.username.length == 0)
        req.check('username', 'Username is required').custom(() => {
            return false
        })
    else
        req.check('username', 'Username should be atleast 3 character').isLength({ min: 3 })

    //User Name Exists Check
    const useNameExists = await User.findOne({ username: req.body.username })
    if (useNameExists)
        req.check('username', "Username already used").custom(() => false)

    //email
    if (req.body.email.length === 0)
        req.check('email', 'Email is required').custom(() => false)
    else
        req.check('email', 'Please provide correct email').isEmail()

    // Check email exists
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists)
        req.check('email', `${req.body.email} already used`).custom(() => false)




    //password 
    if (req.body.password.length === 0)
        req.check('password', 'Password is required').custom(() => false)
    else
        req.check('password', 'Password should be atleast 5 character').isLength({ min: 5 })

    //Confirm Password
    if (req.body.confirm_password.length === 0)
        req.check('confirm_password', "Confirm password is required").custom(() => { false })

    else
        req.check('password',
            'Password does not match').equals(req.body.confirm_password)

    // Check false return to save data
    if (!req.validationErrors()) {

        let { name, username, email, password } = req.body
        password = bcrypt.hashSync(password)
        let new_user = new User({ name, username, email, password })

        console.log(new_user)

        try {
            let user = await new_user.save()
            if (user) {
                req.flash('success_msg', 'You have registered successfully!!')
                req.session.user = {
                    username: user.username,
                    email: user.email,
                    name: user.name
                }
                res.redirect('/')
            }

        } catch (error) {
            console.log(error)
        }
    }
    else {
        // req.session.errors=req.validationErrors()
        req.flash('errors', req.validationErrors())
        res.redirect('back')
    }
}