const Review = require('../../models/review.model');

module.exports.getReviews = async (req, res) => {
    try {
        const {productId} = req.params.id;
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