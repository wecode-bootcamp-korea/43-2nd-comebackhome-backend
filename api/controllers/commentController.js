const { commentService } = require("../services");
const { catchAsync } = require("../utils/error");

const getComment = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const comments = await commentService.getComment(postId);

  return res.status(200).json({ comments });
});

const createComment = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { postId, contents } = req.body;

  const result = await commentService.createComment(userId, postId, contents);

  return res.status(201).json({ message: "SUCCESS_CREATE_COMMENT", result });
});

const replyComment = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { commentId, postId, contents } = req.body;

  const result = await commentService.replyComment(
    userId,
    commentId,
    postId,
    contents
  );

  return res.status(201).json({ message: "SUCCESS_COMMENT", result });
});

module.exports = {
  getComment,
  createComment,
  replyComment,
};
