-- migrate:up
CREATE TABLE social_types(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

-- migrate:down
DROP TABLE social_types
