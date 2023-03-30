const express = require("express");

const { productController } = require("../controllers");

const router = express.Router();

router.get("/:productId", productController.getProductDetailById);

module.exports = router;