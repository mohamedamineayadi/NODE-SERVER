const Meme =require ('../models/meme')




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
}
