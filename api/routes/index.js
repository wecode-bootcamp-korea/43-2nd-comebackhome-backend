const express = require("express");
const userRouter = require("./userRouter");
const postRouter = require("./postRouter");
const productRouter = require("./productRouter");
const commentRouter = require("./commentRouter");

const router = express.Router();

router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/products", productRouter);
router.use("/comments", commentRouter);

module.exports = router;
