const { User, Profile } = require('../models/index')
const bcrypt = require('bcryptjs');

class userController {
    static renderRegister(req, res) {
        let error = req.query.error
        res.render('register', {error})
    }

    static handleRegister(req, res) {
        const { userName, email, password, role, fullName, gender, profilePicture } = req.body
        User.create({userName, email, password, role})
            .then((data) => {
                return Profile.create({fullName, gender, profilePicture, UserId: data.id}) 
            })
            .then((_) => {
                res.redirect('/login')
            })
            .catch((err) => {
                if (err.name == 'SequelizeUniqueConstraintError') {
                    let error = err.errors.map((el) => {
                        return el.message
                    })
                    res.redirect(`/register?error=${error}`)
                } else if (err.name == 'SequelizeValidationError') {
                    let error = err.errors.map((el) => {
                        return el.message
                    })
                    res.redirect(`/register?error=${error}`)
                } else {
                    res.send(err)
                }
            })
    }

    static renderLogin(req, res) {
        let error = req.query.error
        res.render('login', {error})
    }

    static handleLogin(req, res) {
        const { userName, password } = req.body

        User.findOne({
            where: {userName}
        })
            .then((data) => {
                if (data) {
                    const isValidPassword = bcrypt.compareSync(password, data.password); // true || false

                    if (isValidPassword) {
                        req.session.role = data.role
                        req.session.UserId = data.id // set session di controller login
                        res.redirect('/')
                    } else {
                        const error = "Invalid Password"
                        res.redirect(`/login?error=${error}`)
                    }
                } else if (!data) {
                    const error = "Username doesn't exists"
                    res.redirect(`/login?error=${error}`)
                }
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static getLogOut(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err)
            } else {
                res.redirect('/login')
            }
        })
    }
}

module.exports = userController