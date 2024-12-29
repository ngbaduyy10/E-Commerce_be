const express = require('express');
const router = express.Router();
const featureController = require('../controllers/feature.controller');
const uploadFileMiddleware = require('../middlewares/uploadFile.middleware');
const multer  = require('multer');
const upload = multer();

router.get('/', featureController.getFeatures);

router.post(
    '/create',
    upload.single('image'),
    uploadFileMiddleware.uploadFile,
    featureController.createFeature
);

module.exports = router;