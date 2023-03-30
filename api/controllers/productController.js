const { productService } = require("../services");
const { catchAsync } = require("../utils/error");

const getProductDetailById = catchAsync(async (req, res) => {
    const { productId }= req.params;

    if (!productId) {
        const error = new Error("KEY_ERROR");
            error.status = 400;

            throw error;
    }

    const data = await productService.getProductDetailById(productId);

    return res.status(200).json({ data });
})

module.exports = {
    getProductDetailById,
}