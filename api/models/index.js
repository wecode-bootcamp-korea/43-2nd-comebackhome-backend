const appDataSource = require("./dataSource");
const userDao = require("./userDao");
const postDao = require("./postDao");
const productDao = require("./productDao");
const commentDao = require("./commentDao");
const cartDao = require("./cartDao");

module.exports = {
  appDataSource,
  userDao,
  postDao,
  productDao,
  commentDao,
  cartDao
};
