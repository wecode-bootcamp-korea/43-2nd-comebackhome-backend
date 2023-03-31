const { productDao } = require("../models");

const getProductById = async (productId) => {
    return await productDao.getProductById(productId);
}

module.exports = {
    getProductById,
};