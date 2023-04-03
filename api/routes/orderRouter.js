const express = require("express");
const { orderController } = require("../controllers");
const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.get("", loginRequired, orderController.getOrderList);
router.post("", loginRequired, orderController.createPayment);

module.exports = router;
