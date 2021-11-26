const express = require("express");
const router = express.Router();

const userController = require('../controllers/userController')

/**
 * @Path /users
 */

/*router.get('/',userController.index)
router.post('/show',userController.show)
router.post('/store',userController.store)

router.post('/update',userController.update)

router.post('/destroy',userController.destroy)*/

router.post("/register",userController.RegisterUser)
router.post("/login",userController.login)
router.get("/getUser/:email",userController.authenticate,userController.findUserByEmail)
router.get("/getUserWithoutAuthenticate/:email",userController.findUserByEmail)
router.get("/emailexist/:email",userController.EmailExist)

module.exports = router

