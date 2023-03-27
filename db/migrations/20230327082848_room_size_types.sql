-- migrate:up
CREATE TABLE room_size_types(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

-- migrate:down
DROP TABLE room_size_types