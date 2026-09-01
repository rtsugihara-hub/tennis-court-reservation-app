SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS courts;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at VARCHAR(255),
    updated_at VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE courts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    is_indoor BOOLEAN NOT NULL,
    price_per_hour INT NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL,
    date VARCHAR(50) NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at VARCHAR(255),
    updated_at VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE reservations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    court_id BIGINT NOT NULL,
    date VARCHAR(50) NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    total_price INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at VARCHAR(255),
    updated_at VARCHAR(255),
    CONSTRAINT fk_reservations_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_reservations_court FOREIGN KEY (court_id) REFERENCES courts(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;