var mongoose=require('mongoose')
var Schema =mongoose.Schema

const react = new Schema({
    ReactState :{ 
                type:Number
        },
        
        



},{timestamps:true})

const React =mongoose.model('React',react)
module.exports = React