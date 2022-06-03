const express = require("express")
const router = express.Router()
const CommentController = require("../controllers/commentController")

router.route("/")
    .get(CommentController.getAll)
    .post(CommentController.add)
    .delete(CommentController.deleteAllComment)
module.exports = router