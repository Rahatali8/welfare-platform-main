-- Create database
CREATE DATABASE IF NOT EXISTS welfare_platform;
USE welfare_platform;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cnic VARCHAR(13) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin', 'donor') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create requests table
CREATE TABLE IF NOT EXISTS requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type ENUM('loan', 'microfinance', 'general') NOT NULL,
  reason TEXT NOT NULL,
  amount DECIMAL(10, 2),
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  current_address TEXT NOT NULL,
  cnic_image VARCHAR(255),
  additional_data JSON,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create donations table
CREATE TABLE IF NOT EXISTS donations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  donor_id INT NOT NULL,
  request_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  donated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (donor_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (request_id) REFERENCES requests(id) ON DELETE CASCADE
);

-- Insert sample admin user (password: admin123)
INSERT INTO users (cnic, full_name, address, password, role) VALUES 
('1234567890123', 'Admin User', 'Admin Address', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq9w5KS', 'admin')
ON DUPLICATE KEY UPDATE id=id;

-- Insert sample donor user (password: donor123)
INSERT INTO users (cnic, full_name, address, password, role) VALUES 
('9876543210987', 'Donor User', 'Donor Address', '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'donor')
ON DUPLICATE KEY UPDATE id=id;
