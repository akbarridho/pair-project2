const { Profile, Book, Like } = require('../models/index')
const { formatDate } = require('../helpers/formatDate')

class visitorController {
    static getAllBooks(req, res) {
        Book.findAll({
            include: [
                {model: Profile},
                {model: Like}
            ]
        })
            .then((data) => {
                res.render('visitor/all-book', {data, formatDate})
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static detailBook(req, res) {
        let id = req.params.BookId
        Book.findOne({
            include: [
                {model: Profile},
                {model: Like}
            ],
            where: {
                id
            }
        })
            .then((data) => {
                // res.send(data)
                let userId = req.session.UserId
                res.render('visitor/detail-book', {data, userId, formatDate})
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static likeBook(req, res) {
        let id = req.params.BookId
        Like.create({BookId: id, ProfileId: req.session.UserId})
            .then((_) => {
                res.redirect('/visitor')
            })
            .catch((err) => {
                res.send(err)
            })
    }
}

module.exports = visitorController