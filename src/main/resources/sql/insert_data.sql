SET NAMES utf8mb4;
USE tennis_db;

-- 1. ユーザー初期データ (roleを小文字 'user', 'admin' に変更)
INSERT INTO users (id, name, email, password, role) VALUES
(1, '山田 太郎', 'yamada@example.com', 'password123', 'user'),
(2, '佐藤 花子', 'sato@example.com', 'password123', 'user'),
(3, '管理者 太郎', 'admin@example.com', 'admin123', 'admin')
ON DUPLICATE KEY UPDATE name=VALUES(name), role=VALUES(role);

-- 2. コート初期データ
INSERT INTO courts (id, name, type, is_indoor, price_per_hour, description, status, date, time_slot, is_deleted) VALUES
(1, 'センターコート A', 'オムニ', FALSE, 2000, '照明設備完備のメインコートです。', 'available', '2026-09-01', '10:00-12:00', FALSE),
(2, 'インドアコート B', 'ハード', TRUE, 3000, '天候を気にせず利用できる室内コートです。', 'available', '2026-09-01', '13:00-15:00', FALSE),
(3, 'サブコート C', 'クレー', FALSE, 1500, '足腰に優しいクレーコートです。', 'available', '2026-09-01', '15:00-17:00', FALSE)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 3. 予約初期データ
INSERT INTO reservations (id, user_id, court_id, date, time_slot, total_price, status, created_at) VALUES
(1, 1, 1, '2026-09-01', '10:00-12:00', 2000, 'confirmed', '2026-08-24 17:00'),
(2, 1, 2, '2026-09-05', '13:00-15:00', 3000, 'completed', '2026-08-24 17:00'),
(3, 2, 3, '2026-09-10', '15:00-17:00', 1500, 'confirmed', '2026-08-24 17:00')
ON DUPLICATE KEY UPDATE status=VALUES(status);