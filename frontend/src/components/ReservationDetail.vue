<!-- src/components/ReservationDetail.vue -->
<template>
  <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; align-items: center;">
    <div style="width: 100%; max-width: 600px;">
      <h2 style="margin-top: 0; margin-bottom: 20px; color: #333;">予約詳細</h2>

      <div style="background-color: #fff; padding: 24px; border-radius: 8px; border: 1px solid #ddd; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
        <h3 style="margin-top: 0; border-bottom: 2px solid #333; padding-bottom: 10px; color: #333;">
          予約詳細情報
        </h3>

        <div style="display: grid; grid-template-columns: 130px 1fr; gap: 14px; margin: 24px 0; font-size: 15px;">
          <strong>予約ID:</strong> <div>{{ reservation.id }}</div>
          <strong>予約者名:</strong> <div>{{ currentUser.name }}</div>
          <strong>コート名:</strong> <div>{{ reservation.courtName }}</div>
          <strong>利用日時:</strong> <div>{{ reservation.date }} {{ reservation.timeSlot }}</div>
          <strong>お支払金額:</strong> <div>¥{{ reservation.totalPrice?.toLocaleString() }}</div>
          <strong>予約ステータス:</strong> 
          <div :style="{ fontWeight: 'bold', color: isCanceled ? '#dc3545' : '#28a745' }">
            {{ getStatusText(isCanceled ? 'cancelled' : reservation.status) }}
          </div>
          <strong>予約申込日時:</strong> <div>{{ formatToJST(reservation.createdAt) }}</div>
        </div>

        <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px;">
          <button
            @click="$emit('backToMyPage')"
            :disabled="loading"
            style="padding: 8px 20px; background-color: #6c757d; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 14px;"
          >
            マイページへ戻る
          </button>

          <button
            v-if="!isCanceled && reservation.status === 'confirmed'"
            @click="handleCancel"
            :disabled="loading"
            :style="{
              padding: '8px 20px',
              backgroundColor: loading ? '#6c757d' : '#dc3545',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }"
          >
            {{ loading ? '処理中...' : '予約キャンセル' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Reservation, User } from '../types';

const props = defineProps<{
  reservation: Reservation;
  currentUser: User;
}>();

const emit = defineEmits<{
  (e: 'backToMyPage'): void;
  (e: 'cancelReservation', reservationId: string): void;
}>();

const isCanceled = ref(props.reservation.status === 'cancelled');
const loading = ref(false);

const formatToJST = (dateString?: string) => {
  if (!dateString) return '2026-08-24 17:00';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const formatter = new Intl.DateTimeFormat('ja-JP', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const parts = formatter.formatToParts(date);
    const hash: Record<string, string> = {};
    parts.forEach(({ type, value }) => {
      hash[type] = value;
    });

    return `${hash.year}-${hash.month}-${hash.day} ${hash.hour}:${hash.minute}`;
  } catch {
    return dateString;
  }
};

const handleCancel = async () => {
  if (!window.confirm('この予約をキャンセルしますか？')) return;

  loading.value = true;

  try {
    const response = await fetch(`http://localhost:8080/api/reservations/${props.reservation.id}/cancel`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('キャンセルの実行に失敗しました');
    }

    alert('予約をキャンセルいたしました。');
    isCanceled.value = true;
    emit('cancelReservation', props.reservation.id);
  } catch (error) {
    console.error(error);
    alert('予約のキャンセル処理に失敗しました。');
  } finally {
    loading.value = false;
  }
};

const getStatusText = (status: string) => {
  if (status === 'confirmed') return '予約済';
  if (status === 'completed') return '利用済';
  return 'キャンセル済';
};
</script>