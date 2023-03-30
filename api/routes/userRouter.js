const express = require("express");
const { userController } = require("../controllers");

const router = express.Router();

router.post("/kakao/login", userController.loginSocial);

module.exports = router;
