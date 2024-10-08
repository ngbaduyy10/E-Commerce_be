const Cart = require('../../models/cart.model');

module.exports.addToCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            const newCart = new Cart({
                userId,
                items: [{ productId, quantity: 1 }],
            });
            await newCart.save();
            await newCart.populate('items.productId', 'image title price salePrice');
            return res.status(201).json({
                success: true,
                message: "Added to cart successfully",
                data: newCart,
            });
        } else {
            const index = cart.items.findIndex((item) => item.productId.toString() === productId);
            if (index !== -1) {
                cart.items[index].quantity++;
            } else {
                cart.items.push({ productId, quantity: 1 });
            }
            await cart.save();
            await cart.populate('items.productId', 'image title price salePrice');
            return res.status(200).json({
                success: true,
                message: "Added to cart successfully",
                data: cart,
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports.getCartItems = async (req, res) => {
    try {
        const userId = req.params.id;
        const cart = await Cart.findOne({ userId }).populate('items.productId', 'image title price salePrice');
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports.updateCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }
        const index = cart.items.findIndex((item) => item.productId.toString() === productId);
        if (index === -1) {
            cart.items.push({ productId, quantity });
        } else {
            cart.items[index].quantity = quantity;
        }
        await cart.save();
        await cart.populate('items.productId', 'image title price salePrice');
        return res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports.deleteCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }
        const index = cart.items.findIndex((item) => item.productId.toString() === productId);
        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }
        cart.items.splice(index, 1);
        await cart.save();
        await cart.populate('items.productId', 'image title price salePrice');

        return res.status(200).json({
            success: true,
            message: "Item removed from cart successfully",
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}