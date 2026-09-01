<!-- src/components/ReservationConfirm.vue -->
<template>
  <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; align-items: center;">
    <div style="width: 100%; max-width: 600px;">
      <h2 style="margin-top: 0; margin-bottom: 20px; color: #333;">予約確認</h2>

      <div style="background-color: #fff; padding: 24px; border-radius: 8px; border: 1px solid #ddd;">
        <h3 style="margin-top: 0; color: #d9534f; border-bottom: 2px solid #d9534f; padding-bottom: 10px;">
          予約内容の最終確認
        </h3>
        <p style="font-size: 14px; color: #555; margin: 16px 0 8px 0;">
          以下の内容で予約を確定します。よろしいですか？
        </p>

        <div style="background-color: #f8f9fa; padding: 16px; border-radius: 6px; margin: 20px 0; font-size: 15px;">
          <p style="margin: 10px 0;"><strong>予約者名：</strong> {{ currentUser?.name ? `${currentUser.name} 様` : '未設定' }}</p>
          <p style="margin: 10px 0;"><strong>コート名：</strong> {{ court.name }}</p>
          <p style="margin: 10px 0;"><strong>コート種別：</strong> {{ court.type }}</p>
          <p style="margin: 10px 0;"><strong>屋内/屋外：</strong> {{ court.isIndoor ? '屋内' : '屋外' }}</p>
          <p style="margin: 10px 0;"><strong>利用日時：</strong> {{ court.date }} {{ court.timeSlot }}</p>
          <p style="margin: 10px 0;"><strong>お支払い金額：</strong> ¥{{ court.pricePerHour?.toLocaleString() }}</p>
        </div>

        <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px;">
          <button
            @click="$emit('back')"
            :disabled="loading"
            style="padding: 8px 20px; background-color: #6c757d; color: #fff; border: none; border-radius: 4px; cursor: pointer;"
          >
            修正する
          </button>
          <button
            @click="handleConfirmReservation"
            :disabled="loading"
            :style="{
              padding: '8px 24px',
              backgroundColor: loading ? '#6c757d' : '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }"
          >
            {{ loading ? '処理中...' : 'この内容で予約を確定する' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Court, User } from '../types';

const props = defineProps<{
  court: Court;
  currentUser?: User;
}>();

const emit = defineEmits<{
  (e: 'back'): void;
  (e: 'confirm'): void;
}>();

const loading = ref(false);

const handleConfirmReservation = async () => {
  if (loading.value) return;

  if (!props.currentUser?.id) {
    alert('ログイン情報が見つかりません。再ログインしてください。');
    return;
  }

  loading.value = true;

  const reservationPayload = {
    userId: props.currentUser.id,
    userName: props.currentUser.name,
    courtId: props.court.id,
    courtName: props.court.name,
    date: props.court.date,
    timeSlot: props.court.timeSlot,
    totalPrice: props.court.pricePerHour,
    status: 'confirmed',
  };

  try {
    const response = await fetch('http://localhost:8080/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationPayload),
    });

    if (response.status === 409) {
      alert('申し訳ありません。ご指定のコート・日時は既に予約されています。別の枠をお選びください。');
      emit('back');
      return;
    }

    if (!response.ok) {
      throw new Error(`予約処理に失敗しました (HTTP: ${response.status})`);
    }

    emit('confirm');
  } catch (error) {
    console.error('予約処理エラー:', error);
    alert('予約の確定処理に失敗しました。時間をおいて再度お試しください。');
  } finally {
    loading.value = false;
  }
};
</script>