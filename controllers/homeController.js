const { Profile } = require('../models/index')

class homeController {
    static showHome(req, res) {
        let id = req.session.UserId
        let error = req.query.error
        Profile.findByPk(id)
            .then((data) => {
                res.render('home', {data, error})
            })
            .catch((err) => {
                res.send(err)
            })
    }
}

module.exports = homeController