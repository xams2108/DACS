const thirdwebAuth = require('../config/thirdwebAuth');
const User = require('../model/user.model');

/**
 * Middleware xác thực socket.io với Thirdweb Auth
 */
module.exports = async (socket, next) => {
  try {
    const jwt = socket.handshake.auth?.token;
    if (!jwt) {
      console.warn('🔒 No token provided');
      return next(new Error('Unauthorized: No token'));
    }

    const authResult = await thirdwebAuth.verifyJWT({ jwt });
    if (!authResult?.valid || !authResult.parsedJWT?.sub) {
      console.warn('🔐 Invalid or malformed token');
      return next(new Error('Unauthorized: Invalid token'));
    }

    const address = authResult.parsedJWT.sub;
    const user = await User.findOne({address});
    if (!user) {
      console.warn(`👤 User not found for address: ${address}`);
      return next(new Error('Unauthorized: User not found'));
    }

    // Gán user vào socket
    socket.user = user;

    // Thành công
    next();
  } catch (err) {
    console.error('❌ Socket authentication error:', err.message);
    next(new Error('Unauthorized: Authentication failed'));
  }
};
