// src/pages/admin/AdminCourtList.tsx
import React, { useState, useEffect } from 'react';
import type { Court, Reservation } from '../../types';

export const AdminCourtList: React.FC = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [editingCourtId, setEditingCourtId] = useState<number | string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // フォーム入力用ステート
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [isIndoor, setIsIndoor] = useState<boolean | null>(null);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');

  // コート一覧および予約情報をバックエンドAPIから取得
  const loadCourts = async () => {
    try {
      setLoading(true);
      
      // 1. コート一覧の取得
      const courtRes = await fetch('http://localhost:8080/api/courts');
      if (!courtRes.ok) throw new Error('コート一覧の取得に失敗しました');
      const courtData: Court[] = await courtRes.json();
      setCourts(courtData);

      // 2. 予約一覧の取得（編集・削除制限の判定用）
      const resRes = await fetch('http://localhost:8080/api/reservations');
      if (resRes.ok) {
        const resData: Reservation[] = await resRes.json();
        setReservations(resData);
      }
    } catch (error) {
      console.error(error);
      alert('コート情報の取得に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourts();
  }, []);

  // ★ 対象のコートに有効な予約が入っているかチェックする判定関数
  const isCourtReserved = (courtId: number | string): boolean => {
    return reservations.some((r) => {
      const matchCourt = String(r.courtId) === String(courtId);
      const rStatus = (r.status || '').toLowerCase();
      const isActive = rStatus !== 'cancelled' && rStatus !== 'キャンセル' && rStatus !== 'キャンセル済';
      return matchCourt && isActive;
    });
  };

  // フォームのクリア
  const handleClear = () => {
    setEditingCourtId(null);
    setName('');
    setType('');
    setIsIndoor(null);
    setDate('');
    setTimeSlot('');
    setPrice('');
    setStatus('');
    setDescription('');
  };

  // 編集モードへのセット
  const handleEdit = (court: Court) => {
    if (isCourtReserved(court.id)) {
      alert('予約が存在するコートは編集できません。');
      return;
    }
    setEditingCourtId(court.id);
    setName(court.name);
    setType(court.type);
    setIsIndoor(court.isIndoor);
    setDate(court.date);
    setTimeSlot(court.timeSlot);
    setPrice(court.pricePerHour.toString());
    setStatus(court.status === 'available' ? '公開中' : '非公開');
    setDescription(court.description);
  };

  // 削除処理
  const handleDelete = async (id: number | string) => {
    if (isCourtReserved(id)) {
      alert('予約が存在するコートは削除できません。');
      return;
    }

    if (!window.confirm('このコート情報を削除しますか？')) return;

    try {
      const response = await fetch(`http://localhost:8080/api/courts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || '削除に失敗しました');
      }

      alert('削除しました');
      if (editingCourtId === id) handleClear();
      loadCourts();
    } catch (error: any) {
      console.error(error);
      alert(error.message || '削除処理に失敗しました。');
    }
  };

  // 保存処理（新規登録 or 編集更新）
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !type || isIndoor === null || !date || !timeSlot || !price || !status) {
      alert('必須項目をすべて入力してください。');
      return;
    }

    const courtDataPayload: Record<string, any> = {
      name,
      type,
      isIndoor: Boolean(isIndoor),
      date,
      timeSlot,
      pricePerHour: Number(price) || 0,
      description,
      status: status === '公開中' ? 'available' : 'maintenance',
      isDeleted: false,
    };

    if (editingCourtId) {
      courtDataPayload.id = editingCourtId;
    }

    try {
      const url = editingCourtId
        ? `http://localhost:8080/api/courts/${editingCourtId}`
        : 'http://localhost:8080/api/courts';
      const method = editingCourtId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courtDataPayload),
      });

      if (!response.ok) {
        throw new Error('保存に失敗しました');
      }

      alert(editingCourtId ? '更新しました' : '登録しました');
      handleClear();
      loadCourts();
    } catch (error) {
      console.error(error);
      alert('保存処理に失敗しました。');
    }
  };

  const activeCourts = courts.filter((court) => !court.isDeleted);

  return (
    <div style={{ padding: '20px', flex: 1 }}>
      <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>コート登録・編集</h2>

      {/* フォームエリア */}
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: '#fff',
          maxWidth: '550px',
          margin: '0 auto 30px auto',
        }}
      >
        <h3 style={{ textAlign: 'center', marginTop: 0, marginBottom: '20px' }}>
          {editingCourtId ? 'コート情報編集' : '新規コート登録'}
        </h3>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '130px', fontWeight: 'bold' }}>コート名：</label>
            <input
              type="text"
              placeholder="コート名を入力してください。"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ flex: 1, padding: '6px', border: '1px solid #333', borderRadius: '4px' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '130px', fontWeight: 'bold' }}>コート種別：</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{ flex: 1, padding: '6px', border: '1px solid #333', borderRadius: '4px' }}
            >
              <option value="">選択してください</option>
              <option value="オムニ">オムニ</option>
              <option value="クレー">クレー</option>
              <option value="ハード">ハード</option>
              <option value="人工芝">人工芝</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '130px', fontWeight: 'bold' }}>屋内外区分：</label>
            <div style={{ display: 'flex', gap: '15px' }}>
              <label>
                <input
                  type="radio"
                  name="indoorOutdoor"
                  checked={isIndoor === false}
                  onChange={() => setIsIndoor(false)}
                /> 屋外
              </label>
              <label>
                <input
                  type="radio"
                  name="indoorOutdoor"
                  checked={isIndoor === true}
                  onChange={() => setIsIndoor(true)}
                /> 屋内
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '130px', fontWeight: 'bold' }}>利用日：</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ flex: 1, padding: '6px', border: '1px solid #333', borderRadius: '4px' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '130px', fontWeight: 'bold' }}>利用時間帯：</label>
            <input
              type="text"
              placeholder="例: 10:00-12:00"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              style={{ flex: 1, padding: '6px', border: '1px solid #333', borderRadius: '4px' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '130px', fontWeight: 'bold' }}>利用料金：</label>
            <input
              type="number"
              placeholder="例: 2000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{ flex: 1, padding: '6px', border: '1px solid #333', borderRadius: '4px' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '130px', fontWeight: 'bold' }}>公開ステータス：</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ flex: 1, padding: '6px', border: '1px solid #333', borderRadius: '4px' }}
            >
              <option value="">選択してください</option>
              <option value="公開中">公開中</option>
              <option value="非公開">非公開</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <label style={{ width: '130px', fontWeight: 'bold', marginTop: '6px' }}>備考・説明：</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ flex: 1, padding: '6px', border: '1px solid #333', borderRadius: '4px' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={handleClear}
              style={{ padding: '6px 20px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              クリア
            </button>
            <button
              type="submit"
              style={{ padding: '6px 24px', backgroundColor: '#00a0e9', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              {editingCourtId ? '更新' : '保存'}
            </button>
          </div>
        </form>
      </div>

      {/* 一覧テーブルエリア */}
      <div style={{ padding: '10px 0', backgroundColor: '#fff' }}>
        <h3 style={{ margin: '0 0 15px 0' }}>■ コート一覧</h3>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#666' }}>データを読み込み中...</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #333', textAlign: 'center' }}>
            <thead>
              <tr style={{ backgroundColor: '#d4edda', borderBottom: '1px solid #333' }}>
                <th style={{ border: '1px solid #333', padding: '8px' }}>コートID</th>
                <th style={{ border: '1px solid #333', padding: '8px' }}>コート名</th>
                <th style={{ border: '1px solid #333', padding: '8px' }}>コート種別</th>
                <th style={{ border: '1px solid #333', padding: '8px' }}>屋内外</th>
                <th style={{ border: '1px solid #333', padding: '8px' }}>利用日時</th>
                <th style={{ border: '1px solid #333', padding: '8px' }}>利用料金</th>
                <th style={{ border: '1px solid #333', padding: '8px' }}>公開ステータス</th>
                <th style={{ border: '1px solid #333', padding: '8px' }}>備考・説明</th>
                <th style={{ border: '1px solid #333', padding: '8px' }}>編集・削除</th>
              </tr>
            </thead>
            <tbody>
              {activeCourts.length > 0 ? (
                activeCourts.map((court) => {
                  const reserved = isCourtReserved(court.id);
                  return (
                    <tr key={court.id} style={{ borderBottom: '1px solid #333' }}>
                      <td style={{ border: '1px solid #333', padding: '10px' }}>{court.id}</td>
                      <td style={{ border: '1px solid #333', padding: '10px' }}>{court.name}</td>
                      <td style={{ border: '1px solid #333', padding: '10px' }}>{court.type}</td>
                      <td style={{ border: '1px solid #333', padding: '10px' }}>{court.isIndoor ? '屋内' : '屋外'}</td>
                      <td style={{ border: '1px solid #333', padding: '10px' }}>{court.date} {court.timeSlot}</td>
                      <td style={{ border: '1px solid #333', padding: '10px' }}>¥{court.pricePerHour?.toLocaleString()}</td>
                      <td style={{ border: '1px solid #333', padding: '10px' }}>{court.status === 'available' ? '公開中' : '非公開'}</td>
                      <td style={{ border: '1px solid #333', padding: '10px', textAlign: 'left' }}>{court.description}</td>
                      <td style={{ border: '1px solid #333', padding: '10px' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button
                            onClick={() => handleEdit(court)}
                            disabled={reserved}
                            style={{
                              backgroundColor: reserved ? '#ccc' : '#00a0e9',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '4px',
                              padding: '4px 12px',
                              cursor: reserved ? 'not-allowed' : 'pointer',
                              opacity: reserved ? 0.6 : 1,
                            }}
                            title={reserved ? '予約が存在するため編集できません' : ''}
                          >
                            編集
                          </button>
                          <button
                            onClick={() => handleDelete(court.id)}
                            disabled={reserved}
                            style={{
                              backgroundColor: reserved ? '#ccc' : '#dc3545',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '4px',
                              padding: '4px 12px',
                              cursor: reserved ? 'not-allowed' : 'pointer',
                              opacity: reserved ? 0.6 : 1,
                            }}
                            title={reserved ? '予約が存在するため削除できません' : ''}
                          >
                            削除
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} style={{ padding: '20px', color: '#666' }}>
                    登録されているコートがありません。
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