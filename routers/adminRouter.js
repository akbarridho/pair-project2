const express = require('express')
const adminController = require('../controllers/adminController')
const router = express.Router()

router.get('/', adminController.getAllBooks)
router.get('/add', adminController.renderAddBook)
router.post('/add', adminController.handleAddBook)
router.get('/:BookId', adminController.getDetailBook)
router.get('/:BookId/edit', adminController.renderEditBook)
router.post('/:BookId/edit', adminController.handleEditBook)
router.get('/:BookId/delete', adminController.deleteBookById)

module.exports = router