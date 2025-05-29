const thirdwebAuth = require('../../config/thirdwebAuth');
const User = require('../../model/user.model');

// Generate login payload (GET /auth/login)
module.exports.generateLoginPayload = async ({ address, chainId }) => {
    
    if (!address) {
        throw new Error('Address is required');
    }

    return await thirdwebAuth.generatePayload({
        address,
        chainId: chainId ? parseInt(chainId) : undefined,
    });
};

// Handle user login (POST /auth/login)
module.exports.loginUser = async (payload) => {
    const verifiedPayload = await thirdwebAuth.verifyPayload(payload);
    if (!verifiedPayload.valid) {
        throw new Error('Failed to login');
    }

    const userExists = await User.findOne({ address: verifiedPayload.payload.address });
    if (!userExists) {
        const newUser = new User({
            address: verifiedPayload.payload.address,
        });
        await newUser.save();
    }

    const jwt = await thirdwebAuth.generateJWT({ payload: verifiedPayload.payload });
    return { token: jwt };
};

// Check if user is logged in (GET /auth/isLoggedIn)
module.exports.checkLoggedIn = async (jwt) => {
    if (!jwt) {
        return false;
    }

    const authResult = await thirdwebAuth.verifyJWT({ jwt });
    return authResult.valid;
};

// Logout user (GET /auth/logout)
module.exports.logoutUser = async (res) => {
    res.clearCookie("connect.sid")
};
