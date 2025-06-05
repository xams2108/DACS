const Controller = require("../controller/API/news.controller")
const express = require("express")
const router = express.Router()

router.get("/", Controller.index )
router.get("/:category", Controller.index )

module.exports = router 