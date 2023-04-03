const express = require("express");
const { commentController } = require("../controllers");
const { loginRequired } = require("../utils/auth");
const router = express.Router();

router.get("/:postId", commentController.getComment);
router.post("/post", loginRequired, commentController.createComment);
router.post("/reply", loginRequired, commentController.replyComment);

module.exports = router;
