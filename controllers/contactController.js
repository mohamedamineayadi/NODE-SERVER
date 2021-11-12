const Contact =require ('../models/contact')


//show contacts 
const index =(req,res,next)=> {


    Contact.find()
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


//show contact by criteria

const show =(req,res,next)=> {

    let id = req.body.id
    Contact.findById(id)
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


//  add contact 
const store =(req,res,next)=> {

    let contact = new Contact({
        text:req.body.text,
        topic:req.body.topic,
        email:req.body.email,
        
    })
    contact.save()
    .then(response =>{
        res.json({
            message: 'contact added successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'an error occured'
        })
    })



}

// update contact

const update =(req,res,next)=> {

let id = req.body.id

let updateData = {
    text:req.body.text,
    topic:req.body.topic,
    email:req.body.email,
    
}
    Contact.findByIdAndUpdate(id,{$set:updateData})
    .then(() => {
        res.json({
            message: 'contact updated'
        })
})
.catch(error => {
    res.json({
        message: 'error'
    })
})
}


// delete contact

const destroy =(req,res,next)=> {
    let id = req.body.id
    id.findByIdAndRemove(id)
    .then(()=>{
        req.json({
            message:'contact deleted'

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
