const Controller = require("../controller/API/cryptocurrency.controller")
const express = require("express")
const router = express.Router()

router.get("/", Controller.index)
router.get("/price", Controller.price)
router.get("/chart/:symbol/:interval", Controller.chart)
module.exports = router 