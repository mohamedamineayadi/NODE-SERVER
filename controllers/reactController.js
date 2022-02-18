const React =require ('../models/react')




//show react
const index =(req,res,next)=> {


    React.find()
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



//  add react
const store =(req,res,next)=> {

    let react = new React({
        react:req.body.ReactState,

        
    })
    react.save()
    .then(response =>{
        res.json({
            message: 'react added successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'an error occured'
        })
    })



}

// delete react

const destroy =(req,res,next)=> {
    let id = req.body.id
    id.findByIdAndRemove(id)
    .then(()=>{
        req.json({
            message:'react deleted'

        })
    })
    .catch(error => {
        req.json({
            message:'error'
        })
    })
}
 
module.exports = {
    index,store,destroy
}
