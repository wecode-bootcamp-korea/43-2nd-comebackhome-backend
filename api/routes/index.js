const express = require("express");

const houseRouter = require("./houseRouter");

const router = express.Router();

router.use("/house", houseRouter);

module.exports = router;