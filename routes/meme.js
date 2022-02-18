const express = require('express')
const router = express.Router()

const memeController = require('../controllers/memeController')

const multer = require("multer")

const storage = multer.diskStorage({
    destination : function(req,file,callback){
        callback(null,'./uploads/images');
    },   
    filename : function(req,file,callback){
        callback(null,Date.now()+file.originalname);
    } 
});

const upload = multer({
    storage: storage
})

/**
 * @Path /memes
 */

/*router.get('/',memeController.index)

router.post('/store',memeController.store)

router.post('/update',memeController.update)

router.post('/destroy',memeController.destroy)*/
router.post("/create",upload.single('image') , memeController.createMeme)
/**
 * @swagger
 * /memes/:
 *   get:
 *     summary: Get all memes 
 *     tags: [Memes]
 *     description: use to get all memes
 *     responses: 
 *       '200':
 *         description: A successful response
 */
router.get("/", memeController.getAllMeme)
router.delete("/delete/:id", memeController.deleteMeme)
router.put("/update/:id", memeController.updateMeme)


module.exports = router

