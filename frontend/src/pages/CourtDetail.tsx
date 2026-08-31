// src/pages/CourtDetail.tsx
import React from 'react';
import type { Court } from '../types';

interface CourtDetailProps {
  court: Court;
  onBack: () => void;
  onGoToConfirm: () => void;
}

export const CourtDetail: React.FC<CourtDetailProps> = ({ court, onBack, onGoToConfirm }) => {
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
        <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>コート詳細</h2>

        <div
          style={{
            backgroundColor: '#fff',
            padding: '24px',
            borderRadius: '8px',
            border: '1px solid #ddd',
          }}
        >
          <h3 style={{ marginTop: 0, borderBottom: '2px solid #333', paddingBottom: '10px', color: '#333' }}>
            コート詳細情報
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '12px', margin: '24px 0', fontSize: '15px' }}>
            <strong>コート名:</strong> <div>{court.name}</div>
            <strong>コート種別:</strong> <div>{court.type}</div>
            <strong>屋内外:</strong> <div>{court.isIndoor ? '屋内' : '屋外'}</div>
            <strong>利用日時:</strong> <div>{court.date} {court.timeSlot}</div>
            <strong>利用料金:</strong> <div>¥{court.pricePerHour?.toLocaleString()}</div>
            <strong>概要・説明:</strong> <div>{court.description}</div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button
              onClick={onBack}
              style={{ padding: '8px 20px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              一覧へ戻る
            </button>
            <button
              onClick={onGoToConfirm}
              disabled={court.status !== 'available'}
              style={{
                padding: '8px 20px',
                backgroundColor: court.status === 'available' ? '#28a745' : '#6c757d',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: court.status === 'available' ? 'pointer' : 'not-allowed',
              }}
            >
              {court.status === 'available' ? '予約手続きへ' : '予約不可'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};