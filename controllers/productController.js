const express = require('express');
const userModel = require("../models/userModel");
const productModel = require("../models/productModel")
const BodyParser = require("body-parser");
const Mongoose = require("mongoose");


exports.addProduct = function (req, res) {
    try {
        var userData = req.user
        var data = req.body
        if (!data) {
            return res.status(400).send({ message: "please add product", result: [] })
        }
        if (userData.role == 'admin' || userData.role == 'vendor') {
            const productAdd = new productModel.Products(data);
            await productAdd.save(function (err, success) {
                if (err) {
                    return res.status(400).send({ message: "please add product", result: [] })
                }
                return res.status(200).send({ message: "products added", result: success })
            })
        }
        else{
            return res.status(400).send({ message: "invalid user", result: [] })
        }

    }
    catch (e) {
        res.status(500).send({ message: e.message, result: [] })
    }
}