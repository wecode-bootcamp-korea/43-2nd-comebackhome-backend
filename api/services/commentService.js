const { commentDao } = require("../models");

const getComment = async (postId) => {
  return await commentDao.getComment(postId);
};

const createComment = async (userId, postId, contents) => {
  return await commentDao.createComment(userId, postId, contents);
};

const replyComment = async (userId, commentId, postId, contents) => {
  return await commentDao.replyComment(userId, commentId, postId, contents);
};

module.exports = {
  getComment,
  createComment,
  replyComment,
};
