const Controller = require("../controller/notify.controller")
const express = require("express")
const router = express.Router()

router.get("/", Controller.index)
module.exports = router 