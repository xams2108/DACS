const Controller = require("../controller/API/order.controller")
const express = require("express")
const Middleware = require("../middlewares/apiAuth.middlewares")
const router = express.Router()

router.get("/", Middleware.authUser ,Controller.index)
router.post("/postOrder",Middleware.authUser ,Controller.postOrder)
router.delete("/deleteOrder/:id",Middleware.authUser ,Controller.deleteOrder )
module.exports = router 