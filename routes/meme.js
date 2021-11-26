const express = require('express')
const router = express.Router()

const memeController = require('../controllers/memeController')

/**
 * @Path /memes
 */

/*router.get('/',memeController.index)

router.post('/store',memeController.store)

router.post('/update',memeController.update)

router.post('/destroy',memeController.destroy)*/
router.post("/create", memeController.createMeme)
router.get("/", memeController.getAllMeme)
router.delete("/delete/:id", memeController.deleteMeme)
router.put("/update/:id", memeController.updateMeme)


module.exports = router

