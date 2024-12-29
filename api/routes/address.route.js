const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address.controller');

router.get('/:id', addressController.getAddress);

router.post('/add', addressController.addAddress);

router.patch('/update/:id', addressController.updateAddress);

router.delete('/delete/:id', addressController.deleteAddress);

module.exports = router;