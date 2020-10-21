const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: { type: String },
    vendorId: { type: String},
    count: { type: String},
    price: { type: String},
    category: { type: String},
    image: {type: String},
    description: { type: String },
   
});

module.exports = mongoose.model('Products', productSchema);