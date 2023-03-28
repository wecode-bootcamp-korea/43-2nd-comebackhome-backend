-- migrate:up
CREATE TABLE users(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  social_id BIGINT NOT NULL,
  social_nickname VARCHAR(100) NOT NULL,
  social_profile_image VARCHAR(2000) NOT NULL,
  social_email VARCHAR(100) NOT NULL UNIQUE,
  point DECIMAL(10,2) NOT NULL,
  social_type_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (social_type_id) REFERENCES social_types(id)
);

-- migrate:down
DROP TABLE users;