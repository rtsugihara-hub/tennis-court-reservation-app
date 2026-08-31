// frontend/src/mocks/mockData.ts
import type { User, Court, Reservation } from '../types';

// ユーザー（ログイン確認用）ダミーデータ
export const MOCK_USERS: User[] = [
  {
    id: 'user-001',
    name: '山田 太郎',
    email: 'user@example.com',
    role: 'user',
  },
  {
    id: 'admin-001',
    name: '管理者 太郎',
    email: 'admin@example.com',
    role: 'admin',
  },
];

// コート一覧ダミーデータ
export const MOCK_COURTS: Court[] = [
  {
    id: 'court-001',
    name: 'センターコート A',
    type: 'オムニ',
    isIndoor: false,
    pricePerHour: 2000,
    description: '照明設備完備のメインコートです。',
    status: 'available',
    date: '2026-09-01',
    timeSlot: '10:00-12:00',
    isDeleted: false,
  },
  {
    id: 'court-002',
    name: 'インドアコート B',
    type: 'ハード',
    isIndoor: true,
    pricePerHour: 3000,
    description: '天候を気にせず利用できる室内コートです。',
    status: 'available',
    date: '2026-09-01',
    timeSlot: '13:00-15:00',
    isDeleted: false,
  },
  {
    id: 'court-003',
    name: 'サブコート C',
    type: 'クレー',
    isIndoor: false,
    pricePerHour: 1500,
    description: '足腰に優しいクレーコートです。',
    status: 'maintenance',
    date: '2026-09-01',
    timeSlot: '15:00-17:00',
    isDeleted: false,
  },
];

// 予約一覧（管理者・ユーザーマイページ確認用）ダミーデータ
export const MOCK_RESERVATIONS: Reservation[] = [
  {
    id: 'res-001',
    userId: 'user-001', // ★ 山田 太郎さんに紐づけ
    userName: '山田 太郎',
    courtName: 'センターコート A',
    date: '2026-09-01',
    timeSlot: '10:00-12:00',
    totalPrice: 4000,
    status: 'confirmed',
  },
  {
    id: 'res-002',
    userId: 'user-001', // ★ 山田 太郎さんに紐づけ
    userName: '山田 太郎',
    courtName: 'インドアコート B',
    date: '2026-09-02',
    timeSlot: '13:00-15:00',
    totalPrice: 6000,
    status: 'completed',
  },
  {
    id: 'res-003',
    userId: 'user-001', // ★ 山田 太郎さんに紐づけ
    userName: '山田 太郎',
    courtName: 'サブコート C',
    date: '2026-09-03',
    timeSlot: '09:00-11:00',
    totalPrice: 3000,
    status: 'cancelled',
  },
];