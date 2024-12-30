const Order = require('../../models/order.model');
const Cart = require('../../models/cart.model');

module.exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('userId', 'userName email')
            .populate('items.productId')
            .populate('addressId');
        res.status(200).json({
            success: true,
            message: 'Successfully fetched all orders',
            data: orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports.getOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const order = await Order.find({ userId })
            .populate('items.productId')
            .populate('addressId');

        res.status(200).json({
            success: true,
            message: 'Successfully fetched orders',
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports.getOrderDetails = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        res.status(200).json({
            success: true,
            message: 'Successfully fetched order details',
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports.createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json({
            success: true,
            message: 'Successfully created order',
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports.updateOrderStatus = async (req, res) => {
    try {
        const {status} = req.body;
        const id = req.params.orderId;
        const order = await Order.updateOne({_id: id}, {orderStatus: status});
        res.status(200).json({
            success: true,
            message: 'Successfully updated order status',
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}