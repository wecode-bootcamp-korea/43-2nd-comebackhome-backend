const { postDao } = require("../models");

const getPostList = async (offset, limit, sorting, roomSizeType) => {
  const DEFAULT_OFFSET = 0;
  const DEFAULT_LIMIT = 6;

  const offsetSetting = offset ? offset : DEFAULT_OFFSET;
  const limitSetting = limit ? limit : DEFAULT_LIMIT;

  return postDao.getPostData(
    offsetSetting,
    limitSetting,
    sorting,
    roomSizeType
  );
};

const getHouseByPostId = async (postsId) => {
  return await postDao.getHouseByPostId(postsId);
};

module.exports = {
  getPostList,
  getHouseByPostId,
};
