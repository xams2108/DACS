const Controller = require("../controller/user.controller")
const express = require("express")
const router = express.Router()

router.get('/', Controller.getinfoUser);
router.post('/connect', Controller.connectWallet);
router.post('/verify', Controller.verifySignature);

module.exports = router 