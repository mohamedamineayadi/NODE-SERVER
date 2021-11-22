const User =require ('../models/user')


//show users 
const index =(req,res,next)=> {


    User.find()
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


//show user by criteria

const show =(req,res,next)=> {

    let id = req.body.id
    User.findById(id)
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


//  add user 

const store =(req,res,next)=> {

    let user = new User({
        name:req.body.name,
        surname:req.body.surname,
        email:req.body.email,
        password:req.body.password,
        photo:req.body.photo,
        birthDate:req.body.birthDate,
        points:req.body.points,
    })
    user.save()
    .then(response =>{
        res.json({
            message: 'user added successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'an error occured'
        })
    })



}

// update user

const update =(req,res,next)=> {

let id = req.body.id

let updateData = {
    name:req.body.name,
    surname:req.body.surname,
    email:req.body.email,
    password:req.body.password,
    photo:req.body.photo,
    birthDate:req.body.birthDate,
    points:req.body.points,
}
    User.findByIdAndUpdate(id,{$set:updateData})
    .then(() => {
        res.json({
            message: 'user updated'
        })
})
.catch(error => {
    res.json({
        message: 'error'
    })
})
}


// delete user

const destroy =(req,res,next)=> {
    let id = req.body.id
    id.findByIdAndRemove(id)
    .then(()=>{
        req.json({
            message:'user deleted'

        })
    })
    .catch(error => {
        req.json({
            message:'error'
        })
    })
}
 
module.exports = {
    index, show ,store, update ,destroy
}
