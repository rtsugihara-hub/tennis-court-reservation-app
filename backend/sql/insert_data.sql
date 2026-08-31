-- ===================================================
-- 1. ユーザーテーブル (users) へのデータ投入
-- ===================================================
INSERT INTO users (id, name, email, password, role) VALUES
('user-001', '山田 太郎', 'yamada@example.com', 'password123', 'USER'),
('user-002', '佐藤 花子', 'sato@example.com', 'password123', 'USER'),
('admin-001', '管理者 太郎', 'admin@example.com', 'admin123', 'ADMIN');

-- ===================================================
-- 2. コートテーブル (courts) へのデータ投入
-- ===================================================
INSERT INTO courts (id, name, type, is_indoor, price_per_hour, status, date, time_slot, description, is_deleted) VALUES
('court-001', 'センターコート A', 'オムニ', FALSE, 2000, 'available', '2026-09-01', '10:00-12:00', '照明設備完備のメインコートです。', FALSE),
('court-002', 'インドアコート B', 'ハード', TRUE,  3000, 'available', '2026-09-01', '13:00-15:00', '天候を気にせず利用できる室内コートです。', FALSE),
('court-003', 'サブコート C',     'クレー', FALSE, 1500, 'available', '2026-09-01', '15:00-17:00', '足腰に優しいクレーコートです。', FALSE);

-- ===================================================
-- 3. 予約テーブル (reservations) へのデータ投入
-- ===================================================
INSERT INTO reservations (id, user_id, court_id, date, time_slot, total_price, status, created_at) VALUES
('res-001', 'user-001', 'court-001', '2026-09-01', '10:00-12:00', 2000, 'confirmed', CURRENT_TIMESTAMP),
('res-002', 'user-001', 'court-002', '2026-09-05', '13:00-15:00', 3000, 'completed', CURRENT_TIMESTAMP),
('res-003', 'user-002', 'court-003', '2026-09-10', '15:00-17:00', 1500, 'confirmed', CURRENT_TIMESTAMP);