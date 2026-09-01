<!-- src/components/ReservationComplete.vue -->
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
      <h2 style="margin-top: 0; margin-bottom: 20px; color: #333;">予約完了</h2>

      <div
        style="
          background-color: #fff;
          padding: 40px 24px;
          border-radius: 8px;
          border: 1px solid #ddd;
          text-align: center;
        "
      >
        <h3
          style="
            margin-top: 0;
            color: #28a745;
            font-size: 22px;
            margin-bottom: 16px;
          "
        >
          予約が完了いたしました！
        </h3>
        <p style="font-size: 15px; color: #555; margin-bottom: 32px;">
          ご予約ありがとうございました。マイページより予約の確認が行えます。
        </p>

        <!-- 遷移ボタンエリア -->
        <div style="display: flex; gap: 16px; justify-content: center;">
          <button
            @click="emit('goToDashboard')"
            style="
              padding: 10px 24px;
              background-color: #6c757d;
              color: #fff;
              font-size: 15px;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            "
          >
            ダッシュボードへ
          </button>
          <button
            @click="emit('goToMyPage')"
            style="
              padding: 10px 24px;
              background-color: #007bff;
              color: #fff;
              font-size: 15px;
              font-weight: bold;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            "
          >
            予約履歴を確認する
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'goToDashboard'): void;
  (e: 'goToMyPage'): void;
}>();
</script>