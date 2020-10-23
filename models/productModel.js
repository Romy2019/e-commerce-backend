const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: { type: String },
    vendorId: { type: String},
    count: { type: String},
    price: { type: String},
    category: { type: String},
    image: { 
        data: Buffer, 
        contentType: String 
     },
    description: { type: String },
    color:{ type: String },
    size :{ type: String }
   
});
var Products = mongoose.model('Products', productSchema);
module.exports = { Products };