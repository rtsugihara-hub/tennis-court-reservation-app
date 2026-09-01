<!-- src/components/admin/AdminReservationList.vue -->
<template>
  <div style="padding: 20px; flex: 1;">
    <!-- 画面タイトル -->
    <h2 style="margin-top: 0; margin-bottom: 20px; color: #333;">予約一覧</h2>

    <!-- 検索フォームエリア -->
    <div
      style="
        border-radius: 8px;
        padding: 10px 0 20px 0;
        margin-bottom: 20px;
        background-color: #fff;
        max-width: 450px;
      "
    >
      <div style="display: flex; flex-direction: column; gap: 15px;">
        <!-- 利用日 -->
        <div style="display: flex; align-items: center;">
          <label style="width: 100px; font-weight: bold;">利用日：</label>
          <input
            type="date"
            v-model="dateFilter"
            style="padding: 6px; font-size: 14px; border: 1px solid #333; border-radius: 4px; width: 180px;"
          />
        </div>

        <!-- ステータス -->
        <div style="display: flex; align-items: center;">
          <label style="width: 100px; font-weight: bold;">ステータス：</label>
          <select
            v-model="statusFilter"
            style="padding: 6px; font-size: 14px; border: 1px solid #333; border-radius: 4px; width: 180px;"
          >
            <option value="すべて">すべて</option>
            <option value="予約済">予約済</option>
            <option value="来店済">来店済</option>
            <option value="キャンセル">キャンセル</option>
          </select>
        </div>

        <!-- リセット / 検索 ボタン -->
        <div style="display: flex; gap: 12px; justify-content: flex-start; margin-left: 100px; margin-top: 5px;">
          <button
            @click="handleReset"
            style="
              background-color: #fff;
              color: #333;
              border: 1px solid #333;
              border-radius: 4px;
              padding: 6px 20px;
              font-size: 14px;
              cursor: pointer;
            "
          >
            リセット
          </button>
          <button
            @click="handleSearch"
            style="
              background-color: #00a0e9;
              color: #fff;
              border: none;
              border-radius: 4px;
              padding: 6px 24px;
              font-size: 14px;
              font-weight: bold;
              cursor: pointer;
            "
          >
            検索
          </button>
        </div>
      </div>
    </div>

    <!-- 一覧テーブルエリア -->
    <div style="padding: 10px 0; background-color: #fff;">
      <h3 style="margin: 0 0 15px 0;">■ 予約一覧</h3>

      <p v-if="loading" style="text-align: center; color: #666;">データを読み込み中...</p>

      <table
        v-else
        style="
          width: 100%;
          border-collapse: collapse;
          border: 1px solid #333;
          text-align: center;
        "
      >
        <thead>
          <tr style="background-color: #d4edda; border-bottom: 1px solid #333;">
            <th style="border: 1px solid #333; padding: 10px;">予約ID</th>
            <th style="border: 1px solid #333; padding: 10px;">予約者名</th>
            <th style="border: 1px solid #333; padding: 10px;">コート名</th>
            <th style="border: 1px solid #333; padding: 10px;">利用日時</th>
            <th style="border: 1px solid #333; padding: 10px;">合計金額</th>
            <th style="border: 1px solid #333; padding: 10px;">ステータス</th>
            <th style="border: 1px solid #333; padding: 10px;">ステータス更新</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="filteredReservations.length > 0">
            <tr v-for="res in filteredReservations" :key="res.id" style="border-bottom: 1px solid #333;">
              <td style="border: 1px solid #333; padding: 12px;">{{ res.id }}</td>
              <td style="border: 1px solid #333; padding: 12px;">{{ res.userName || '未登録' }}</td>
              <td style="border: 1px solid #333; padding: 12px;">{{ res.courtName }}</td>
              <td style="border: 1px solid #333; padding: 12px;">
                {{ res.date }} {{ res.timeSlot }}
              </td>
              <td style="border: 1px solid #333; padding: 12px;">
                ¥{{ res.totalPrice?.toLocaleString() }}
              </td>
              <td style="border: 1px solid #333; padding: 12px;">
                {{ getStatusText(res.status) }}
              </td>
              <td style="border: 1px solid #333; padding: 12px;">
                <button
                  @click="handleMarkAsVisited(res.id)"
                  :disabled="res.status !== 'confirmed'"
                  :style="{
                    backgroundColor: res.status === 'confirmed' ? '#e2e3e5' : '#f8f9fa',
                    color: res.status === 'confirmed' ? '#333' : '#aaa',
                    border: '1px solid #333',
                    borderRadius: '4px',
                    padding: '4px 16px',
                    cursor: res.status === 'confirmed' ? 'pointer' : 'not-allowed'
                  }"
                >
                  来店済
                </button>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colSpan="7" style="padding: 20px; color: #666;">
                条件に一致する予約データがありません。
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { Reservation } from '../../types';

const reservations = ref<Reservation[]>([]);
const loading = ref<boolean>(true);

// 検索条件用ステート
const dateFilter = ref<string>('');
const statusFilter = ref<string>('すべて');

// 適用済みの検索条件ステート
const appliedDate = ref<string>('');
const appliedStatus = ref<string>('すべて');

// バックエンドから全予約一覧を取得
const fetchReservations = async () => {
  try {
    loading.value = true;
    const response = await fetch('http://localhost:8080/api/reservations');
    if (!response.ok) throw new Error('予約データの取得に失敗しました');
    const data: Reservation[] = await response.json();
    reservations.value = data;
  } catch (error) {
    console.error(error);
    alert('予約データの取得に失敗しました。バックエンドの状態を確認してください。');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchReservations();
});

// 検索実行
const handleSearch = () => {
  appliedDate.value = dateFilter.value;
  appliedStatus.value = statusFilter.value;
};

// リセット実行
const handleReset = () => {
  dateFilter.value = '';
  statusFilter.value = 'すべて';
  appliedDate.value = '';
  appliedStatus.value = 'すべて';
};

// ★ 「予約済」から「来店済」へのステータス更新処理 (API通信)
const handleMarkAsVisited = async (id: number | string) => {
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
const filteredReservations = computed(() => {
  return reservations.value.filter((res: Reservation) => {
    // 利用日フィルター
    const matchesDate = appliedDate.value === '' || res.date === appliedDate.value;

    // ステータスフィルター
    let matchesStatus = true;
    if (appliedStatus.value === '予約済') matchesStatus = res.status === 'confirmed';
    if (appliedStatus.value === '来店済') matchesStatus = res.status === 'completed';
    if (appliedStatus.value === 'キャンセル') matchesStatus = res.status === 'cancelled';

    return matchesDate && matchesStatus;
  });
});

const getStatusText = (status: string) => {
  if (status === 'confirmed') return '予約済';
  if (status === 'completed') return '来店済';
  if (status === 'cancelled') return 'キャンセル';
  return '';
};
</script>