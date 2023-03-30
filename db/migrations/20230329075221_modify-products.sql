-- migrate:up
ALTER TABLE products ADD color VARCHAR(50) NULL

-- migrate:down
