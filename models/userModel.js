const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({

    email: { type: String, required: true, lowercase: true, unique: true },
    userName: { type: String },
    password: { type: String, required: true },
    firstName: { type: String, },
    lastName: { type: String, },
    gender: { type: String, enum: ['male', 'female', 'Others'] },
    dob: { type: Date, default: Date.now },
    city: { type: String, default: 'Not Given' },
    state: { type: String, default: 'Not Given' },
    zip: { type: Number, default: 0 },
    mobile: { type: Number, required: true },
    country: { type: String, default: 'india' },
    address: { type: String, default: 'Not Given' },
    activeStatus: { type: Boolean, default: false },
    role: { type: String, default: 'customer' },
    registeredDate: { type: Date, default: Date.now }
});

var Users = mongoose.model('Users', userSchema);
module.exports = { Users };
