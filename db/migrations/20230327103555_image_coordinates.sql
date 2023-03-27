-- migrate:up
CREATE TABLE image_coordinates(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  pixel_row INT NOT NULL,
  pixel_column INT NOT NULL,
  post_image_id INT NOT NULL,
  product_id INT NOT NULL,
  FOREIGN KEY (post_image_id) REFERENCES post_images(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- migrate:down
DROP TABLE image_coordinates  
