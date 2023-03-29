const jwt = require("jsonwebtoken");

const { userDao } = require("../models");

const loginRequired = async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    const error = new Error("NEED_ACCESS_TOKEN");

    return res.status(401).json({ message: error.message });
  }

  const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

  const user = await userDao.getUserById(decoded.id);

  if (!user) {
    const error = new Error("USER_DOES_NOT_EXIST");

    return res.status(404).json({ message: error.message });
  }

  req.user = user;
  next();
};

module.exports = { loginRequired };
