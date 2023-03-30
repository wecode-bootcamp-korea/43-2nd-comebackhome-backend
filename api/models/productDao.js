const appDataSource = require("./dataSource")

const getProductDetailById = async(productId) => {
    return await appDataSource.query (
    `
    SELECT
        products.id,
        products.image_url,
        products.name,
        round(products.price * (discount_rate / 100 )) as price,
        products.discount_rate,
        products.color
        from products
        WHERE products.id = ?
    `,
    [productId]
    )
}

module.exports = {
    getProductDetailById
}