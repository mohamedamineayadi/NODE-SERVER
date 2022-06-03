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
router.get("/all", userController.getAll)

router.post("/register", userController.RegisterUser)
router.post("/login", userController.login)
router.post("/loginGmail", userController.loginGmail)
router.get("/getUser/:email", userController.authenticate, userController.findUserByEmail)
router.get("/getUserById/:id", userController.findUserById)
router.get("/getUserWithoutAuthenticate/:email", userController.findUserByEmail)
router.get("/emailexist/:email", userController.EmailExist)
router.put("/resetpassword/:email", userController.sendMailForgetPassword)
router.get("/checkKeyReset/:email/:resetpwd", userController.checkKeyReset)
router.put("/sendmodifiedpassword/:email/:password", userController.sendModifiedPassword)
router.get('/', userController.index)

router.post("/forgotPassword", userController.forgotPassword)
router.post("/updatePassword", userController.updatePassword)

module.exports = router

