const appDataSource = require("./dataSource");

const getDeleteCart = async (cartId, userId) => {
    await appDataSource.query(
        `
        DELETE FROM carts
        WHERE id IN (?) AND user_id=? 
        `,
        [cartId, userId]
    );
    return getUserCart(userId);
}

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
        (
            SELECT
            round(SUM(products.price))
            from carts
            INNER JOIN products ON products.id = carts.product_id
            GROUP BY carts.id
            ) as totalProductPrice,
        (
            SELECT
            round(SUM(products.price * products.discount_rate))
            from carts
            INNER JOIN products ON products.id = carts.product_id
            GROUP BY carts.id
            ) as totalDiscountPrice,
        (
            SELECT
            round(SUM((products.price * (1 - (products.discount_rate / 100))) * carts.quantity))
            from carts
            INNER JOIN products ON products.id = carts.product_id
            GROUP BY carts.id
            ) as cartTotalPrice 
        from carts
        JOIN users ON users.id = carts.user_id
        JOIN products ON products.id = carts.product_id
        `,
        [userId]
    );
    return result;
};

const getUpdateCart = async (productId, quantity, userId) => {
    await appDataSource.query(
        `
        UPDATE carts
            SET quantity=?
            WHERE product_id=? AND user_id=?
        `,
        [productId, quantity, userId]
    );
    return getUserCart(userId);
};

const createCart = async (productId, userId, quantity) => {
    return appDataSource.query(
      `
      INSERT INTO carts (quantity, user_id, product_id)
      VALUES (?, ?, ?);
      `,
      [quantity, userId, productId]
    );
  };

module.exports = {
    getDeleteCart,
    getUserCart,
    getUpdateCart,
    createCart
}