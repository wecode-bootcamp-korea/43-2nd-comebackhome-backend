const express = require("express");
const userRouter = require("./userRouter");
const postRouter = require("./postRouter");
const productRouter = require("./productRouter");
const commentRouter = require("./commentRouter");
const cartRouter = require("./cartRouter");
const orderRouter = require("./orderRouter");

const router = express.Router();

router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/products", productRouter);
router.use("/comments", commentRouter);
router.use("/carts", cartRouter);
router.use("/orders", orderRouter);

module.exports = router;
