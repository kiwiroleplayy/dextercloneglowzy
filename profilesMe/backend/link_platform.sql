

CREATE DATABASE link_platform;
USE link_platform;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  profilePicture LONGBLOB, -- Changed to LONGBLOB for binary data
  backgroundMedia LONGBLOB, -- Changed to LONGBLOB for binary data
  backgroundType ENUM('image', 'video'),
  email VARCHAR(255) NOT NULL UNIQUE,
  googleId VARCHAR(255) UNIQUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  totalVisit INT DEFAULT 0
);


CREATE TABLE links (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  title VARCHAR(512) NOT NULL, -- Increased size for title
  url VARCHAR(4096) NOT NULL, -- Increased size for URL
  `order` INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_order (userId, `order`)
);
