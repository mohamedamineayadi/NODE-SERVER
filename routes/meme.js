const express = require('express')
const router = express.Router()

const memeController = require('../controllers/memeController')



router.get('/',memeController.index)

router.post('/store',memeController.store)

router.post('/update',memeController.update)

router.post('/destroy',memeController.destroy)

module.exports = router

