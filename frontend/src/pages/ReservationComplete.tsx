// src/pages/ReservationComplete.tsx
import React from 'react';

interface ReservationCompleteProps {
  onGoToDashboard: () => void;
  onGoToMyPage: () => void;
}

export const ReservationComplete: React.FC<ReservationCompleteProps> = ({
  onGoToDashboard,
  onGoToMyPage,
}) => {
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
        <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>予約完了</h2>

        <div
          style={{
            backgroundColor: '#fff',
            padding: '40px 24px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            textAlign: 'center',
          }}
        >
          <h3 style={{ marginTop: 0, color: '#28a745', fontSize: '22px', marginBottom: '16px' }}>
            予約が完了いたしました！
          </h3>
          <p style={{ fontSize: '15px', color: '#555', marginBottom: '32px' }}>
            ご予約ありがとうございました。マイページより予約の確認が行えます。
          </p>

          {/* 遷移ボタンエリア */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button
              onClick={onGoToDashboard}
              style={{
                padding: '10px 24px',
                backgroundColor: '#6c757d',
                color: '#fff',
                fontSize: '15px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              ダッシュボードへ
            </button>
            <button
              onClick={onGoToMyPage}
              style={{
                padding: '10px 24px',
                backgroundColor: '#007bff',
                color: '#fff',
                fontSize: '15px',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              予約履歴を確認する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};