-- migrate:up
CREATE TABLE posts(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  description VARCHAR(3000) NOT NULL,
  user_id INT NOT NULL,
  room_size_type_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (room_size_type_id) REFERENCES room_size_types(id)
);

-- migrate:down
DROP TABLE posts;