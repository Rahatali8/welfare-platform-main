-- Clear existing data
DELETE FROM donations;
DELETE FROM requests;
DELETE FROM donors;
DELETE FROM password_resets;
DELETE FROM users;

-- Reset auto-increment counters
ALTER TABLE donations AUTO_INCREMENT = 1;
ALTER TABLE requests AUTO_INCREMENT = 1;
ALTER TABLE donors AUTO_INCREMENT = 1;
ALTER TABLE password_resets AUTO_INCREMENT = 1;
ALTER TABLE users AUTO_INCREMENT = 1;

-- Insert sample users
INSERT INTO users (name, email, cnic, password, role) VALUES
('Rahat Ali', 'rahat@example.com', '12345-6789012-3', 'hashed_password', 'user'),
('Ali Khan', 'ali@example.com', '98765-4321098-7', 'hashed_password', 'user');

-- Insert donations linked to the above users (userId 1 and 2)
INSERT INTO donations (userId, amount, date) VALUES
(1, 50000, DATE_SUB(NOW(), INTERVAL 30 DAY)),
(1, 25000, DATE_SUB(NOW(), INTERVAL 20 DAY)),
(2, 40000, DATE_SUB(NOW(), INTERVAL 10 DAY)),
(2, 15000, DATE_SUB(NOW(), INTERVAL 5 DAY));
