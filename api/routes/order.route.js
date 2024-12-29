const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.get('/', orderController.getAllOrders);

router.get('/:userId', orderController.getOrders);

router.get('/detail/:orderId', orderController.getOrderDetails);

router.post('/create', orderController.createOrder);

router.patch('/update/:orderId', orderController.updateOrderStatus);

module.exports = router;