const User =require ('../models/user')

const jwt = require('jsonwebtoken')
const md5 = require("md5")

module.exports = {
    RegisterUser: async (req, res) => {
        const { name, surname, email, password } = req.body;
        const mdp = req.body.password
    
        const isUserFound = await User.findOne({ email });
    
        if (isUserFound) {
          return res.status(404).json({ created: false, message: "Alredy exist" });
        }
    
        const user = new User({
          name,
          surname,
          email,
          password: md5(mdp),
          points: 0
        });
    
        await user.save();
        res.json(user);
      },
      login: async (req, res) => {
        const password = req.body.password;
        const email = req.body.email;
        const user = await User.findOne({ email: email });
        if (user) {
          if (md5(password) == user.password) {
            jwt.sign({ email }, "secretkey", (err, token) => {
              if (token) {
                return res.json({
                  token,
                });
              }
            });
            //return res.json(user);
          } else {
            res.json({ message: "Authentication Failed", success: false });
          }
        } else {
          res.json({ message: "Authentication Failed", success: false });
        }
      },
      authenticate: (req, res, next) => {
        const headers = req.headers["authorization"];
        if (headers) {
          const bearer = headers.split(" ");
          const token = bearer[1];
          jwt.verify(token, "secretkey", (err, authData) => {
            if (err) {
              res.json({ message: "Invalid token" });
            } else {
              const email = authData.email;
              const user = User.findOne({ email: email }, function (err, user) {
                if (user) {
                  next();
                } else {  
                  res.json({message: "Unauthorized access",
                });
              }
              });
            }
          });
        } else {
          res.json({ message: "Give a Valid Token" });
        }
      },
      findUserByEmail: async (req, res) => {
        const user = await User.findOne({ email: req.params.email });
        if (user) {
          return res.json(user);
        } else {
          res.status(404).json({ message: "Not Found" });
        }
      },
      EmailExist: async(req, res) => {
        const { email } = req.params
        const isUserFound = await User.findOne({ email });
    
        if (isUserFound) {
          return res.json({ exist: true });
        }
        return res.json({ exist: false });
      },
}

/*
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
}*/
 
/*module.exports = {
    index, show ,store, update ,destroy
}*/


