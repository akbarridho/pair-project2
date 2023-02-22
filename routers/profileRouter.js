const express = require('express')
const profileController = require('../controllers/profileController')
const router = express.Router()

router.get('/add', profileController.renderAddProfile)
router.post('/add', profileController.handleAddProfile)
router.get('/:profileId/edit', profileController.renderEditProfile)
router.post('/:profileId/edit', profileController.handleEditProfile)

module.exports = router