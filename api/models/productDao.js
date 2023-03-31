const appDataSource = require("./dataSource");

const getProductById = async (productId) => {
    return await appDataSource.query (
        `
        SELECT
            products.id,
            products.image_url,
            products.name,
            products.color,
            products.discount_rate,
            round(products.price) as price,
            round(products.price * (1 - (discount_rate / 100))) as discountPrice
        from products
        WHERE products.id = ?
        `,
        [productId]
    )
}

module.exports = {
    getProductById
}