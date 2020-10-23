var express = require('express');
var router = express.Router();
const userData=require('../controllers/userController')
const productData=require('../controllers/productController')
const purchaseData=require('../controllers/purchaseController')
const middleware = require("../middleware/auth");


// router.post('/order',orderData)

module.exports = router;
