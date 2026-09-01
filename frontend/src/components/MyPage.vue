<!-- src/components/MyPage.vue -->
<template>
  <div style="padding: 20px; flex: 1;">
    <h2 style="margin-top: 0; margin-bottom: 20px; color: #333;">マイページ</h2>

    <!-- ■ 会員情報エリア -->
    <div style="margin-bottom: 30px;">
      <h3 style="margin: 0 0 15px 0; border-bottom: 1px solid #eee; padding-bottom: 8px;">
        会員情報
      </h3>
      <div style="display: flex; flex-direction: column; gap: 12px; font-size: 18px; color: #333;">
        <div style="display: flex; align-items: center;">
          <span style="font-weight: bold; width: 80px;">氏名：</span>
          <span>{{ currentUser?.name }} 様</span>
        </div>
        <div style="display: flex; align-items: center;">
          <span style="font-weight: bold; width: 80px;">メール：</span>
          <span>{{ currentUser?.email }}</span>
        </div>
      </div>
    </div>

    <!-- ■ 予約履歴一覧エリア -->
    <div style="border-radius: 8px; padding: 10px 0; background-color: #fff;">
      <h3 style="margin: 0 0 15px 0;">■ 予約履歴一覧</h3>

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
            <th style="border: 1px solid #333; padding: 12px; font-size: 16px;">予約ID</th>
            <th style="border: 1px solid #333; padding: 12px; font-size: 16px;">コート名</th>
            <th style="border: 1px solid #333; padding: 12px; font-size: 16px;">利用日時</th>
            <th style="border: 1px solid #333; padding: 12px; font-size: 16px;">合計料金</th>
            <th style="border: 1px solid #333; padding: 12px; font-size: 16px;">ステータス</th>
            <th style="border: 1px solid #333; padding: 12px; font-size: 16px;">操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="reservations.length > 0">
            <tr
              v-for="res in reservations"
              :key="res.id"
              style="border-bottom: 1px solid #333;"
            >
              <td style="border: 1px solid #333; padding: 14px; font-size: 16px;">{{ res.id }}</td>
              <td style="border: 1px solid #333; padding: 14px; font-size: 16px;">{{ res.courtName }}</td>
              <td style="border: 1px solid #333; padding: 14px; font-size: 16px;">
                {{ res.date }} {{ res.timeSlot }}
              </td>
              <td style="border: 1px solid #333; padding: 14px; font-size: 16px;">
                ¥{{ res.totalPrice?.toLocaleString() }}
              </td>

              <!-- ■ ステータス（予約確定 / 利用済 / キャンセル） -->
              <td style="border: 1px solid #333; padding: 14px;">
                <span
                  :style="{
                    display: 'inline-block',
                    padding: '6px 16px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    borderRadius: '6px',
                    backgroundColor: getStatusBadgeStyle(res.status).bg,
                    color: getStatusBadgeStyle(res.status).color,
                    border: `1px solid ${getStatusBadgeStyle(res.status).border}`
                  }"
                >
                  {{ getStatusText(res.status) }}
                </span>
              </td>

              <!-- ■ 「詳細・変更」ボタン -->
              <td style="border: 1px solid #333; padding: 14px;">
                <button
                  @click="emit('selectReservation', res)"
                  style="
                    background-color: #00a0e9;
                    color: #fff;
                    border: none;
                    border-radius: 6px;
                    padding: 8px 20px;
                    font-size: 14px;
                    font-weight: bold;
                    cursor: pointer;
                  "
                >
                  詳細・変更
                </button>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colSpan="6" style="padding: 20px; color: #666; font-size: 16px;">
                予約履歴がありません。
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { User, Reservation } from '../types';

const props = defineProps<{
  currentUser: User | null;
}>();

const emit = defineEmits<{
  (e: 'selectReservation', reservation: Reservation): void;
}>();

const reservations = ref<Reservation[]>([]);
const loading = ref<boolean>(true);

// ステータスの表示テキスト変換
const getStatusText = (status?: string) => {
  if (status === 'completed' || status === '利用済' || status === '来店済') return '利用済';
  if (status === 'cancelled' || status === 'キャンセル') return 'キャンセル';
  return '予約確定';
};

// ステータスに応じたバッジスタイルの生成
const getStatusBadgeStyle = (status?: string) => {
  // 利用済 (グレー)
  if (status === 'completed' || status === '利用済' || status === '来店済') {
    return { bg: '#e2e3e5', color: '#41464b', border: '#d3d6d8' };
  }
  // キャンセル (赤)
  if (status === 'cancelled' || status === 'キャンセル') {
    return { bg: '#f8d7da', color: '#842029', border: '#f5c2c7' };
  }
  // 予約確定 (緑)
  return { bg: '#d4edda', color: '#0f5132', border: '#badbcc' };
};

const fetchReservations = async () => {
  if (!props.currentUser) return;
  try {
    loading.value = true;
    const response = await fetch(`http://localhost:8080/api/reservations/user/${props.currentUser.id}`);
    if (!response.ok) throw new Error('予約履歴の取得に失敗しました');
    const data: Reservation[] = await response.json();
    reservations.value = data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchReservations();
});

watch(
  () => props.currentUser,
  () => {
    fetchReservations();
  }
);
</script>