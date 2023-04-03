const appDataSource = require("./dataSource");
const userDao = require("./userDao");
const postDao = require("./postDao/postDao");
const productDao = require("./productDao/productDao");
const commentDao = require("./commentDao");
const cartDao = require("./cartDao");
const orderDao = require("./orderDao");

module.exports = {
  appDataSource,
  userDao,
  postDao,
  productDao,
  commentDao,
  cartDao,
  orderDao,
};
