// src/pages/admin/AdminReservationList.tsx
import React, { useState, useEffect } from 'react';
import type { Reservation } from '../../types';

export const AdminReservationList: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 検索条件用ステート
  const [dateFilter, setDateFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('すべて');

  // 適用済みの検索条件ステート
  const [appliedDate, setAppliedDate] = useState<string>('');
  const [appliedStatus, setAppliedStatus] = useState<string>('すべて');

  // バックエンドから全予約一覧を取得
  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/reservations');
      if (!response.ok) throw new Error('予約データの取得に失敗しました');
      const data: Reservation[] = await response.json();
      setReservations(data);
    } catch (error) {
      console.error(error);
      alert('予約データの取得に失敗しました。バックエンドの状態を確認してください。');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // 検索実行
  const handleSearch = () => {
    setAppliedDate(dateFilter);
    setAppliedStatus(statusFilter);
  };

  // リセット実行
  const handleReset = () => {
    setDateFilter('');
    setStatusFilter('すべて');
    setAppliedDate('');
    setAppliedStatus('すべて');
  };

  // 「予約済」から「来店済」へのステータス更新処理 (API通信)
  const handleMarkAsVisited = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/reservations/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'completed' }),
      });

      if (!response.ok) throw new Error('ステータス更新に失敗しました');

      alert('ステータスを「来店済」に更新しました');
      fetchReservations(); // 再取得して画面描画を更新
    } catch (error) {
      console.error(error);
      alert('ステータス更新に失敗しました。');
    }
  };

  // 表示データのフィルタリング処理
  const filteredReservations = reservations.filter((res) => {
    // 利用日フィルター
    const matchesDate = appliedDate === '' || res.date === appliedDate;

    // ステータスフィルター
    let matchesStatus = true;
    if (appliedStatus === '予約済') matchesStatus = res.status === 'confirmed';
    if (appliedStatus === '来店済') matchesStatus = res.status === 'completed';
    if (appliedStatus === 'キャンセル') matchesStatus = res.status === 'cancelled';

    return matchesDate && matchesStatus;
  });

  return (
    <div style={{ padding: '20px', flex: 1 }}>
      {/* 画面タイトル */}
      <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>予約一覧</h2>

      {/* 検索フォームエリア */}
      <div
        style={{
          borderRadius: '8px',
          padding: '10px 0 20px 0',
          marginBottom: '20px',
          backgroundColor: '#fff',
          maxWidth: '450px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {/* 利用日 */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '100px', fontWeight: 'bold' }}>利用日：</label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              style={{ padding: '6px', fontSize: '14px', border: '1px solid #333', borderRadius: '4px', width: '180px' }}
            />
          </div>

          {/* ステータス */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '100px', fontWeight: 'bold' }}>ステータス：</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: '6px', fontSize: '14px', border: '1px solid #333', borderRadius: '4px', width: '180px' }}
            >
              <option value="すべて">すべて</option>
              <option value="予約済">予約済</option>
              <option value="来店済">来店済</option>
              <option value="キャンセル">キャンセル</option>
            </select>
          </div>

          {/* リセット / 検索 ボタン */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-start', marginLeft: '100px', marginTop: '5px' }}>
            <button
              onClick={handleReset}
              style={{
                backgroundColor: '#fff',
                color: '#333',
                border: '1px solid #333',
                borderRadius: '4px',
                padding: '6px 20px',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              リセット
            </button>
            <button
              onClick={handleSearch}
              style={{
                backgroundColor: '#00a0e9',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '6px 24px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              検索
            </button>
          </div>
        </div>
      </div>

      {/* 一覧テーブルエリア */}
      <div style={{ padding: '10px 0', backgroundColor: '#fff' }}>
        <h3 style={{ margin: '0 0 15px 0' }}>■ 予約一覧</h3>

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
                <th style={{ border: '1px solid #333', padding: '10px' }}>予約ID</th>
                <th style={{ border: '1px solid #333', padding: '10px' }}>予約者名</th>
                <th style={{ border: '1px solid #333', padding: '10px' }}>コート名</th>
                <th style={{ border: '1px solid #333', padding: '10px' }}>利用日時</th>
                <th style={{ border: '1px solid #333', padding: '10px' }}>合計金額</th>
                <th style={{ border: '1px solid #333', padding: '10px' }}>ステータス</th>
                <th style={{ border: '1px solid #333', padding: '10px' }}>ステータス更新</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.length > 0 ? (
                filteredReservations.map((res) => (
                  <tr key={res.id} style={{ borderBottom: '1px solid #333' }}>
                    <td style={{ border: '1px solid #333', padding: '12px' }}>{res.id}</td>
                    <td style={{ border: '1px solid #333', padding: '12px' }}>{res.userName || '未登録'}</td>
                    <td style={{ border: '1px solid #333', padding: '12px' }}>{res.courtName}</td>
                    <td style={{ border: '1px solid #333', padding: '12px' }}>
                      {res.date} {res.timeSlot}
                    </td>
                    <td style={{ border: '1px solid #333', padding: '12px' }}>
                      ¥{res.totalPrice?.toLocaleString()}
                    </td>
                    <td style={{ border: '1px solid #333', padding: '12px' }}>
                      {res.status === 'confirmed' && '予約済'}
                      {res.status === 'completed' && '来店済'}
                      {res.status === 'cancelled' && 'キャンセル'}
                    </td>
                    <td style={{ border: '1px solid #333', padding: '12px' }}>
                      <button
                        onClick={() => handleMarkAsVisited(res.id)}
                        disabled={res.status !== 'confirmed'}
                        style={{
                          backgroundColor: res.status === 'confirmed' ? '#e2e3e5' : '#f8f9fa',
                          color: res.status === 'confirmed' ? '#333' : '#aaa',
                          border: '1px solid #333',
                          borderRadius: '4px',
                          padding: '4px 16px',
                          cursor: res.status === 'confirmed' ? 'pointer' : 'not-allowed',
                        }}
                      >
                        来店済
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} style={{ padding: '20px', color: '#666' }}>
                    条件に一致する予約データがありません。
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