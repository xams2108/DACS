const Controller = require("../controller/API/notify.controller")
const express = require("express")
const Middleware = require("../middlewares/auth.middware")
const router = express.Router()

router.get("/", Middleware.authUser ,Controller.index)
router.post("/postOrder",Middleware.authUser ,Controller.postOrder)
module.exports = router 