const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const route = require("./api/routes");
const { globalErrorHandler } = require("./api/utils/error");

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(morgan("tiny"));
  app.use(route);

  app.get("/ping", (req, res) => {
    res.status(200).json({ message: "pong" });
  });

  app.all("*", (req, res, next) => {
    const error = new Error(`Can't find ${req.originalUrl} on this server!`);
    error.statusCode = 400;

    next(error);
  });

  app.use(globalErrorHandler);

  return app;
};

module.exports = createApp;
