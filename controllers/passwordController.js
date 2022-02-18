const Password =require ('../models/password')




//show password 
const index =(req,res,next)=> {


    Password.find()
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



//  add password
const store =(req,res,next)=> {

    let password = new Password({
        password:req.body.password,
        
    })
    password.save()
    .then(response =>{
        res.json({
            message: 'password added successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'an error occured'
        })
    })



}

// update password

const update =(req,res,next)=> {

let id = req.body.id

let updateData = {
    password:req.body.password,
    
    
}
    Password.findByIdAndUpdate(id,{$set:updateData})
    .then(() => {
        res.json({
            message: 'password updated'
        })
})
.catch(error => {
    res.json({
        message: 'error'
    })
})
}


// delete password

const destroy =(req,res,next)=> {
    let id = req.body.id
    id.findByIdAndRemove(id)
    .then(()=>{
        req.json({
            message:'password deleted'

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
