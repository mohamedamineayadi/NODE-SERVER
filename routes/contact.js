const express = require('express')
const router = express.Router()

const contactController = require('../controllers/contactController')


router.get('/',contactController.index)
router.post('/show',contactController.show)
router.post('/store',contactController.store)

router.post('/update',contactController.update)

router.post('/destroy',contactController.destroy)

module.exports = router

