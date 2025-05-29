const Controller = require("../controller/API/user.controller")
const Middleware = require("../middlewares/auth.middware")
const express = require("express")
const router = express.Router()

router.get("/", Middleware.authUser ,Controller.index)
router.patch("/changeInfo", Middleware.authUser, Controller.ChangeInfo)
router.post("/otp",Middleware.authUser,Controller.Otp)
router.post("/verifyOtp",Middleware.authUser, Controller.VerifyOtp)

module.exports = router