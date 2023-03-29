const appDataSource = require("./dataSource")

const getHouseById = async (postsId) => {
    const postData =  await appDataSource.query(
        `
        SELECT
            posts.id,
            posts.title,
            posts.description,
            posts.user_id as userId,
            posts.room_size_type_id as roomSizeId,
            users.social_nickname,
            room_size_types.name as roomSize,
            post_images.image_url
            from posts
            JOIN users ON posts.user_id = users.id
            JOIN room_size_types ON posts.room_size_type_id = room_size_types.id
            JOIN post_images ON posts.id = post_images.post_id
        WHERE posts.id = ?`,
        [postsId]
    )

    const productData = await appDataSource.query(
        `
        SELECT
            products.id,
            products.image_url,
            products.name,
            products.price
            from products
        `,
        
        postData.productData = productData


    )

    
}

module.exports = {
    getHouseById,
}