<!-- src/components/Header.vue -->
<template>
  <header
    style="
      background-color: #333;
      color: #fff;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    "
  >
    <div style="display: flex; align-items: center; gap: 15px;">
      <!-- ハンバーガーアイコン -->
      <button
        v-if="onToggleSidebar"
        @click="onToggleSidebar"
        aria-label="メニューを開閉"
        style="
          background-color: transparent;
          color: #fff;
          border: none;
          padding: 4px;
          font-size: 22px;
          cursor: pointer;
          display: flex;
          align-items: center;
          line-height: 1;
        "
      >
        ☰
      </button>

      <!-- アプリタイトル -->
      <h1 style="margin: 0; font-size: 18px; color: #fff;">
        テニスコート予約システム
      </h1>
    </div>

    <div style="display: flex; align-items: center; gap: 15px;">
      <span style="color: #fff;">
        {{ currentUser.name }} 様 ({{ currentUser.role === 'admin' ? '管理者' : '一般ユーザー' }})
      </span>
      <button
        @click="handleLogoutClick"
        style="
          background-color: #6c757d;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 6px 12px;
          cursor: pointer;
        "
      >
        ログアウト
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { User } from '../types';

const props = defineProps<{
  currentUser: User;
  onToggleSidebar?: () => void;
}>();

const emit = defineEmits<{
  (e: 'logout'): void;
}>();

// E03 ログアウトボタン押下処理
const handleLogoutClick = () => {
  if (window.confirm('ログアウトしますか？')) {
    emit('logout');
  }
};
</script>