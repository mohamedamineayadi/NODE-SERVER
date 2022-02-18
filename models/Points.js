var mongoose=require('mongoose')
var Schema =mongoose.Schema

const points = new Schema({
    pointCount :{ 
                type:Number
        },
        
        



},{timestamps:true})

const Points =mongoose.model('Points',points)
module.exports = Points