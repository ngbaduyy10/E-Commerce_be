const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const uploadFileMiddleware = require('../middlewares/uploadFile.middleware');
const multer  = require('multer');
const upload = multer();

router.post('/', productController.getProducts);

router.post(
    '/create',
    upload.single('image'),
    uploadFileMiddleware.uploadFile,
    productController.createProduct
);

router.patch('/update/:id',
    upload.single('image'),
    uploadFileMiddleware.uploadFile,
    productController.updateProduct
);

router.patch('/delete/:id', productController.deleteProduct);

module.exports = router;