const { orderDao } = require("../models");
const { randomOrderNumber } = require("../utils/orderNumber");

const getOrderList = async (userId) => {
  return await orderDao.getOrderList(userId);
};

const createPayment = async (
  userId,
  receiverName,
  receiverPhoneNumber,
  receiverAddress
) => {
  const orderNumber = await randomOrderNumber();
  return await orderDao.createPayment(
    userId,
    receiverName,
    receiverPhoneNumber,
    receiverAddress,
    orderNumber
  );
};

module.exports = {
  getOrderList,
  createPayment,
};
