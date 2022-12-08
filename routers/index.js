const express = require('express')
const homeController = require('../controllers/homeController')
const userController = require('../controllers/userController')
const router = express.Router()
const adminRouter = require('./adminRouter')

router.get('/register', userController.renderRegister)
router.post('/register', userController.handleRegister)
router.get('/login', userController.renderLogin)
router.post('/login', userController.handleLogin)

router.use((req, res, next) => {
    if (req.session.UserId) {
        next()
    } else if (!req.session.UserId) {
        const error = "You must login first"
        res.redirect(`/login?error=${error}`)
    }
})

const isAdmin = function(req, res, next) {
    if (req.session.role === 'Admin') {
        next()
    } else if (req.session.role === 'Visitor') {
        const error = "You have no access"
        res.redirect(`/?error=${error}`)
    }
}

router.get('/', homeController.showHome)
router.use('/admin', isAdmin, adminRouter)

module.exports = router