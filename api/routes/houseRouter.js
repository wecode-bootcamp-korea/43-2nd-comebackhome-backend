const express = require("express");

const { houseController } = require("../controllers");

const router = express.Router();

router.get("/:postsId", houseController.getHouseById);

module.exports = router;