const express = require("express");
const Controller = require("../controller/API/user.controller"); 
const Middleware = require("../middlewares/apiAuth.middlewares"); 
const { uploadToCloudinary } = require("../middlewares/upFiletoClound.middleware"); 

module.exports = (upload) => {
    const router = express.Router();
    router.get("/", Middleware.authUser, Controller.index);
    router.get("/jwt", Middleware.authUser, Controller.jwt);
    router.post(
        "/changeInfo",
        Middleware.authUser,
        upload.single('avatar'), 
        uploadToCloudinary("avatars"),
        Controller.ChangeInfo
    );
    router.post("/otp", Middleware.authUser, Controller.Otp);
    router.post("/verifyOtp", Middleware.authUser, Controller.VerifyOtp);
    return router; 
};