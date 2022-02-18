const Points =require ('../models/points')




//show points
const index =(req,res,next)=> {


    Points.find()
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



//  add points
const store =(req,res,next)=> {

    let points = new Points({
        points:req.body.pointCount,
        
    })
    points.save()
    .then(response =>{
        res.json({
            message: 'points added successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'an error occured'
        })
    })



}

// update points

const update =(req,res,next)=> {

let id = req.body.id

let updateData = {
    points:req.body.points,
    
    
}
    Points.findByIdAndUpdate(id,{$set:updateData})
    .then(() => {
        res.json({
            message: 'points updated'
        })
})
.catch(error => {
    res.json({
        message: 'error'
    })
})
}


// delete points

const destroy =(req,res,next)=> {
    let id = req.body.id
    id.findByIdAndRemove(id)
    .then(()=>{
        req.json({
            message:'points deleted'

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
