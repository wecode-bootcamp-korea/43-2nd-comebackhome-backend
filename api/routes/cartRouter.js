const express = require("express");
const { cartController } = require("../controllers");
const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.delete("", loginRequired, cartController.deleteCart);
router.get("", loginRequired, cartController.getCart);
router.patch("", loginRequired, cartController.updateCart);
router.post("", loginRequired, cartController.createCart);

module.exports = router;
