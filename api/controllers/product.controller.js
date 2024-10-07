const Product = require('../../models/product.model');

module.exports.getProducts = async (req, res) => {
    try {
        const find = {deleted: false};
        const sort = {};
        let limit = 20;

        if (req.body.filters) {
            const {filters} = req.body;
            if (filters.category) {
                find.category = filters.category;
            }
            if (filters.brand) {
                find.brand = filters.brand;
            }
        }

        if (req.body.sort) {
            const [sortKey, sortOrder] = req.body.sort.split('-');
            sort[sortKey] = sortOrder === 'asc' ? 1 : -1;
        } else {
            sort.createdAt = -1;
        }

        if (req.body.limit) {
            limit = req.body.limit;
        }

        const products = await Product.find(find).sort(sort).limit(limit);
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports.getProductBtId = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findOne({_id: id, deleted: false});
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        res.status(200).json({
            success: true,
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product: newProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports.updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findOne({_id: id, deleted: false});
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        await Product.updateOne({_id: id}, req.body);
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports.deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findOne({_id: id, deleted: false});
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        await Product.updateOne({_id: id}, {deleted: true});
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}