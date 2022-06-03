const express = require("express")
const router = express.Router()
const LikeController = require("../controllers/likeController")

router.route("/")
    .get(LikeController.getAll)
    .post(LikeController.addOuSupprimer)

module.exports = router