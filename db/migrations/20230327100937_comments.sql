-- migrate:up
CREATE TABLE comments(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  content VARCHAR(1000) NOT NULL,
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  comment_id INT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (comment_id) REFERENCES comments(id)
);

-- migrate:down
DROP TABLE comments; 