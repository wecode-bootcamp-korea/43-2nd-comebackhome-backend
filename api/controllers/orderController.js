const orderService = require("../services/orderService");
const { catchAsync } = require("../utils/error");

const getOrderList = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const orderList = await orderService.getOrderList(userId);

  return res.status(200).json({ orderList });
});

const createPayment = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { receiverName, receiverPhoneNumber, receiverAddress } = req.body;

  if (!receiverName || !receiverPhoneNumber || !receiverAddress) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;

    throw error;
  }

  await orderService.createPayment(
    userId,
    receiverName,
    receiverPhoneNumber,
    receiverAddress
  );

  return res.status(201).json({ message: "SUCCESS_PAYMENT" });
});
module.exports = {
  getOrderList,
  createPayment,
};
