const express = require('express')
const visitorController = require('../controllers/visitorController')
const router = express.Router()

router.get('/', visitorController.getAllBooks)
router.get('/:BookId', visitorController.detailBook)
router.get('/:BookId/like', visitorController.likeBook)

module.exports = router