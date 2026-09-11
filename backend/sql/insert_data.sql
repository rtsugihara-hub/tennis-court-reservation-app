-- ===================================================
-- 1. ユーザーテーブル (users) への初期データ投入
-- ===================================================
INSERT INTO users (id, name, email, password, role) VALUES
(1, '山田 太郎', 'yamada@example.com', 'password123', 'USER'),
(2, '佐藤 花子', 'sato@example.com', 'password123', 'USER'),
(3, '管理者 太郎', 'admin@example.com', 'admin123', 'ADMIN');

-- ===================================================
-- 2. コートテーブル (courts) への初期データ投入
-- ===================================================
INSERT INTO courts (id, name, type, is_indoor, price_per_hour, status, date, time_slot, description, is_deleted) VALUES
(1, 'センターコート A', 'オムニ', FALSE, 2000, 'available', '2026-09-01', '10:00-12:00', '照明設備完備のメインコートです。', FALSE),
(2, 'インドアコート B', 'ハード', TRUE,  3000, 'available', '2026-09-01', '13:00-15:00', '天候を気にせず利用できる室内コートです。', FALSE),
(3, 'サブコート C',     'クレー', FALSE, 1500, 'available', '2026-09-01', '15:00-17:00', '足腰に優しいクレーコートです。', FALSE);

-- ===================================================
-- 3. 予約テーブル (reservations) への初期データ投入
-- ===================================================
INSERT INTO reservations (id, user_id, court_id, user_name, court_name, date, time_slot, total_price, status, created_at) VALUES
(1, 1, 1, '山田 太郎', 'センターコート A', '2026-09-01', '10:00-12:00', 2000, 'confirmed', CURRENT_TIMESTAMP),
(2, 1, 2, '山田 太郎', 'インドアコート B', '2026-09-05', '13:00-15:00', 3000, 'completed', CURRENT_TIMESTAMP),
(3, 2, 3, '佐藤 花子', 'サブコート C',     '2026-09-10', '15:00-17:00', 1500, 'confirmed', CURRENT_TIMESTAMP);