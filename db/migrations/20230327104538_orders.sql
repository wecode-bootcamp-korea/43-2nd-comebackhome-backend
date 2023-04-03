-- migrate:up
CREATE TABLE orders(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  receiver_name VARCHAR(50) NOT NULL,
  receiver_phone_number VARCHAR(50) NOT NULL,
  receiver_address VARCHAR(300) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  order_number VARCHAR(300) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- migrate:down
DROP TABLE orders;