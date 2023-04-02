const { productDao } = require("../models");

const getProductList = async (offset, limit) => {
  const DEFAULT_OFFSET = 0;
  const DEFAULT_LIMIT = 6;

  const offsetSetting = offset ? offset : DEFAULT_OFFSET;
  const limitSetting = limit ? limit : DEFAULT_LIMIT;

  return productDao.getProductData(offsetSetting, limitSetting);
};

const getProductById = async (productId) => {
  return await productDao.getProductById(productId);
};

module.exports = {
  getProductList,
  getProductById,
};
