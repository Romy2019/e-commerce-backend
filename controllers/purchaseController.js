const express = require('express');
const userModel = require("../models/userModel");
const productModel = require("../models/productModel")
const BodyParser = require("body-parser");
const Mongoose = require("mongoose");



exports.purchaseOrder = async function (req, res) {
    try {
        var userData = req.user
        var data = req.body
        console.log(userData)

        if (!data) {
            return res.status(400).send({ message: "please add purchase product", result: [] })
        }
        if(userData.activeStatus==true){
            if(!data.mobile||!data.address){
                return res.status(400).send({ message: "please add mobile and address", result: [] }) 
            }
            
        }
    }
    catch (e) {
        res.status(500).send({ message: e.message, result: [] })
    }
}