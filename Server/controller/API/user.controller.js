const userService = require("../../services/API/user.service");

module.exports.index = async (req, res) => {
    const jwt = req.session.jwt;
    if (!jwt) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const user = await userService.getDataUser(jwt);;
        return res.status(200).json({ message: "User data", user });
    } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.message === "Unauthorized") {
            return res.status(401).json({ message: error.message });
        } else if (error.message === "User not found") {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};
