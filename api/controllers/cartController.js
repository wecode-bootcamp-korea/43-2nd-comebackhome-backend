const { cartService } = require("../services");
const { catchAsync } = require("../utils/error");

const deleteCart = catchAsync(async (req, res) => {
  const data = req.query;
  const userId = req.user.id;
  const cartId = data["cartId"];

  const cartDeleteResult = await cartService.deleteCart(cartId, userId);

  if (!cartId) {
    return res.status(200).json({ message: "SUCCESS_ALL_DELETE_CARTS" });
  }
  return res.status(200).json({ cartDeleteResult });
});

const getCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const carts = await cartService.getCart(userId);

  return res.status(200).json({ carts });
});

const updateCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  const updateProduct = await cartService.updateCart(
    productId,
    quantity,
    userId
  );

  if (!updateProduct) {
    return res.status(400).json({ message: "OUT_OF_STOCK" });
  }
  return res.status(201).json({ updateProduct });
});

const createCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  const createResult = await cartService.createCart(
    productId,
    userId,
    quantity
  );

  if (!createResult) {
    return res.status(400).json({ message: "OUT_OF_STOCK" });
  }
  return res.status(201).json({ message: "CREATE_CARTS" });
});

module.exports = {
  deleteCart,
  getCart,
  updateCart,
  createCart,
};
