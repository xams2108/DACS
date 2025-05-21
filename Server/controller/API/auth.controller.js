const authService = require('../../services/auth.service');

// GET /auth/login
exports.getLoginPayload = async (req, res) => {
    try {
        const result = await authService.generateLoginPayload(req.query);
        res.send(result);
    } catch (error) {
        console.error('Error getting login payload:', error);
        res.status(400).send(error.message);
    }
};

// POST /auth/login
exports.postLogin = async (req, res) => {
    try {
        const result = await authService.loginUser(req.body);
        res.status(200).send({ token: result.token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(400).send(error.message);
    }
};

// GET /auth/isLoggedIn
exports.isLoggedIn = async (req, res) => {
    try {
        const isLoggedIn = await authService.checkLoggedIn(req.cookies?.jwt);
        res.send(isLoggedIn);
    } catch (error) {
        console.error('Error checking login status:', error);
        res.status(400).send(error.message);
    }
};

// GET /auth/logout
exports.logout = async (req, res) => {
    try {
        await authService.logoutUser(res);
        res.send(true);
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(400).send(error.message);
    }
};
