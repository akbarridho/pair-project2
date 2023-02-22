const { Profile } = require('../models/index')

class profileController {
    static renderAddProfile(req, res) {
        let errors = req.query.error
        res.render('profile/add-profile', {errors})
    }

    static handleAddProfile(req, res) {
        let id = req.session.UserId
        const { fullName, gender, profilePicture } = req.body
        Profile.create({fullName, gender, profilePicture, UserId: id})
            .then((_) => {
                res.redirect('/')
            })
            .catch((err) => {
                if (err.name == 'SequelizeValidationError') {
                    let errors = err.errors.map((el) => {
                        return el.message
                    })
                    res.redirect(`/profile/add?error=${errors}`)
                } else {
                    res.send(err)
                }
            })
    }

    static renderEditProfile(req, res) {
        let errors = req.query.error
        let id = req.params.profileId
        Profile.findByPk(id)
            .then((data) => {
                res.render('profile/edit-profile', {data, errors})
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static handleEditProfile(req, res) {
        let id = req.params.profileId
        const { fullName, gender, profilePicture } = req.body
        Profile.update({fullName, gender, profilePicture}, {where: {id}})
            .then((_) => {
                res.redirect('/')
            })
            .catch((err) => {
                if (err.name == 'SequelizeValidationError') {
                    let errors = err.errors.map((el) => {
                        return el.message
                    })
                    res.redirect(`/profile/${id}/edit?error=${errors}`)
                } else {
                    res.send(err)
                }
            })
    }
}

module.exports = profileController