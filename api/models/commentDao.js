const appDataSource = require("./dataSource");

const getComment = async (postId) => {
  const result = await appDataSource.query(
    `SELECT
    c.id AS commentId,
    c.post_id AS postId,
    c.content,
    u.social_nickname AS nickname,
    u.social_profile_image AS profileImage,
    rp.reply_comments,
    DATE_FORMAT(MAX(c.created_at),"%Y-%m-%d") AS date,
    (SELECT COUNT(comments.post_id)
    FROM comments
    WHERE comments.post_id=?
    GROUP BY c.id) AS postingCount
    FROM comments AS c
    INNER JOIN users AS u ON u.id=c.user_id
    LEFT JOIN (SELECT
              post_id,
              comment_id,
              JSON_ARRAYAGG(
                  JSON_OBJECT(
                    'replyId', comment_id,
                    'replynickname', u.social_nickname,
                    'replyprofileImage', u.social_profile_image,
                    'replyCommentContent', content,
                    'replyCommentDate', DATE_FORMAT(comments.created_at, '%Y-%m-%d')
                  )
              ) AS reply_comments
          FROM comments
          INNER JOIN users AS u ON u.id=comments.user_id
          GROUP BY post_id, comment_id
          ) rp ON c.id = rp.comment_id AND c.post_id = rp.post_id
WHERE c.post_id=? AND c.comment_id IS NULL
GROUP BY c.id, rp.reply_comments
ORDER BY c.id ASC, c.created_at DESC`,
    [postId, postId]
  );
  return result;
};

const createComment = async (userId, postId, contents) => {
  await appDataSource.query(
    `INSERT INTO comments (
    content,
    user_id,
    post_id)
    VALUES (?,?,?)
    `,
    [contents, userId, postId]
  );

  const [result] = await appDataSource.query(
    `SELECT 
  c.post_id AS postId,
  c.id AS commentId,
  u.social_nickname AS nickname,
  u.social_profile_image AS profileImage,
  c.content,
  DATE_FORMAT(MAX(c.created_at),"%Y-%m-%d") AS date
  FROM comments AS c
  INNER JOIN users AS u ON u.id=c.user_id
  WHERE post_id=? AND user_id=?
  GROUP BY c.id`,
    [postId, userId]
  );
  return result;
};

const replyComment = async (userId, commentId, postId, contents) => {
  await appDataSource.query(
    `INSERT INTO comments (
    content,
    user_id,
    post_id,
    comment_id)
    VALUES (?,?,?,?)
    `,
    [contents, userId, postId, commentId]
  );

  const result = await appDataSource.query(
    `SELECT 
    c.post_id AS postId,
    c.comment_id AS replyId,
    u.social_nickname AS nickname,
    u.social_profile_image AS profileImage,
    c.content,
    DATE_FORMAT(MAX(c.created_at),"%Y-%m-%d") AS date
  FROM comments AS c
  INNER JOIN users AS u ON u.id=c.user_id
  LEFT JOIN comments AS cm ON c.id=cm.comment_id
  WHERE c.comment_id=?
  GROUP BY c.id`,
    [commentId]
  );
  return result;
};

module.exports = {
  getComment,
  createComment,
  replyComment,
};
