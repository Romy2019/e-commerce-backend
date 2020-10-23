const mongoose = require('mongoose');

const purchaseSchema = mongoose.Schema({
    customerId: { type: String },
    vendorId: { type: String},
    productId: { type: String},
    quantity :{ type: String},
    price: { type: String},
    date: {type: String,default: Date.now},
    orderStatus: { type: String },
   
});


var Purchase = mongoose.model('Purchases', purchaseSchema);
module.exports = { Purchase };