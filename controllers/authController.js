const User = require ('../models/user')
const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')



const register = (req,res,next) => {
    bcrypt.hash(req.body.password,10,function(err,hashedPass) {
        if (err){
            res.json({

                error:err
            })

        }
        let user = new User ({
            name:req.body.name,
            surname:req.body.surname,
            email:req.body.email,
            photo:req.body.photo,
            birthDate:req.body.birthDate,
            password:hashedPass
        })
    
        user.save()
        .then(user => {
            res.json({
                message: 'User Added !'
            })
        })
        .catch(error => {
            res.json({
                message: 'an errror occured!'
            })
        })
    })

    
}

const login = (req,res,next) => {
    var usernam = req.body.username
    var password = req.body.password

    User.findOne({username:usernam},{password:1})
    .then(user =>{
        if(user){
            //bcrypt.hash(req.body.password,10,function(err,hashedPass) {
            bcrypt.compare(password,user.password,function(err,result){
                console.log("password "+password)
                var us = user.toObject();
                console.log("userpasswod"+us)
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    //let token = jwt.sign({name: user.name},'verySecretValue',{expiresIn:'1h'})
                    res.json({
                        message: 'Login successfull',
                     //   token
                    })
                }else{
                    res.json({
                        message:'password does not match'
                    })
                }
            })
        //})
        }else{
            res.json({
                message: 'No user found!'
            })
        }
    })
}

module.exports = {
    register,login
}