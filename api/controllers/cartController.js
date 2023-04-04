const { cartService } = require("../services");
const { catchAsync } = require("../utils/error");

const deleteCart = catchAsync(async (req, res) => {
    const data = req.query;
    const userId = req.users.id;
    const cartId = data["cart.id"];

    const deleteProduct = await cartService.deleteCart(cartId, userId);
    return res.status(201).json({ deleteProduct });
});

const getCart = catchAsync(async (req, res) => {
    const userId = 1;

    const carts = await cartService.getCart(userId);

    return res.status(200).json({ carts });
})

const updateCart = catchAsync(async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = 1;

    const updateProduct = await cartService.updateCart(productId, quantity, userId);
    return res.status(201).json({ updateProduct });
})

const createCart = catchAsync(async (req, res) => {
    const userId = 1;
    const { productId, quantity } = req.body;

    await cartService.createCart(productId, userId, quantity);
    
    return res.status(201).json({ message : " CREATE_CART "});
});

module.exports = {
    deleteCart,
    getCart,
    updateCart,
    createCart
}