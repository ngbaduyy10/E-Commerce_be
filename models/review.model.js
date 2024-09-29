const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    productId: String,
    userId: String,
    userName: String,
    message: String,
    rating: Number,
}, {
    timestamps: true,
})

const Review = mongoose.model('Review', reviewSchema, 'review');

module.exports = Review;