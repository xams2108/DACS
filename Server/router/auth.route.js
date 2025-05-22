const express = require("express");
const router = express.Router();
const authController = require("../controller/API/auth.controller");
router.get("/login", authController.getLoginPayload );
router.post("/login", authController.postLogin);
router.get("/isLoggedIn", authController.isLoggedIn);
router.post("/logout", authController.logout);

module.exports = router;