const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
    image: String,
}, {
    timestamps: true,
})

const Feature = mongoose.model('Feature', featureSchema, 'feature');

module.exports = Feature;