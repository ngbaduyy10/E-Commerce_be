const Review = require('../../models/review.model');

module.exports.getReviews = async (req, res) => {
    try {
        const productId = req.params.id;
        const reviews = await Review.find({productId});
        res.status(200).json({
            success: true,
            data: reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports.addReview = async (req, res) => {
    try {
        const {productId, userId, userName, message, rating} = req.body;
        const newReview = new Review({
            productId,
            userId,
            userName,
            message,
            rating
        });
        await newReview.save();
        res.status(201).json({
            success: true,
            message: 'Review added successfully',
            data: newReview
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}