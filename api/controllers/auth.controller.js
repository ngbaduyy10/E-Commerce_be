const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generate = require('../../helpers/generate');

module.exports.register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const userCheck = await User.findOne({ email });
        if (userCheck) {
            return res.json({
                success: false,
                message: "Email already exists"
            });
        } else {
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({
                userName,
                email,
                password: hashedPassword
            });
            await user.save();

            const token = generate.jwtToken(user);

            res.cookie("token", token, { httpOnly: true, secure: false }).status(200).json({
                success: true,
                message: "Register successful",
                user: {
                    id: user._id,
                    userName: user.userName,
                    email: user.email,
                    role: user.role,
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, deleted: false });
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.json({
                success: false,
                message: "Wrong password"
            });
        }

        const token = generate.jwtToken(user);

        res.cookie("token", token, { httpOnly: true, secure: false }).status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports.logout = async (req, res) => {
    res.clearCookie("token").status(200).json({
        success: true,
        message: "Logout successful"
    });
}

module.exports.authCheck = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({
            success: false,
            message: "User not logged in"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT);

        res.status(200).json({
            success: true,
            message: "User logged in",
            user: {
                id: decoded.id,
                userName: decoded.userName,
                email: decoded.email,
                role: decoded.role,
            }
        });
    } catch (error) {
        res.clearCookie("token").status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
}