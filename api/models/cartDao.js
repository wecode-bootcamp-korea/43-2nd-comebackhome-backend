const appDataSource = require("./dataSource");

const deleteAllCart = async (userId) => {
  await appDataSource.query(
    `
    DELETE FROM carts
    WHERE user_id=? 
    `,
    [userId]
  );
  return getUserCart(userId);
};

const deleteSelectedCart = async (cartId, userId) => {
  await appDataSource.query(
    `
    DELETE FROM carts
    WHERE id IN (?) AND user_id=? 
    `,
    [cartId, userId]
  );
  return getUserCart(userId);
};

const getUserCart = async (userId) => {
  const result = await appDataSource.query(
    `
        SELECT
        carts.id as cartId,
        users.id as userId,
        products.id as productId,
        products.name as productName,
        products.color as productColor,
        products.stock as productStock,
        products.image_url as productImage,
        carts.quantity,
        round((products.price * (1 - (products.discount_rate / 100))) * carts.quantity) as productPrice,
        (SELECT
          ROUND(SUM(products.price * carts.quantity))
          from carts
          INNER JOIN products ON products.id = carts.product_id
          INNER JOIN users on carts.user_id = users.id
          WHERE carts.user_id = ${userId}
          ) as totalProductPrice,
        (SELECT
          ROUND(SUM(products.price * (products.discount_rate / 100) * carts.quantity))
          from carts
          INNER JOIN products ON products.id = carts.product_id
          INNER JOIN users on carts.user_id = users.id
          WHERE carts.user_id = ${userId}
          ) as totalDiscountPrice,
        (SELECT
          ROUND(SUM((products.price * (1 - (products.discount_rate / 100))) * carts.quantity))
          from carts
          INNER JOIN products ON products.id = carts.product_id
          INNER JOIN users on carts.user_id = users.id
          WHERE user_id = ${userId}
          ) as cartTotalPrice 
        FROM carts
        INNER JOIN users ON users.id = carts.user_id
        INNER JOIN products ON products.id = carts.product_id
        WHERE carts.user_id=?
        `,
    [userId]
  );
  return result;
};

const getStock = async (productId) => {
  const [stock] = await appDataSource.query(
    `SELECT
      p.stock
      FROM products AS p
      WHERE p.id=?`,
    [productId]
  );
  return stock["stock"];
};

const getUpdateCart = async (productId, quantity, userId) => {
  await appDataSource.query(
    `
    UPDATE carts
    SET quantity=?
    WHERE product_id=? AND user_id=?
    `,
    [quantity, productId, userId]
  );
  return getUserCart(userId);
};

const createCart = async (productId, userId, quantity) => {
  const result = await appDataSource.query(
    `
    INSERT INTO carts (
    product_id,user_id,quantity)
    VALUES (?, ?, ?);
    `,
    [productId, userId, quantity]
  );
  return !!result;
};

module.exports = {
  deleteAllCart,
  deleteSelectedCart,
  getUserCart,
  getStock,
  getUpdateCart,
  createCart,
};
