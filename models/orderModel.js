const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    customerId: { type: String },
    vendorId: { type: String},
    productId: { type: String},
    quantity :{ type: String},
    price: { type: String},
    date: {type: String,default: Date.now},
    orderStatus: { type: String },
   
});

module.exports = mongoose.model('orders', orderSchema);