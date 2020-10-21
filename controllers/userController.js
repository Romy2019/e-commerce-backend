const express = require('express');
const userModel=require("../models/userModel");
const BodyParser = require("body-parser");
const Mongoose = require("mongoose");
const sgMail = require('@sendgrid/mail');
const sendgridApiKey="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"
var nodemailer = require('nodemailer');

sgMail.setApiKey(sendgridApiKey);
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = "D0dKsugPi5r}Viv";
const Bcrypt = require("bcryptjs");

function generateJWT(_id) {
    const token = jwt.sign({userId: _id}, TOKEN_SECRET);
    return token;
}

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'romy@ateamindia.com',
      pass: 'Romy@123'
    }
  });


exports.registerUser = async function(req, res) {
    try{
    var data=req.body
    if(!data.userName||!data.email){
       return res.status(400).send({message:"enter userName adn email",result:[]})
    }
    if(!data.password){
        data.password=Date.now()
    }
    if (data.password&&data.userName&&data.email){
       data.password = Bcrypt.hashSync(data.password, 10);
       const userAdd = new userModel.Users(data);

      await userAdd.save( function (err, success) {
           if (err) {
               res.status(400).send({message:err,result:[]})
           } else {
            var mailOptions = {
                from: 'romy@ateamindia.com',
                to: data.email,
                subject: 'Registration successfull',
                text: 'Hi '+ data.firstName + 'Your registration has been successfull.Your username is: '+ data.userName + ' Your password is: '+req.body.password
              };
              console.log("mailoptions",mailOptions)
            // const msg = {
            //     to: data.email,
            //     from: 'romy@ateamindia.com',
            //     subject: 'Registration successfull',
            //     html: '<p>Hi' + data.firstName + ',</p><p>Your registration has been successfull.\.</p>' +
            //     '<p><b>Your username is: <i>'+ data.userName + '</i></b></p>' +
            //     '<p><b>Your password is:<i>'+req.body.password+'<i><b></p>',
            //   };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    res.status(400).send({message:error,result:[]})
                } else {
                    return res.status(200).send({message:"successfullyCreatedUser",result:success})
                }
              }); 
          
           }
       });
    }
    }
    catch(e){
        res.status(500).send({message:e.message,result:[]})
    }
}

exports.logIn = async function (req, res) {
    var userData=req.body
    try{if (!userData.userName || !userData.password) {

        return res.status(400).send({message:"enter valid userName and Password",result:[]})
    }
    else {
        await userModel.find({'userName': userData.userName}, (err, docs) => {
            console.log(docs);
            if (err) {
                return res.status(400).send({message:err.message,result:[]})
            }
            //if user found.
            if (docs.length < 1 || docs == undefined || docs.length > 1) {
                return res.status(400).send({message:"invalid userName",result:[]})
            } 
            else {
                if (Bcrypt.compareSync(userData.password, docs[0].password)/*docs[0].password === userlog.password*/) {
                    const token =  generateJWT(docs[0]._id);
                    let result = {
                            userName: userData.userName,
                            token: token 
                    };
                    return res.status(200).send({message:"succesfully Logged in",result:result})

                } else {
                    return res.status(400).send({message:"invalid Log in",result:[]})
                }
            }
        });
    }
}
catch(e){
    return res.status(400).send({message:e.message,result:[]})
}
    
};