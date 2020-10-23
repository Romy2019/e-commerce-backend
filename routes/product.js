var express = require('express');
var router = express.Router();
const userData=require('../controllers/userController');
const productData=require('../controllers/productController');
const middleware = require("../middleware/auth");

router.post('/addProduct',middleware(),productData.addProduct)
router.get('/listProduct',middleware(),productData.listProducts)
router.delete('/deleteProduct/:id',middleware(),productData.removeProduct)
router.put('/editProduct/:id',middleware(),productData.editProduct)

module.exports = router;