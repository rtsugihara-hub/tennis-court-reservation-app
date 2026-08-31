// src/pages/ReservationConfirm.tsx
import React, { useState } from 'react';
import type { Court, User } from '../types';

interface ReservationConfirmProps {
  court: Court;
  currentUser?: User;
  onBack: () => void;
  onConfirm: () => void;
}

export const ReservationConfirm: React.FC<ReservationConfirmProps> = ({ court, currentUser, onBack, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  // 予約確定処理 (API通信)
  const handleConfirmReservation = async () => {
    if (!currentUser?.id) {
      alert('ログイン情報が見つかりません。再ログインしてください。');
      return;
    }

    setLoading(true);

    const reservationPayload = {
      userId: currentUser.id,
      userName: currentUser.name,
      courtId: court.id,
      courtName: court.name,
      date: court.date,
      timeSlot: court.timeSlot,
      totalPrice: court.pricePerHour,
      status: 'confirmed',
    };

    try {
      const response = await fetch('http://localhost:8080/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationPayload),
      });

      if (!response.ok) {
        throw new Error('予約処理に失敗しました');
      }

      // 親コンポーネント側の完了処理（画面遷移等）を呼び出す
      onConfirm();
    } catch (error) {
      console.error(error);
      alert('予約の確定処理に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: '600px' }}>
        {/* 画面タイトル */}
        <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>予約確認</h2>

        <div
          style={{
            backgroundColor: '#fff',
            padding: '24px',
            borderRadius: '8px',
            border: '1px solid #ddd',
          }}
        >
          <h3 style={{ marginTop: 0, color: '#d9534f', borderBottom: '2px solid #d9534f', paddingBottom: '10px' }}>
            予約内容の最終確認
          </h3>
          <p style={{ fontSize: '14px', color: '#555', margin: '16px 0 8px 0' }}>
            以下の内容で予約を確定します。よろしいですか？
          </p>

          <div style={{ backgroundColor: '#f8f9fa', padding: '16px', borderRadius: '6px', margin: '20px 0', fontSize: '15px' }}>
            {/* 1. 予約者名 */}
            <p style={{ margin: '10px 0' }}>
              <strong>予約者名：</strong> {currentUser?.name ? `${currentUser.name} 様` : '未設定'}
            </p>
            {/* 2. コート名 */}
            <p style={{ margin: '10px 0' }}>
              <strong>コート名：</strong> {court.name}
            </p>
            {/* 3. コート種別 */}
            <p style={{ margin: '10px 0' }}>
              <strong>コート種別：</strong> {court.type}
            </p>
            {/* 4. 屋内/屋外 */}
            <p style={{ margin: '10px 0' }}>
              <strong>屋内/屋外：</strong> {court.isIndoor ? '屋内' : '屋外'}
            </p>
            {/* 5. 利用日時 */}
            <p style={{ margin: '10px 0' }}>
              <strong>利用日時：</strong> {court.date} {court.timeSlot}
            </p>
            {/* 6. お支払い金額 */}
            <p style={{ margin: '10px 0' }}>
              <strong>お支払い金額：</strong> ¥{court.pricePerHour?.toLocaleString()}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
            {/* 修正するボタン */}
            <button
              onClick={onBack}
              disabled={loading}
              style={{
                padding: '8px 20px',
                backgroundColor: '#6c757d',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              修正する
            </button>
            {/* 予約確定ボタン */}
            <button
              onClick={handleConfirmReservation}
              disabled={loading}
              style={{
                padding: '8px 24px',
                backgroundColor: loading ? '#6c757d' : '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
              }}
            >
              {loading ? '処理中...' : 'この内容で予約を確定する'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};