const Product = require('../../models/product.model');

module.exports.searchProducts = async (req, res) => {
    try {
        const { keyword } = req.params;
        if (!keyword) {
            return res.status(400).json({
                success: false,
                message: 'Keyword is required',
            });
        }

        const regex = new RegExp(keyword, 'i');
        const products = await Product.find({
            $or: [
                { name: regex },
                { description: regex },
                { category: regex },
            ],
        });
        res.status(200).json({
            success: true,
            message: 'Successfully fetched products',
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}