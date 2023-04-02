const appDataSource = require("./dataSource");
const { productQueryBuilder } = require("./productQueryBuilder");

const getProductData = async (limit, offset) => {
  const filterQuery = new productQueryBuilder(limit, offset).build();

  const productData = await appDataSource.query(
    `SELECT
  p.id,
  p.image_url AS imageUrl,
  p.name,
  p.discount_rate,
  ROUND(p.price * (1 - (p.discount_rate / 100))) AS discountPrice
  FROM products AS p
  ${filterQuery}
  `
  );
  return productData;
};

const getProductById = async (productId) => {
  return await appDataSource.query(
    `
        SELECT
            products.id,
            products.image_url,
            products.name,
            products.color,
            products.discount_rate,
            products.stock,
            round(products.price) as price,
            round(products.price * (1 - (discount_rate / 100))) as discountPrice
        from products
        WHERE products.id = ?
        `,
    [productId]
  );
};

module.exports = {
  getProductData,
  getProductById,
};
