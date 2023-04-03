const { postService } = require("../services");
const { catchAsync } = require("../utils/error");

const getPostList = catchAsync(async (req, res) => {
  const { offset, limit, sorting, roomSizeType } = req.query;

  const posts = await postService.getPostList(
    offset,
    limit,
    sorting,
    roomSizeType
  );

  return res.status(200).json({ posts });
});

const getHouseByPostId = catchAsync(async (req, res) => {
  const { postsId } = req.params;

  if (!postsId) {
    const error = new Error("KEY_ERROR");
    error.status = 400;

    throw error;
  }

  const data = await postService.getHouseByPostId(postsId);

  return res.status(200).json({ data });
});

module.exports = {
  getPostList,
  getHouseByPostId,
};
