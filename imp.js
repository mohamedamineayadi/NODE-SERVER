const express = require("express");
const User = require("./user");
const userModel = require("./user");
const Contact = require("./contact");
const app = express();



app.post("/add_user", async (request, response) => {
    const user = new userModel(request.body);
  
    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.get("/users", async (request, response) => {
    const users = await User.find({});
  
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  });


  //create user
  app.post("/create_user",(req,res)=>{
    var user = new User({
        name:req.get("name"),
        surname:req.get("surname"),
        email:req.get("email"),
        password:req.get("password"),
        photo:req.get("photo"),
        birthDate:req.get("birthDate"),
        points:req.get("points"),

    })

    user.save().then(()=>{
      if (user.isNew == false){
        console.log("saved data")
        res.send("saved data")
      }else{
        console.log("failed to save data")
      }
    })
  })

  //fetch a user

  app.get("/users",(req,res)=>{
    User.find({}).then((DBitems)=>{
      res.send(DBitems)
    })
  })

  //remove user

  app.post("/delete_user",(req,res)=>{
    User.findOneAndRemove({
      _id: req.get("id")
    },(err)=>{
      console.log("failed")
    }
    )
    res.send("deleted!")
  })
  //update user

  app.post("/update_user",(req,res)=>{
    User.findOneAndUpdate({
        _id:req.get("id")
    },{
      name:req.get("name"),
      surname:req.get("surname"),
      email:req.get("email"),
      password:req.get("password"),
      photo:req.get("photo"),
      birthDate:req.get("birthDate"),
      points:req.get("points"),
      
    },(err)=>{
        console.log("failed to update"+err)
    })
    res.send("updated")
  })

//********************contact******************** */
//create contact
app.post("/create_contact",(req,res)=>{
    var contact = new Contact({
        text:req.get("text"),
        topic:req.get("topic"),
        email:req.get("email"),

    })

    contact.save().then(()=>{
      if (contact.isNew == false){
        console.log("saved data")
        res.send("saved data")
      }else{
        console.log("failed to save data")
      }
    })
  })

  //fetch a contact

  app.get("/contacts",(req,res)=>{
    Contact.find({}).then((DBitems)=>{
      res.send(DBitems)
    })
  })

  //remove contact

  app.post("/delete_contact",(req,res)=>{
    Contact.findOneAndRemove({
      _id: req.get("id")
    },(err)=>{
      console.log("failed")
    }
    )
    res.send("deleted!")
  })
  //update contact

  app.post("/update_contact",(req,res)=>{
    Contact.findOneAndUpdate({
        _id:req.get("id")
    },{
      text:req.get("text"),
      topic:req.get("topic"),
      email:req.get("email"),
     
      
    },(err)=>{
        console.log("failed to update"+err)
    })
    res.send("updated")
  })


  module.exports = app;
