const { cartDao } = require("../models");

const deleteCart = async (cartId, userId) => {
    return cartDao.getDeleteCart(cartId, userId);
};

const getCart = async (userId) => {
    return cartDao.getUserCart(userId);
}

const updateCart = async (productId, quantity, userId) => {

    try {
        const { quantity } = req.body;

        if ( quantity > products.stock ) {
            const error = new Error ('STOCK_INVALID');
            error.statusCode = 400
            throw error
        }
    }
    catch (err) {
        return res.status(201).json({ userId });
    }

    return cartDao.getUpdateCart(productId, quantity, userId);
}

const createCart = async (productId, userId, quantity) => {
    return cartDao.createCart(productId, userId, quantity);
};

module.exports = {
    deleteCart,
    getCart,
    updateCart,
    createCart
}