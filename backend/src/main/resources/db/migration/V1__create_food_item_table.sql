CREATE TABLE food_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    category VARCHAR(100) NOT NULL,
    expiration DATE NOT NULL
    );
