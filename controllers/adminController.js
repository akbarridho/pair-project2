const { Book, Profile, User } = require('../models/index')
const { formatDate } = require('../helpers/formatDate')

class adminController {
    static getAllBooks(req, res) {
        Book.findAll({
            include: {
                model: Profile
            }
        })        
            .then((data) => {
                res.render('admin/all-book', {data, formatDate})
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
                res.send(err)
            })
    }

    static getDetailBook(req, res) {
        let id = req.params.BookId
        Book.findOne({
            where: {
                id
            },
            include: {
                model: Profile
            }
        })
            .then((data) => {
                res.render('admin/detail-book', {data, formatDate})
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static renderEditBook(req, res) {
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
                res.render('admin/edit-book', {data, data2, formatDate})
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
                res.send(err)
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