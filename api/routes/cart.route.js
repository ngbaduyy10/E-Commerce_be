const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.post('/add', cartController.addToCart);

router.get('/:id', cartController.getCartItems);

router.patch('/update', cartController.updateCart);

router.patch('/delete', cartController.deleteCartItem);

module.exports = router;