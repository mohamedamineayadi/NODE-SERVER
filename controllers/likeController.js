const Like = require("../models/Like")
const Meme = require('../models/meme')

exports.getAll = async (req, res) => {
    res.status(200).send({ message: "success", "likes": await Like.find() })
}

exports.addOuSupprimer = async (req, res) => {
    const { idUser, idMeme } = req.body

    console.log(req.body)
    let like = await Like.findOne({
        user: idUser,
        meme: idMeme,
    })
    let meme = await Meme.findById(idMeme)

    if (like) {
        
        console.log("remove like")
        await meme.update(
            { _id: idMeme },
            {
                $pull: {
                    likes: [like._id],
                },
            }
        )

        await like.remove()
    } else {
        console.log("add like")

        like = new Like()
        like.date = Date.now()
        like.user = idUser
        like.meme = idMeme

        meme = await Meme.findById(idMeme).populate("likes")

        await Meme.findByIdAndUpdate({
                _id: idMeme
            },
            {
                $push: {
                    likes: like._id,
                },
            }
        )

        await like.save()
    }

    res.status(200).send({ message: "success", meme })
}