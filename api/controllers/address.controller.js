const Address = require('../../models/address.model');

module.exports.getAddress = async (req, res) => {
    try {
        const userId = req.params.id;
        const address = await Address.find({ userId });
        return res.status(200).json({
            success: true,
            data: address,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports.addAddress = async (req, res) => {
    try {
        const { userId, address, city, pinCode, phone } = req.body;
        if (!userId || !address || !city || !pinCode || !phone) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            });
        }
        const newAddress = new Address(req.body);
        await newAddress.save();
        return res.status(201).json({
            success: true,
            message: "Address added successfully",
            data: newAddress,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports.updateAddress = async (req, res) => {
    try {
        const id = req.params.id;
        const address = await Address.find({ _id: id });
        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }
        await Address.updateOne({ _id: id }, { $set: req.body });
        const data = await Address.findOne({ _id: id});
        return res.status(200).json({
            success: true,
            message: "Address updated successfully",
            data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports.deleteAddress = async (req, res) => {
    try {
        const id = req.params.id;
        const address = await Address.find({ _id: id });
        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }
        await Address.deleteOne({ _id: id });
        return res.status(200).json({
            success: true,
            message: "Address deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

