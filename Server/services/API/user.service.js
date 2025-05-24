const thirdwebAuth = require('../../config/thirdwebAuth');
const User = require("../../model/user.model");

exports.getDataUser = async (jwt) => {
    if (!jwt) {
        throw new Error("Unauthorized");
    }
    const authResult = await thirdwebAuth.verifyJWT({ jwt });
    if (!authResult.valid) {
        throw new Error("Unauthorized");
    }

    const user = await User.findOne({ address: authResult.parsedJWT.sub });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};
