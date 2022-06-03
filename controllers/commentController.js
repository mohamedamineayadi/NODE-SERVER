const Comment = require("../models/Comment")
const Meme = require('../models/meme')
const User = require('../models/user')

exports.getAll = async (req, res) => {
    res.status(200).send({message: "success", "comments": await Comment.find()})
}

exports.add = async (req, res) => {
    const {idUser, idMeme, description} = req.body

    console.log(req.body)
    let comment = new Comment()
    comment.description = description
    comment.date = Date.now()
    comment.user = idUser
    let user = await User.findById(idUser)
    comment.userEmail = user.email

    comment.meme = idMeme

    let meme = await Meme.findById(idMeme).populate("comments")

    await Meme.findByIdAndUpdate({
            _id: idMeme
        },
        {
            $push: {
                comments: comment._id,
            },
        }
    )

    await comment.save()

    res.status(200).send({message: "success", meme})
}

exports.deleteAllComment = async (req, res) => {
    Comment.remove({}, function (err) {
        if (err) {
            return handleError(res, err)
        }
        return res.status(204).send({ message: "Aucun element" })
    })
}