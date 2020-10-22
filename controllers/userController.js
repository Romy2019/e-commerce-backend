const express = require('express');
const userModel = require("../models/userModel");
const BodyParser = require("body-parser");
const Mongoose = require("mongoose");
var nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken');
const TOKEN_SECRET = "D0dKsugPi5r}Viv";
const Bcrypt = require("bcryptjs");
const { ExpectationFailed } = require('http-errors');

function generateJWT(_id, email, role, username) {
    const token = jwt.sign({ userId: _id, email: email, role: role, username: username }, TOKEN_SECRET);
    return token;
}

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'romy@ateamindia.com',
        pass: 'Romy@123'
    }
});


exports.registerUser = async function (req, res) {
    try {
        var data = req.body
        if (!data.userName || !data.email) {
            return res.status(400).send({ message: "enter userName and email", result: [] })
        }
        if (!data.password) {
            data.password = Date.now()
        }
        if (data.password && data.userName && data.email) {
            var password = data.password
            data.password = Bcrypt.hashSync(data.password, 10);
            const userAdd = new userModel.Users(data);

            await userAdd.save(function (err, success) {
                if (err) {
                    res.status(400).send({ message: err, result: [] })
                } else {
                    var mailOptions = {
                        from: 'romy@ateamindia.com',
                        to: data.email,
                        subject: 'Ecommerce Application',
                        html: '<p>Hi ' + data.firstName + ',</p><p>Your registration has been successfull.\.</p>' +
                            '<p><b>Your username is: <i>' + data.userName + '</i></b></p>' +
                            '<p><b>Your password is:<i>' + password + '<i><b></p>',
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            res.status(400).send({ message: error, result: [] })
                        } else {
                            return res.status(200).send({ message: "successfullyCreatedUser", result: success })
                        }
                    });

                }
            });
        }
    }
    catch (e) {
        res.status(500).send({ message: e.message, result: [] })
    }
}

exports.logIn = async function (req, res) {
    var userData = req.body
    try {
        if (!userData.userName || !userData.password) {

            return res.status(400).send({ message: "enter valid userName and Password", result: [] })
        }
        else {
            await userModel.Users.find({ 'userName': userData.userName }, (err, docs) => {
                console.log(docs);
                if (err) {
                    return res.status(400).send({ message: err.message, result: [] })
                }
                //if user found.
                if (docs.length < 1 || docs == undefined || docs.length > 1) {
                    return res.status(400).send({ message: "invalid userName", result: [] })
                }
                else {
                    if (Bcrypt.compareSync(userData.password, docs[0].password)/*docs[0].password === userlog.password*/) {
                        const token = generateJWT(docs[0]._id, docs[0].email, docs[0].role, docs[0].userName);
                        let result = {
                            userName: userData.userName,
                            token: token
                        };
                        return res.status(200).send({ message: "succesfully Logged in", result: result })

                    } else {
                        return res.status(400).send({ message: "invalid Password", result: [] })
                    }
                }
            });
        }
    }
    catch (e) {
        return res.status(400).send({ message: e.message, result: [] })
    }

};

exports.listUsers = async function (req, res) {

    try {
        var userData = req.user
        if (userData.role == 'admin') {
            await userModel.Users.find({}, (err, docs) => {
                if (err) {
                    return res.status(400).send({ message: err.message, result: [] })
                }
                return res.status(200).send({ message: "successfully listing users", result: docs })
            })
        }
        else {
            return res.status(400).send({ message: "cannot list users", result: [] })
        }
    }
    catch (e) {
        return res.status(400).send({ message: e.message, result: [] })
    }
}

exports.deleteUsers = async function (req, res) {

    try {
        var userData = req.user
        if (userData.role == 'admin') {
           var deleteUser =await userModel.Users.update({_id: req.params.id },{ activeStatus: false }) 
           if (deleteUser.nModified==1){
            return res.status(200).send({ message: "user deleted", result:deleteUser })  
           }
           else{
            return res.status(400).send({ message: "cannot delete user", result: [] })
           }
        }
        else {
            return res.status(400).send({ message: "cannot delete users", result: [] })
        }
    }
    catch (e) {
        return res.status(400).send({ message: e.message, result: [] })
    }
}

exports.editUser = async function (req, res) {

    try {
        var userData = req.body
        if (userData) {
           var editUser =await userModel.Users.update({_id: req.params.id },{userData}) 
           if (editUser.nModified==1){
            return res.status(200).send({ message: "edited user Data", result:editUser })  
           }
           else{
            return res.status(400).send({ message: "cannot edit user", result: [] })
           }
        }
        else {
            return res.status(400).send({ message: "cannot edit users", result: [] })
        }
    }
    catch (e) {
        return res.status(400).send({ message: e.message, result: [] })
    }
}