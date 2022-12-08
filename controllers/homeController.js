const { Profile } = require('../models/index')

class homeController {
    static showHome(req, res) {
        let error = req.query.error
        res.render('home', {error})
    }
}

module.exports = homeController