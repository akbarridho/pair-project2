const { Book, Profile, User } = require('../models/index')

class adminController {
    static getAllBooks(req, res) {
        Book.findAll({
            include: {
                model: Profile
            }
        })        
            .then((data) => {
                res.render('admin/all-book', {data})
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static renderAddBook(req, res) {
        Profile.findAll({
            include: {
                model: User
            }
        })
            .then((data) => {
                res.render('admin/add-book', {data})
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static handleAddBook(req, res) {
        const { title, genre, publish, description } = req.body
        Book.create({title, genre, publish, description, ProfileId: req.session.UserId})
            .then((_) => {
                res.redirect('/admin')
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

    static getDetailBook(req, res) {

    }

    static renderEditBook(req, res) {

    }
    
    static handleEditBook(req, res) {

    }

    static deleteBookById(req, res) {

    }
}

module.exports = adminController