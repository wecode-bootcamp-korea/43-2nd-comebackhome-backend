-- migrate:up
CREATE TABLE post_images(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  image_url VARCHAR(2000) NOT NULL,
  post_id INT NOT NULL,
  FOREIGN KEY (post_id) REFERENCES posts(id)
);

-- migrate:down
DROP TABLE post_images