const express = require('express')
const router = express.Router()

const reactController = require('../controllers/reactController')



router.get('/',reactController.index)

router.post('/store',reactController.store)


router.post('/destroy',reactController.destroy)

module.exports = router

