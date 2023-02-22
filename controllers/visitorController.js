const { Profile, Book, Like, User } = require('../models/index')
const { formatDate } = require('../helpers/formatDate')
const qrcode = require('qrcode')

class visitorController {
    static getAllBooks(req, res) {
        const { search } = req.query
        Book.searchTitleBook(search, Profile, Like, User)
            .then((data) => {
                // res.send(data)
                res.render('visitor/all-book', {data, formatDate})
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

    static detailBook(req, res) {
        let id = req.params.BookId
        const input_text = `http://localhost:3000/visitor/${id}`
        qrcode.toDataURL(input_text, (err, src) => {
            if (err) res.send("Something went wrong!!");
        Book.findOne({
            include: [
                {
                    model: User,
                    include: {
                        model: Profile
                    }
                },
                {model: Like}
            ],
            where: {
                id
            }
        })
            .then((data) => {
                // res.send(data)
                let userId = req.session.UserId
                let role = req.session.role
                res.render('visitor/detail-book', {data, userId, role, qr_code: src, formatDate})
            })
            .catch((err) => {
                res.send(err)
            })
        })
    }

    static likeBook(req, res) {
        let id = req.params.BookId
        if (req.session.role == 'Admin') {
            res.redirect('/visitor')
        } else {
            Like.create({BookId: id, UserId: req.session.UserId})
                .then((_) => {
                    res.redirect('/visitor')
                })
                .catch((err) => {
                    res.send(err)
                })
        }
    }
}

module.exports = visitorController