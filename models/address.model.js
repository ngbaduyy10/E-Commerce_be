const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    address: String,
    city: String,
    pinCode: String,
    phone: String,
    notes: String,
}, {
    timestamps: true,
})

const Address = mongoose.model('Address', addressSchema, 'address');

module.exports = Address;