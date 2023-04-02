const { productService } = require("../services");
const { catchAsync } = require("../utils/error");

const getProductList = catchAsync(async (req, res) => {
  const { offset, limit } = req.query;
  const products = await productService.getProductList(offset, limit);

  return res.status(200).json({ products });
});

const getProductById = catchAsync(async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    const error = new Error("KEY_ERROR");
    error.status = 400;

    throw error;
  }
  const data = await productService.getProductById(productId);
  return res.status(200).json({ data });
});

module.exports = {
  getProductList,
  getProductById,
};
