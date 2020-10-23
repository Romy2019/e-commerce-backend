const express = require('express');
const userModel = require("../models/userModel");
const productModel = require("../models/productModel")
const BodyParser = require("body-parser");
const Mongoose = require("mongoose");


exports.addProduct = async function (req, res) {
    try {
        var userData = req.user
        var data = req.body
        console.log(userData)

        if (!data) {
            return res.status(400).send({ message: "please add product", result: [] })
        }
        if (userData.role == 'admin' || userData.role == 'vendor') {
            if (userData.role == 'vendor') {
                data.vendorId = userData.userId
            }
            console.log(data)
            const productAdd = new productModel.Products(data);
            await productAdd.save(function (err, success) {
                if (err) {
                    return res.status(400).send({ message: "please add product", result: [] })
                }
                return res.status(200).send({ message: "products added", result: success })
            })
        }
        else {
            return res.status(400).send({ message: "invalid user", result: [] })
        }

    }
    catch (e) {
        res.status(500).send({ message: e.message, result: [] })
    }
}
exports.listProducts = function (req, res) {

    try {
        var userData = req.user
        console.log(userData)
        if (userData.role == 'vendor') {
            console.log(userData.role)
            productModel.Products.find({ 'vendorId': userData.userId }, (err, docs) => {
                if (err) {
                    return res.status(400).send({ message: err.message, result: [] })
                }
                console.log(docs)
                return res.status(200).send({ message: "successfully listing products", result: docs })
            })
        }
        if (userData.role == 'customer') {
            productModel.Products.find({}, (err, docs) => {
                if (err) {
                    return res.status(400).send({ message: err.message, result: [] })
                }
                return res.status(200).send({ message: "successfully listing products", result: docs })
            })
        }

    }
    catch (e) {
        return res.status(400).send({ message: e.message, result: [] })
    }
}
exports.editProduct = async function (req, res) {
    try {
        var userData = req.user
        var data = req.body
        if (!data || !req.params.id) {
            return res.status(400).send({ message: "please cannot delete product product", result: [] })
        }
        if (userData.role == 'admin' || userData.role == 'vendor') {
            // const productAdd = new productModel.Products(data);
            var editProduct = await productModel.Products.update({ _id: req.params.id, vendorId: req.user.userId }, { $set: data })

            if (editProduct.nModified == 1) {
                return res.status(200).send({ message: "edited product ", result: editProduct })
            }
            else {
                return res.status(400).send({ message: "cannot edit product", result: [] })
            }
        }
        else {
            return res.status(400).send({ message: "user cannot remove product", result: [] })
        }

    }
    catch (e) {
        res.status(500).send({ message: e.message, result: [] })
    }
}
exports.removeProduct = function (req, res) {
    try {
        var userData = req.user
        var data = req.params.id
        if (!data) {
            return res.status(400).send({ message: " cannot delete  product", result: [] })
        }
        if (userData.role == 'admin' || userData.role == 'vendor') {
            // const productAdd = new productModel.Products(data);
            productModel.Products.remove({ _id: data}, function (err, success) {
                if (err) {
                    return res.status(400).send({ message: "cannot remove product", result: [] })
                }
                if(success.deletedCount==1){
                return res.status(200).send({ message: "product removed", result: success })
                }
            })

        }
        else {
            return res.status(400).send({ message: "user cannot remove product", result: [] })
        }

    }
    catch (e) {
        res.status(500).send({ message: e.message, result: [] })
    }
}