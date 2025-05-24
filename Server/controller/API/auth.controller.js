const authService = require('../../services/API/auth.service');

// GET /auth/login
exports.getLoginPayload = async (req, res) => {
    try {
        const result = await authService.generateLoginPayload(req.query);
        return res.send(result);
    } catch (error) {
        console.error('Error getting login payload:', error);
        return res.send(error.message);
    }
};

// POST /auth/login
exports.postLogin = async (req, res) => {
    try {
        const result = await authService.loginUser(req.body);
        req.session.jwt = result.token;
        return res.status(200).send({ token: result.token });

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(400).json({ success: false, message: error.message });
    }
};

// GET /auth/isLoggedIn
exports.isLoggedIn = async (req, res) => {
    try {
        const isLoggedIn = await authService.checkLoggedIn(req.session?.jwt);
        return res.json(isLoggedIn);
    } catch (error) {
        console.error('Error checking login status:', error);
        return res.status(400).json({ success: false, message: error.message });    
    }
};

// GET /auth/logout
exports.logout = async (req, res) => {
    try {
        await authService.logoutUser(res);
        return res.json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.error('Error logging out:', error);
        return res.status(400).json({ success: false, message: error.message });
    }
};
