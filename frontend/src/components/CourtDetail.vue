<!-- src/components/CourtDetail.vue -->
<template>
  <div
    style="
      padding: 20px;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    "
  >
    <div style="width: 100%; max-width: 600px;">
      <!-- 画面タイトル -->
      <h2 style="margin-top: 0; margin-bottom: 20px; color: #333;">コート詳細</h2>

      <div
        style="
          background-color: #fff;
          padding: 24px;
          border-radius: 8px;
          border: 1px solid #ddd;
        "
      >
        <h3
          style="
            margin-top: 0;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
            color: #333;
          "
        >
          コート詳細情報
        </h3>

        <div
          style="
            display: grid;
            grid-template-columns: 120px 1fr;
            gap: 12px;
            margin: 24px 0;
            font-size: 15px;
          "
        >
          <strong>コート名:</strong> <div>{{ court.name }}</div>
          <strong>コート種別:</strong> <div>{{ court.type }}</div>
          <strong>屋内外:</strong> <div>{{ court.isIndoor ? '屋内' : '屋外' }}</div>
          <strong>利用日時:</strong> <div>{{ court.date }} {{ court.timeSlot }}</div>
          <strong>利用料金:</strong> <div>¥{{ court.pricePerHour?.toLocaleString() }}</div>
          <strong>概要・説明:</strong> <div>{{ court.description }}</div>
        </div>

        <div
          style="
            display: flex;
            gap: 12px;
            justify-content: flex-end;
            margin-top: 24px;
          "
        >
          <button
            @click="emit('back')"
            style="
              padding: 8px 20px;
              background-color: #6c757d;
              color: #fff;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            "
          >
            一覧へ戻る
          </button>
          <button
            @click="emit('goToConfirm')"
            :disabled="court.status !== 'available'"
            :style="{
              padding: '8px 20px',
              backgroundColor: court.status === 'available' ? '#28a745' : '#6c757d',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: court.status === 'available' ? 'pointer' : 'not-allowed'
            }"
          >
            {{ court.status === 'available' ? '予約手続きへ' : '予約不可' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Court } from '../types';

defineProps<{
  court: Court;
}>();

const emit = defineEmits<{
  (e: 'back'): void;
  (e: 'goToConfirm'): void;
}>();
</script>