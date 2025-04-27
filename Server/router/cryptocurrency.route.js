const Controller = require("../controller/chart/cryptocurrency.controller")
const express = require("express")
const router = express.Router()

router.get("/", Controller.index)
router.get("/chart", Controller.chart)
module.exports = router 