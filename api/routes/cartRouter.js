const express = require("express");
const { cartController } = require("../controllers");
const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.delete("", loginRequired, cartController.deleteCart);
router.get("/:userId", cartController.getCart);
router.patch("/:userId/:productId", cartController.updateCart);
router.post("", cartController.createCart);

module.exports = router;