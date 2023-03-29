const appDataSource = require("./dataSource")

const getHouseById = async (postsId) => {
    return await appDataSource.query(`
        SELECT
            posts.id,
            posts.title,
            posts.description,
            posts.user_id as userId,
            posts.room_size_type_id as roomSizeId,
            users.social_nickname,
            room_size_types.name,
            post_images.image_url
            from posts
            JOIN users ON posts.user_id = users.id
            JOIN room_size_types ON posts.room_size_type_id = room_size_types.id
            JOIN post_images (
                SELECT
                
            )image_coordinates ON post_images.id = image_coordinates.post_image_id
        WHERE posts.id = ?`,
        [postsId]
    )
}

module.exports = {
    getHouseById,
}