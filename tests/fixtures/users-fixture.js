const appDataSource = require("../../api/models/dataSource");

const createUsers = (userList) => {
  let data = [];

  for (const user of userList) {
    data.push([
      user.kakaoId,
      user.nickname,
      user.profileImage,
      user.email,
      user.point,
      user.socialType,
    ]);
  }

  return appDataSource.query(
    `INSERT INTO users(
    social_id,
    social_nickname,
    social_profile_image,
    social_email,
    point,
    social_type_id) 
    VALUES ?
  `,
    [data]
  );
};

module.exports = { createUsers };
