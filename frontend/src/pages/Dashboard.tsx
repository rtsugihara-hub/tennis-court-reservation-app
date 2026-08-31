// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import type { User, Court, Reservation } from '../types';

interface DashboardProps {
  currentUser: User;
}

export const Dashboard: React.FC<DashboardProps> = ({ currentUser }) => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(9);

  // バックエンドAPIからコート一覧および予約情報を取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. コート一覧の取得
        const courtRes = await fetch('http://localhost:8080/api/courts');
        if (!courtRes.ok) throw new Error('コート情報の取得に失敗しました');
        const courtData: Court[] = await courtRes.json();
        setCourts(courtData);

        // 2. 予約一覧の取得 (管理者の場合は全件、一般ユーザーはユーザー別)
        const reservationUrl = currentUser.role === 'admin'
          ? 'http://localhost:8080/api/reservations'
          : `http://localhost:8080/api/reservations/user/${currentUser.id}`;

        const resRes = await fetch(reservationUrl);
        if (!resRes.ok) throw new Error('予約情報の取得に失敗しました');
        const resData: Reservation[] = await resRes.json();
        setReservations(resData);
      } catch (error) {
        console.error(error);
        alert('ダッシュボードデータの取得に失敗しました。');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  const availableCourtsCount = courts.filter((c) => !c.isDeleted && c.status === 'available').length;
  const activeReservations = reservations.filter((res) => res.status !== 'cancelled');
  const latestReservation = activeReservations.slice(0, 1);

  const getDaysInMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();

    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const days = getDaysInMonth(currentYear, currentMonth);

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  return (
    <div style={{ padding: '20px', flex: 1 }}>
      <h2 style={{ marginTop: 0, marginBottom: '8px', color: '#333' }}>ダッシュボード</h2>
      <p style={{ color: '#666', marginTop: 0, marginBottom: '20px' }}>
        ようこそ、{currentUser.name} さん！
      </p>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#666' }}>データを読み込み中...</p>
      ) : (
        <>
          {/* サマリーカード */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
            <div
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: '#fff',
                width: '180px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ color: '#555', fontSize: '14px', fontWeight: 'bold' }}>利用可能コート</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '10px', color: '#007bff' }}>
                {availableCourtsCount} 件
              </div>
            </div>

            <div
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: '#fff',
                width: '180px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ color: '#555', fontSize: '14px', fontWeight: 'bold' }}>あなたの予約数</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '10px', color: '#28a745' }}>
                {activeReservations.length} 件
              </div>
            </div>
          </div>

          {/* 予約カレンダーエリア */}
          <div
            style={{
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '30px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, color: '#333' }}>
                ■ 予約カレンダー（{currentYear}年 {currentMonth}月）
              </h3>
              <div>
                <button
                  onClick={handlePrevMonth}
                  style={{ padding: '6px 12px', marginRight: '8px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff' }}
                >
                  &lt; 前月
                </button>
                <button
                  onClick={handleNextMonth}
                  style={{ padding: '6px 12px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff' }}
                >
                  次月 &gt;
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', backgroundColor: '#ccc', border: '1px solid #ccc' }}>
              {['日', '月', '火', '水', '木', '金', '土'].map((day, idx) => (
                <div
                  key={day}
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '8px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: idx === 0 ? '#dc3545' : idx === 6 ? '#007bff' : '#333',
                  }}
                >
                  {day}
                </div>
              ))}

              {days.map((dateNum, index) => {
                if (dateNum === null) {
                  return <div key={`empty-${index}`} style={{ backgroundColor: '#f8f9fa', minHeight: '80px' }} />;
                }

                const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(dateNum).padStart(2, '0')}`;
                const targetReservations = reservations.filter(
                  (r) => r.date === dateStr && r.status !== 'cancelled'
                );

                return (
                  <div
                    key={dateNum}
                    style={{
                      backgroundColor: '#fff',
                      padding: '6px',
                      minHeight: '80px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#555', marginBottom: '4px' }}>
                      {dateNum}
                    </div>

                    {targetReservations.map((res) => (
                      <div
                        key={res.id}
                        style={{
                          backgroundColor: res.status === 'confirmed' ? '#d4edda' : '#e2e3e5',
                          color: res.status === 'confirmed' ? '#155724' : '#383d41',
                          fontSize: '11px',
                          padding: '3px 5px',
                          borderRadius: '3px',
                          marginBottom: '4px',
                          border: '1px solid rgba(0,0,0,0.1)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        title={`${res.courtName} (${res.timeSlot})`}
                      >
                        {res.courtName}
                        <br />
                        {res.timeSlot}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 直近の予約状況一覧テーブル */}
          <div style={{ backgroundColor: '#fff', padding: '10px 0' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>■ 直近の予約状況一覧</h3>

            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #333', textAlign: 'center' }}>
              <thead>
                <tr style={{ backgroundColor: '#d4edda', borderBottom: '1px solid #333' }}>
                  <th style={{ border: '1px solid #333', padding: '10px' }}>予約ID</th>
                  <th style={{ border: '1px solid #333', padding: '10px' }}>コート名</th>
                  <th style={{ border: '1px solid #333', padding: '10px' }}>利用日時</th>
                  <th style={{ border: '1px solid #333', padding: '10px' }}>ステータス</th>
                </tr>
              </thead>
              <tbody>
                {latestReservation.length > 0 ? (
                  latestReservation.map((res) => (
                    <tr key={res.id} style={{ borderBottom: '1px solid #333' }}>
                      <td style={{ border: '1px solid #333', padding: '10px' }}>{res.id}</td>
                      <td style={{ border: '1px solid #333', padding: '10px' }}>{res.courtName}</td>
                      <td style={{ border: '1px solid #333', padding: '10px' }}>
                        {res.date} {res.timeSlot}
                      </td>
                      <td style={{ border: '1px solid #333', padding: '10px' }}>
                        {res.status === 'confirmed' && '予約済'}
                        {res.status === 'completed' && '来店済'}
                        {res.status === 'cancelled' && 'キャンセル'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} style={{ padding: '20px', color: '#666' }}>
                      予約がありません
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};