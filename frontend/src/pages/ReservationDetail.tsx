// src/pages/ReservationDetail.tsx
import React, { useState } from 'react';
import type { Reservation, User } from '../types';

interface ReservationDetailProps {
  reservation: Reservation;
  currentUser: User;
  onBackToMyPage: () => void;
  onCancelReservation: (reservationId: string) => void;
}

export const ReservationDetail: React.FC<ReservationDetailProps> = ({
  reservation,
  currentUser,
  onBackToMyPage,
  onCancelReservation,
}) => {
  const [isCanceled, setIsCanceled] = useState(reservation.status === 'cancelled');
  const [loading, setLoading] = useState(false);

  // 予約キャンセル処理 (API通信)
  const handleCancel = async () => {
    if (!window.confirm('この予約をキャンセルしますか？')) return;

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/api/reservations/${reservation.id}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('キャンセルの実行に失敗しました');
      }

      alert('予約をキャンセルいたしました。');
      setIsCanceled(true);
      onCancelReservation(reservation.id);
    } catch (error) {
      console.error(error);
      alert('予約のキャンセル処理に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status: string) => {
    if (status === 'confirmed') return '予約済';
    if (status === 'completed') return '利用済';
    return 'キャンセル済';
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
        <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>予約詳細</h2>

        {/* カードコンテナ */}
        <div
          style={{
            backgroundColor: '#fff',
            padding: '24px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          }}
        >
          <h3 style={{ marginTop: 0, borderBottom: '2px solid #333', paddingBottom: '10px', color: '#333' }}>
            予約詳細情報
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: '14px', margin: '24px 0', fontSize: '15px' }}>
            <strong>予約ID:</strong> <div>{reservation.id}</div>
            <strong>予約者名:</strong> <div>{currentUser.name}</div>
            <strong>コート名:</strong> <div>{reservation.courtName}</div>
            <strong>利用日時:</strong> <div>{reservation.date} {reservation.timeSlot}</div>
            <strong>お支払金額:</strong> <div>¥{reservation.totalPrice?.toLocaleString()}</div>
            <strong>予約ステータス:</strong> 
            <div style={{ fontWeight: 'bold', color: isCanceled ? '#dc3545' : '#28a745' }}>
              {getStatusText(isCanceled ? 'cancelled' : reservation.status)}
            </div>
            <strong>予約申込日時:</strong> <div>{reservation.createdAt || '2026-08-24 17:00'}</div>
          </div>

          {/* ボタンエリア */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button
              onClick={onBackToMyPage}
              disabled={loading}
              style={{
                padding: '8px 20px',
                backgroundColor: '#6c757d',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '14px',
              }}
            >
              マイページへ戻る
            </button>

            {!isCanceled && reservation.status === 'confirmed' && (
              <button
                onClick={handleCancel}
                disabled={loading}
                style={{
                  padding: '8px 20px',
                  backgroundColor: loading ? '#6c757d' : '#dc3545',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                {loading ? '処理中...' : '予約キャンセル'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};