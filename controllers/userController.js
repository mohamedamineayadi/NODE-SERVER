const User = require('../models/user')

const jwt = require('jsonwebtoken')
const md5 = require("md5")
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs')

module.exports = {
    getAll: async (req, res) => {
        return res.send({"users": await User.find()});
    },

    RegisterUser: async (req, res) => {
        const {name, surname, email, password} = req.body;
        const mdp = req.body.password

        const isUserFound = await User.findOne({email});

        if (isUserFound) {
            return res.status(404).json({created: false, message: "Already exist"});
        }

        const user = new User({
            name,
            surname,
            email,
            password: md5(mdp),
            points: 0
        });

        await user.save();
        res.status(200).json(user);
    },
    login: async (req, res) => {
        const password = req.body.password;
        const email = req.body.email;
        const user = await User.findOne({email: email});
        if (user) {
            if (md5(password) == user.password) {
                jwt.sign({email}, "secretkey", (err, token) => {
                    if (token) {
                        return res.status(200).json({
                            user,
                            token,
                        });
                    }
                });
                //return res.json(user);
            } else {
                res.status(400).json({message: "Authentication Failed", success: false});
            }
        } else {
            res.status(400).json({message: "Authentication Failed", success: false});
        }
    },
    loginGmail: async (req, res) => {
        const email = req.body.email;
        await jwt.sign({email}, "secretkey", (err, token) => {
            if (token) {
                return res.json({
                    token,
                });
            }
        });
    },
    authenticate: (req, res, next) => {
        const headers = req.headers["authorization"];
        if (headers) {
            const bearer = headers.split(" ");
            const token = bearer[1];
            jwt.verify(token, "secretkey", (err, authData) => {
                if (err) {
                    res.json({message: "Invalid token"});
                } else {
                    const email = authData.email;
                    const user = User.findOne({email: email}, function (err, user) {
                        if (user) {
                            next();
                        } else {
                            res.json({
                                message: "Unauthorized access",
                            });
                        }
                    });
                }
            });
        } else {
            res.json({message: "Give a Valid Token"});
        }
    },
    findUserByEmail: async (req, res) => {
        const user = await User.findOne({email: req.params.email});
        if (user) {
            return res.json(user);
        } else {
            res.status(404).json({message: "Not Found"});
        }
    },
    findUserById: async (req, res) => {
        const user = await User.findOne({_id: req.params.id});
        if (user) {
            return res.json(user);
        } else {
            res.status(404).json({message: "Not Found"});
        }
    },
    EmailExist: async (req, res) => {
        const {email} = req.params
        const isUserFound = await User.findOne({email});

        if (isUserFound) {
            return res.json({exist: true});
        }
        return res.json({exist: false});
    },

    forgotPassword: async (req, res) => {
        const {resetCode, email} = req.body;

        let user = await User.findOne({email})

        if (user) {
            await sendOTP(req.body.email, resetCode)

            res.status(200).send({
                message: "L'email de reinitialisation a été envoyé a " + user.email,
            })
        } else {
            res.status(404).send({message: "User innexistant"})
        }
    },

    updatePassword: async (req, res) => {
        const {email, newPassword} = req.body

        if (newPassword) {
            let user = await User.findOneAndUpdate(
                {email: email},
                {
                    $set: {
                        password: md5(newPassword),
                    },
                }
            )

            return res.send({message: "Password updated successfully", user})
        } else {
            return res.status(403).send({message: "Password should not be empty"})
        }
    },

    sendMailForgetPassword: async (req, res) => {
        const {email} = req.params;
        console.log(email)

        const isUserFound = await User.findOne({email})

        if (!isUserFound) {
            return res.status(404).json({created: false, message: "Email not Exist"});
        }

        var random_number = Math.floor(Math.random() * 10000);
        console.log(random_number.toString());

        await User.updateOne({email}, {resetpwd: random_number.toString()})

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'memegenerator206@gmail.com',
                pass: 'mebanearonafk12'
            }
        });
        let mailOptions = {
            from: 'memegenerator206@gmail.com',
            to: isUserFound.email,
            subject: 'Rest Password',
            text: 'code of reset password is ' + random_number
        };
        await transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('Email Sent');
            }
        });

        return res.send("Mail reset password sent successfully: " + isUserFound.email);
    },
    checkKeyReset: async (req, res) => {
        const {email} = req.params
        const {resetpwd} = req.params
        const isUserFound = await User.findOne({email});

        if (isUserFound) {
            console.log(isUserFound.resetpwd)
            console.log(resetpwd)
            if (isUserFound.resetpwd == resetpwd) {
                return res.json({key: true});
            }
            return res.json({key: false});
        }
        return res.json({key: false});
    },

    sendModifiedPassword: async (req, res) => {
        const {email} = req.params;
        const {password} = req.params;
        console.log(email)

        const isUserFound = await User.findOne({email})

        if (!isUserFound) {
            return res.status(404).json({created: false, message: "Email not Exist"});
        }
        await User.updateOne({email}, {resetpwd: "", password: md5(password)})
        return res.send("Password was reset Successfully: " + isUserFound.email);
    },

    index: (req, res, next) => {

        User.find()
            .then(response => {

                res.json({
                    response
                })
            })
            .catch(error => {
                res.json({
                    message: 'an error has occured'
                })
            })

    }
}


async function sendOTP(email, codeDeReinit) {
    await sendEmail({
        from: 'meme.legends.app@gmail.com',
        to: email,
        subject: "Password reset",
        html:
            "<h3>You have requested to reset your password</h3><p>Your reset code is : <b style='color : blue'>" +
            codeDeReinit +
            "</b></p>",
    })
}


function sendEmail(mailOptions) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'meme.legends.app@gmail.com',
            pass: 'meme-cred'
        },
    })

    transporter.verify(function (error, success) {
        if (error) {
            console.log(error)
            console.log("Server not ready")
        } else {
            console.log("Server is ready to take our messages")
        }
    })

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log("Email sent: " + info.response)
        }
    })
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

    let id = req.que.id
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


