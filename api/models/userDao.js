const appDataSource = require("./dataSource");

const checkUserDuplicacy = async (socialId) => {
  const [result] = await appDataSource.query(
    `SELECT EXISTS(
      SELECT 
      social_id
      FROM users
      WHERE social_id =? ) AS registered
      `,
    [socialId]
  );
  return !!parseInt(result.registered);
};

const getUserBySocialId = async (socialId) => {
  const [result] = await appDataSource.query(
    `SELECT
    id,
    social_id AS socialId,
    social_nickname AS nickname,
    social_profile_image AS profileImage
    FROM users
    WHERE social_id=?`,
    [socialId]
  );
  return result;
};

const createUser = async (
  kakaoId,
  nickname,
  profileImage,
  email,
  point,
  socialType
) => {
  return appDataSource.query(
    `INSERT INTO users(
    social_id,
    social_nickname,
    social_profile_image,
    social_email,
    point,
    social_type_id)
    VALUES (?,?,?,?,?,?)`,
    [kakaoId, nickname, profileImage, email, point, socialType]
  );
};

const getUserById = async (id) => {
  const [result] = await appDataSource.query(
    `SELECT
    id,
    social_id AS socialId,
    social_nickname AS nickname,
    social_profile_image AS profileImage,
    social_email AS email,
    point
    FROM users
    WHERE id=?`,
    [id]
  );
  return result;
};

module.exports = {
  checkUserDuplicacy,
  getUserBySocialId,
  createUser,
  getUserById,
};
