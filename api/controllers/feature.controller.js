const Feature = require('../../models/feature.model');

module.exports.getFeatures = async (req, res) => {
    try {
        const features = await Feature.find();
        res.status(200).json({
            success: true,
            message: 'Successfully fetched features',
            data: features,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports.createFeature = async (req, res) => {
    try {
        const feature = new Feature(req.body);
        await feature.save();
        res.status(201).json({
            success: true,
            message: 'Successfully created feature',
            data: feature,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}