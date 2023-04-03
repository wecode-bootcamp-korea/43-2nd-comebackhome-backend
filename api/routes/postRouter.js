const express = require("express");
const { postController } = require("../controllers");

const router = express.Router();

router.get("", postController.getPostList);
router.get("/:postsId", postController.getHouseByPostId);

module.exports = router;
