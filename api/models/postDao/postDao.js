const appDataSource = require("../dataSource");
const { postQueryBuilder } = require("./postQueryBuilder");

const getPostData = async (limit, offset, sorting, roomSizeType) => {
  const filterQuery = new postQueryBuilder(
    limit,
    offset,
    sorting,
    roomSizeType
  ).build();

  const postData = await appDataSource.query(
    `SELECT
    DISTINCT
      p.id,
      JSON_EXTRACT((
        SELECT JSON_ARRAYAGG(image_url)
        FROM post_images
        WHERE post_id = p.id
      ), '$[0]') as imageUrl,
      p.title,
      u.social_nickname AS nickname,
      u.social_profile_image AS profileImage,
      r.name AS roomSizeName,
      r.id AS roomId,
      p.room_size_type_id
      FROM posts AS p
      INNER JOIN post_images ON post_images.post_id=p.id
      INNER JOIN users AS u ON u.id=p.user_id
      INNER JOIN room_size_types AS r ON r.id=p.room_size_type_id
      ${filterQuery}`
  );

  return postData;
};

const getHouseByPostId = async (postsId) => {
  const [result] = await appDataSource.query(
    `
        SELECT
            posts.id,
            posts.title,
            posts.description,
            room_size_types.name as roomSize,
            users.social_nickname,
            users.social_profile_image,
            (SELECT JSON_ARRAYAGG(image_url)
            FROM post_images
            WHERE post_id = posts.id
          ) AS images,
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
  );
  return result;
};

module.exports = {
  getPostData,
  getHouseByPostId,
};
