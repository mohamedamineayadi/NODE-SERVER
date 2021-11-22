const express  = require('express')
const mongoose = require('mongoose')
const morgan   = require('morgan')
const bodyParser = require('body-parser')

const UserRoute = require ('./routes/user')
const ContactRoute = require ('./routes/contact')
const MemeRoute = require ('./routes/meme')
const PasswordRoute = require ('./routes/password')
const PointsRoute = require ('./routes/points')
const ReactRoute = require ('./routes/react')
const AuthRoute = require ('./routes/auth')



mongoose.connect('mongodb://localhost:27017/MemeGenerator',{useNewUrlParser: true,useUnifiedTopology: true})
const db = mongoose.connection

db.on('error',(err) => {
   console.log(err)

})

db.once('open',() => {

   console.log('DataBase Connection Established !')

})


const app = express ()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


const PORT = process.env.PORT || 3000

app.listen(PORT,()=> {
    console.log(`Server  is Running  on PORT ${PORT}`)
    

})

app.use('/api/user',UserRoute)
app.use('/api/contact',ContactRoute)
app.use('/api/meme',MemeRoute)
app.use('/api/password',PasswordRoute)
app.use('/api/points',PointsRoute)
app.use('/api/react',ReactRoute)
app.use('/api',AuthRoute)