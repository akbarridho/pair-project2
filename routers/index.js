const express = require('express')
const homeController = require('../controllers/homeController')
const userController = require('../controllers/userController')
const router = express.Router()
const adminRouter = require('./adminRouter')
const visitorRouter = require('./visitorRouter')
const profileRouter = require('./profileRouter')

const isLogin = function(req, res, next) {
    if (req.session.UserId) {
        res.redirect('/')
    } else {
        next()
    }
  }

router.get('/register', isLogin, userController.renderRegister)
router.post('/register', userController.handleRegister)
router.get('/login', isLogin, userController.renderLogin)
router.post('/login', userController.handleLogin)
router.get('/logout', userController.getLogOut)

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
router.use('/profile', profileRouter)
router.use('/admin', isAdmin, adminRouter)
router.use('/visitor', visitorRouter)

module.exports = router