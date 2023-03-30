const { productDao } = require("../models");

const getProductDetailById = async (productId) => {
    return await productDao.getProductDetailById(productId);
}

module.exports = {
    getProductDetailById,
};