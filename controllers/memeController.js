const Meme =require ('../models/meme')

module.exports = {
    createMeme: async (req, res) => {
        const { text,createdby } = req.body;
        const meme = new Meme({ text,createdby });
        await meme.save();
        res.send(meme);
      },
      getAllMeme: async (req, res) => {
        const memes = await Meme.find();
        res.send(memes);
      },
      deleteMeme: (req, res) => {
        console.log("en cour");
        const { id } = req.params;
        console.log(id);
        Meme.findByIdAndRemove(id, function (err) {
          if (!err) {
            console.log("success");
          } else {
            console.log("failed");
          }
        });
        return res.send("deleted");
      },
      updateMeme: (req, res) => {
        const { id } = req.params;
        console.log(req.body);
        Meme.updateOne(
          { _id: id },
          { text: req.body.text },
          function (err) {
            if (err) {
              console.log("failed");
            } else {
              console.log("success update");
            }
          }
        );
        return res.send("update");
      },
}

/*
//show memes 
const index =(req,res,next)=> {


    Meme.find()
    .then(response => {

        res.json({
            response
        })
    })
    .catch(error=> {
        res.json({
            message: 'an error has occured'
        })
    })

}



//  add meme
const store =(req,res,next)=> {

    let meme = new Meme({
        text:req.body.text,
        image:req.body.image,
        
    })
    meme.save()
    .then(response =>{
        res.json({
            message: 'meme added successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'an error occured'
        })
    })



}

// update meme

const update =(req,res,next)=> {

let id = req.body.id

let updateData = {
    text:req.body.text,
    image:req.body.image,
    
}
    Meme.findByIdAndUpdate(id,{$set:updateData})
    .then(() => {
        res.json({
            message: 'meme updated'
        })
})
.catch(error => {
    res.json({
        message: 'error'
    })
})
}


// delete meme

const destroy =(req,res,next)=> {
    let id = req.body.id
    id.findByIdAndRemove(id)
    .then(()=>{
        req.json({
            message:'meme deleted'

        })
    })
    .catch(error => {
        req.json({
            message:'error'
        })
    })
}
 
module.exports = {
    index,store, update ,destroy
}*/
