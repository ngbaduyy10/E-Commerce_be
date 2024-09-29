const jwt = require("jsonwebtoken");

module.exports.jwtToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role,
            email: user.email,
            userName: user.userName,
        },
        process.env.SECRET_JWT,
        {
            expiresIn: '1d'
        }
    );
};
