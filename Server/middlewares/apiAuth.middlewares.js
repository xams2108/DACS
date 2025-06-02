// middlewares/authUser.js
const thirdwebAuth = require('../config/thirdwebAuth');
const User = require('../model/user.model');

module.exports.authUser = async (req, res, next) => {
  try {
    const jwt = req.session?.jwt;

    if (!jwt) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const authResult = await thirdwebAuth.verifyJWT({ jwt });

    if (!authResult.valid) {
      return res.status(401).json({ message: 'Unauthorized2' });
    }

    const address = authResult?.parsedJWT?.sub;

    const user = await User.findOne({ address });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
