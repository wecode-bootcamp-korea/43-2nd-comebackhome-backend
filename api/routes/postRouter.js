const express = require("express");

const { postController } = require("../controllers");

const router = express.Router();

router.get("/:postsId", postController.getHouseById);

module.exports = router;