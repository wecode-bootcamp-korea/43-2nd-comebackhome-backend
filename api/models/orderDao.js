const appDataSource = require("./dataSource");

const getTotalPrice = async (userId) => {
  const [cartTotalPrice] = await appDataSource.query(
    `SELECT
    (SELECT 
    ROUND(
    SUM((p.price * (1 - (p.discount_rate/100))) * carts.quantity))
    FROM carts
    INNER JOIN products AS p ON p.id = carts.product_id
    INNER JOIN users on carts.user_id = users.id
    WHERE user_id = ${userId}
    GROUP BY users.id) as totalPrice
    FROM carts
    INNER JOIN products AS p ON carts.product_id = p.id
    INNER JOIN users ON carts.user_id = users.id
    WHERE carts.user_id = ?
    `,
    [userId]
  );
  return cartTotalPrice["totalPrice"];
};

const getOrderList = async (userId) => {
  const totalPrice = await getTotalPrice(userId);
  await appDataSource.query(
    `UPDATE users
      SET point=${totalPrice}
      WHERE id = ?`,
    [userId]
  );

  const result = await appDataSource.query(
    `SELECT 
  c.id AS cartId,
  c.product_id AS productId,
  p.name AS productName,
  p.image_url AS productImage,
  p.color AS productColor,
  ROUND(p.price * (1 - (p.discount_rate/100)) * c.quantity) AS productPrice,
  c.quantity,
  u.social_nickname as nickame,
  u.social_email as email,
  (SELECT 
  ROUND(
  SUM((p.price * (1 - (p.discount_rate/100))) * carts.quantity))
  FROM carts
  INNER JOIN products AS p ON p.id = carts.product_id
  INNER JOIN users on carts.user_id = users.id
  WHERE user_id = ${userId}
  GROUP BY users.id) as totalPrice,
  Round(u.point) as point
  FROM carts AS c
  INNER JOIN products AS p ON c.product_id = p.id
  INNER JOIN users AS u ON c.user_id = u.id
  WHERE c.user_id = ?
  `,
    [userId]
  );

  return result;
};

const createPayment = async (
  userId,
  receiverName,
  receiverPhoneNumber,
  receiverAddress,
  orderNumber
) => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const cartTotalPrice = await getTotalPrice(userId);
    const order = await queryRunner.query(
      `INSERT INTO orders
      (user_id,
      receiver_name,
      receiver_phone_number,
      receiver_address,
      total_price,
      order_number)
      VALUES(?,?,?,?,?,?)
    `,
      [
        userId,
        receiverName,
        receiverPhoneNumber,
        receiverAddress,
        cartTotalPrice,
        orderNumber,
      ]
    );

    const orderId = order.insertId;

    const [currentPoint] = await queryRunner.query(
      `SELECT ROUND(point) AS point
      FROM users
      WHERE id =?`,
      [userId]
    );
    const updatePoint = Number(currentPoint["point"]) - Number(cartTotalPrice);

    await queryRunner.query(
      `UPDATE users
      SET point=?
      WHERE id=?`,
      [updatePoint, userId]
    );

    const carts = await queryRunner.query(
      `SELECT
    c.product_id,
    c.quantity
    FROM carts AS c
    INNER JOIN products AS p ON p.id=c.product_id
    INNER JOIN users AS u ON u.id = c.user_id
    WHERE c.user_id=?`,
      [userId]
    );

    const orderItems = carts.map((cart) => [
      cart.product_id,
      cart.quantity,
      orderId,
    ]);
    await queryRunner.query(
      `INSERT INTO order_items
      (product_id,product_quantity,order_id)
      VALUES ?`,
      [orderItems]
    );

    await queryRunner.query(
      `DELETE
        FROM carts
        WHERE user_id=?`,
      [userId]
    );

    const [products] = await queryRunner.query(
      `SELECT
      JSON_ARRAYAGG(
        JSON_OBJECT
        (
          "productId" , oi.product_id,
          "quantity" , oi.product_quantity
        )
      ) AS productId 
      FROM order_items AS oi
      INNER JOIN orders AS o ON o.id=oi.order_id
      WHERE o.id = ?`,
      [orderId]
    );

    for (let i = 0; i < products["productId"].length; i++) {
      const quantityResult = products["productId"][i]["quantity"];
      const productResult = products["productId"][i]["productId"];

      await queryRunner.query(
        `
      UPDATE products
      SET stock = stock - ?
      WHERE id = ?
      `,
        [quantityResult, productResult]
      );
    }

    await queryRunner.commitTransaction();
  } catch (err) {
    queryRunner.rollbackTransaction();
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  } finally {
    await queryRunner.release();
  }
};

module.exports = {
  getTotalPrice,
  getOrderList,
  createPayment,
};
