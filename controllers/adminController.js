const { Book, Profile, User, Like } = require('../models/index')
const { formatDate } = require('../helpers/formatDate')

class adminController {
    static getAllBooks(req, res) {
        Book.findAll({
            include: [
                {
                    model: User,
                    include: {
                        model: Profile
                    }
                }
        ]
        })        
            .then((data) => {
                res.render('admin/all-book', {data, formatDate})
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static renderAddBook(req, res) {
        let error = req.query.error
        res.render('admin/add-book', {error})
    }

    static handleAddBook(req, res) {
        const { title, genre, publish, description } = req.body
        Book.create({title, genre, publish, description, UserId: req.session.UserId})
            .then((_) => {
                res.redirect('/admin')
            })
            .catch((err) => {
                if (err.name == 'SequelizeValidationError') {
                    let error = err.errors.map((el) => {
                        return el.message
                    })
                    res.redirect(`/admin/add?error=${error}`)
                } else {
                    res.send(err)
                }
            })
    }

    static getDetailBook(req, res) {
        let data
        let id = req.params.BookId
        Book.findOne({
            where: {
                id
            },
            include: [
                {
                    model: User,
                    include: Profile
                },
                {model: Like}
            ]
        })
            .then((result) => {
                data = result
                // res.send(data)
                return User.findAll({
                    include: {
                        model: Profile
                    }
                })
            })
            .then((data2) => {
                // res.send(data2)
                res.render('admin/detail-book', {data, data2, formatDate})
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static renderEditBook(req, res) {
        let error = req.query.error
        let id = req.params.BookId
        let data
        Book.findOne({
            where: {
                id
            }
        })
            .then((result) => {
                data = result
                return Profile.findAll()
            })
            .then((data2) => {
                res.render('admin/edit-book', {data, data2, error, formatDate})
            })
            .catch((err) => {
                res.send(err)
            })
    }
    
    static handleEditBook(req, res) {
        let id = req.params.BookId
        const {title, genre, publish, description} = req.body
        Book.update({title, genre, publish, description}, {where: {id}, individualHooks: true })
            .then((_) => {
                res.redirect(`/admin/${id}`)
            })
            .catch((err) => {
                if (err.name == 'SequelizeValidationError') {
                    let error = err.errors.map((el) => {
                        return el.message
                    })
                    res.redirect(`/admin/${id}/edit?error=${error}`)
                } else {
                    res.send(err)
                }
            })
    }

    static deleteBookById(req, res) {
        let id = req.params.BookId
        Book.destroy({
            where: {id}
        })
            .then((_) => {
                res.redirect('/admin')
            })
            .catch((err) => {
                res.send(err)
            })
    }
}

module.exports = adminController