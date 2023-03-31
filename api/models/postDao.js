const appDataSource = require("./dataSource")

const getHouseById = async (postsId) => {
    const [result] =  await appDataSource.query(
        `
        SELECT
            posts.id,
            posts.title,
            posts.description,
            room_size_types.name as roomSize,
            users.social_nickname,
            users.social_profile_image,
            post_images.image_url,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    "productsId", products.id,
                    "productUrl", products.image_url,
                    "productName", products.name,
                    "productPrice", products.price,
                    "left", image_coordinates.pixel_row,
                    "top", image_coordinates.pixel_column
                )
            ) as productInfo
        from posts
        LEFT JOIN users ON users.id = posts.user_id
        LEFT JOIN room_size_types ON room_size_types.id = posts.room_size_type_id
        LEFT JOIN post_images ON post_images.post_id = posts.id
        LEFT JOIN image_coordinates ON image_coordinates.post_image_id = post_images.id
        LEFT JOIN products ON products.id = image_coordinates.product_id
        WHERE posts.id = ?
        GROUP BY post_images.id
        `,
        [postsId]
    )
    return result
}

module.exports = {
    getHouseById,
}
