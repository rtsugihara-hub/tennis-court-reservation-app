// src/pages/CourtList.tsx
import React, { useState, useEffect } from 'react';
import type { Court } from '../types';

interface CourtListProps {
  onSelectCourt: (court: Court) => void;
}

export const CourtList: React.FC<CourtListProps> = ({ onSelectCourt }) => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [typeFilter, setTypeFilter] = useState<string>('すべて');
  const [locationFilter, setLocationFilter] = useState<string>('すべて');

  const [appliedType, setAppliedType] = useState<string>('すべて');
  const [appliedLocation, setAppliedLocation] = useState<string>('すべて');

  // バックエンドAPIからコート一覧を取得
  useEffect(() => {
    const fetchCourts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/api/courts');
        if (!response.ok) throw new Error('コート情報の取得に失敗しました');
        const data: Court[] = await response.json();
        setCourts(data);
      } catch (error) {
        console.error(error);
        alert('コート情報の取得に失敗しました。バックエンドが起動しているか確認してください。');
      } finally {
        setLoading(false);
      }
    };

    fetchCourts();
  }, []);

  const handleSearch = () => {
    setAppliedType(typeFilter);
    setAppliedLocation(locationFilter);
  };

  const filteredCourts = courts.filter((court) => {
    // 削除済みデータおよび非公開データ（available以外）を除外
    if (court.isDeleted || court.status !== 'available') return false;

    const matchesType = appliedType === 'すべて' || court.type === appliedType;
    const matchesLocation =
      appliedLocation === 'すべて'
        ? true
        : appliedLocation === '屋内'
        ? court.isIndoor
        : !court.isIndoor;
    return matchesType && matchesLocation;
  });

  return (
    <div style={{ padding: '20px', flex: 1 }}>
      {/* 画面タイトル */}
      <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>コート検索・一覧</h2>

      <div
        style={{
          borderRadius: '8px',
          padding: '10px 0 20px 0',
          marginBottom: '20px',
          backgroundColor: '#fff',
          maxWidth: '600px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '350px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ fontWeight: 'bold' }}>コート種別：</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              style={{ width: '180px', padding: '6px', fontSize: '14px', border: '1px solid #333' }}
            >
              <option value="すべて">すべて</option>
              <option value="オムニ">オムニ</option>
              <option value="クレー">クレー</option>
              <option value="ハード">ハード</option>
              <option value="人工芝">人工芝</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ fontWeight: 'bold' }}>屋内外：</label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              style={{ width: '180px', padding: '6px', fontSize: '14px', border: '1px solid #333' }}
            >
              <option value="すべて">すべて</option>
              <option value="屋内">屋内</option>
              <option value="屋外">屋外</option>
            </select>
          </div>

          <div style={{ textAlign: 'right', marginTop: '10px' }}>
            <button
              onClick={handleSearch}
              style={{
                backgroundColor: '#00a0e9',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 24px',
                fontSize: '15px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              検索
            </button>
          </div>
        </div>
      </div>

      <div style={{ borderRadius: '8px', padding: '10px 0', backgroundColor: '#fff' }}>
        <h3 style={{ margin: '0 0 15px 0' }}>■ コート一覧</h3>

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
                <th style={{ border: '1px solid #333', padding: '12px', fontSize: '16px' }}>コート名</th>
                <th style={{ border: '1px solid #333', padding: '12px', fontSize: '16px' }}>コート種別</th>
                <th style={{ border: '1px solid #333', padding: '12px', fontSize: '16px' }}>屋内外</th>
                <th style={{ border: '1px solid #333', padding: '12px', fontSize: '16px' }}>利用日時</th>
                <th style={{ border: '1px solid #333', padding: '12px', fontSize: '16px' }}>利用料金</th>
                <th style={{ border: '1px solid #333', padding: '12px', fontSize: '16px' }}>概要・説明</th>
                <th style={{ border: '1px solid #333', padding: '12px', fontSize: '16px' }}>詳細</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourts.length > 0 ? (
                filteredCourts.map((court) => (
                  <tr key={court.id} style={{ borderBottom: '1px solid #333' }}>
                    <td style={{ border: '1px solid #333', padding: '14px', fontSize: '16px' }}>{court.name}</td>
                    <td style={{ border: '1px solid #333', padding: '14px', fontSize: '16px' }}>{court.type}</td>
                    <td style={{ border: '1px solid #333', padding: '14px', fontSize: '16px' }}>{court.isIndoor ? '屋内' : '屋外'}</td>
                    <td style={{ border: '1px solid #333', padding: '14px', fontSize: '16px' }}>
                      {court.date} {court.timeSlot}
                    </td>
                    <td style={{ border: '1px solid #333', padding: '14px', fontSize: '16px' }}>
                      ¥{court.pricePerHour?.toLocaleString()}
                    </td>
                    <td style={{ border: '1px solid #333', padding: '14px', fontSize: '16px', textAlign: 'left' }}>
                      {court.description}
                    </td>

                    {/* マイページのボタンサイズ（padding: 8px 20px, fontSize: 14px, borderRadius: 6px）と統一 */}
                    <td style={{ border: '1px solid #333', padding: '14px' }}>
                      <button
                        onClick={() => onSelectCourt(court)}
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
                        詳細
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} style={{ padding: '20px', color: '#666', fontSize: '16px' }}>
                    条件に一致するコートが見つかりませんでした。
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