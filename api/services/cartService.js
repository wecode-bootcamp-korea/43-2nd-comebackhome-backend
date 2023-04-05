const { cartDao } = require("../models");

const deleteCart = async (cartId, userId) => {
  if (!cartId) {
    return cartDao.deleteAllCart(userId);
  }
  return cartDao.deleteSelectedCart(cartId, userId);
};

const getCart = async (userId) => {
  return cartDao.getUserCart(userId);
};

const updateCart = async (productId, quantity, userId) => {
  const productStock = await cartDao.getStock(productId);
  if (quantity > productStock) {
    return false;
  }

  return cartDao.getUpdateCart(productId, quantity, userId);
};

const createCart = async (productId, userId, quantity) => {
  const productStock = await cartDao.getStock(productId);
  if (quantity > productStock) {
    return false;
  }

  return cartDao.createCart(productId, userId, quantity);
};

module.exports = {
  deleteCart,
  getCart,
  updateCart,
  createCart,
};
