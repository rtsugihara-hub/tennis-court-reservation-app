import React, { useState, useEffect } from 'react';
import type { User, Reservation } from '../types';

interface MyPageProps {
  currentUser: User | null;
  onSelectReservation?: (reservation: Reservation) => void;
}

export const MyPage: React.FC<MyPageProps> = ({ currentUser, onSelectReservation }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!currentUser) return;
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/api/reservations/user/${currentUser.id}`);
        if (!response.ok) throw new Error('予約履歴の取得に失敗しました');
        const data: Reservation[] = await response.json();
        setReservations(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [currentUser]);

  return (
    <div style={{ padding: '20px', flex: 1 }}>
      <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>マイページ</h2>

      {/* ■ 会員情報エリア（文字サイズ拡大） */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 15px 0', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
          会員情報
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '18px', color: '#333' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', width: '80px' }}>氏名：</span>
            <span>{currentUser?.name} 様</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', width: '80px' }}>メール：</span>
            <span>{currentUser?.email}</span>
          </div>
        </div>
      </div>

      {/* ■ 予約履歴一覧エリア */}
      <div style={{ borderRadius: '8px', padding: '10px 0', backgroundColor: '#fff' }}>
        <h3 style={{ margin: '0 0 15px 0' }}>■ 予約履歴一覧</h3>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#666' }}>データを読み込み中...</p>
        ) : (
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              border: '1px solid #333',
              textAlign: 'center',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#d4edda', borderBottom: '1px solid #333' }}>
                <th style={{ border: '1px solid #333', padding: '12px', fontSize: '16px' }}>予約ID</th>
                <th style={{ border: '1px solid #333', padding: '12px', fontSize: '16px' }}>コート名</th>
                <th style={{ border: '1px solid #333', padding: '12px', fontSize: '16px' }}>利用日時</th>
                <th style={{ border: '1px solid #333', padding: '12px', fontSize: '16px' }}>合計料金</th>
                <th style={{ border: '1px solid #333', padding: '12px', fontSize: '16px' }}>ステータス</th>
                <th style={{ border: '1px solid #333', padding: '12px', fontSize: '16px' }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length > 0 ? (
                reservations.map((res) => {
                  const isCancelled = res.status === 'cancelled' || res.status === 'キャンセル';
                  return (
                    <tr key={res.id} style={{ borderBottom: '1px solid #333' }}>
                      <td style={{ border: '1px solid #333', padding: '14px', fontSize: '16px' }}>{res.id}</td>
                      <td style={{ border: '1px solid #333', padding: '14px', fontSize: '16px' }}>{res.courtName}</td>
                      <td style={{ border: '1px solid #333', padding: '14px', fontSize: '16px' }}>
                        {res.date} {res.timeSlot}
                      </td>
                      <td style={{ border: '1px solid #333', padding: '14px', fontSize: '16px' }}>
                        ¥{res.totalPrice?.toLocaleString()}
                      </td>

                      {/* ■ ステータス（バッジサイズ拡大） */}
                      <td style={{ border: '1px solid #333', padding: '14px' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '6px 16px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            borderRadius: '6px',
                            backgroundColor: isCancelled ? '#f8d7da' : '#d4edda',
                            color: isCancelled ? '#842029' : '#0f5132',
                            border: `1px solid ${isCancelled ? '#f5c2c7' : '#badbcc'}`,
                          }}
                        >
                          {isCancelled ? 'キャンセル' : '予約確定'}
                        </span>
                      </td>

                      {/* ■ 「詳細・変更」ボタン（ボタンサイズ拡大） */}
                      <td style={{ border: '1px solid #333', padding: '14px' }}>
                        <button
                          onClick={() => onSelectReservation && onSelectReservation(res)}
                          style={{
                            backgroundColor: '#00a0e9',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '8px 20px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                          }}
                        >
                          詳細・変更
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} style={{ padding: '20px', color: '#666', fontSize: '16px' }}>
                    予約履歴がありません。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};