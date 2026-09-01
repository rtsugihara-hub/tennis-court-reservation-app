<!-- src/components/Sidebar.vue -->
<template>
  <aside
    v-if="isOpen"
    style="
      width: 220px;
      background-color: #f4f4f4;
      border-right: 1px solid #ddd;
      min-height: calc(100vh - 50px);
    "
  >
    <div
      style="
        padding: 10px 16px;
        font-weight: bold;
        border-bottom: 1px solid #ddd;
        color: #666;
        font-size: 12px;
      "
    >
      {{ isAdmin ? '管理メニュー' : 'メインメニュー' }}
    </div>

    <nav>
      <!-- E04: 一般ユーザー (role: "user") の表示制御 -->
      <template v-if="!isAdmin">
        <button :style="getButtonStyle('dashboard')" @click="handleTabClick('dashboard')">
          ダッシュボード
        </button>
        <button :style="getButtonStyle('courts')" @click="handleTabClick('courts')">
          コート一覧・予約
        </button>
        <button :style="getButtonStyle('mypage')" @click="handleTabClick('mypage')">
          マイページ
        </button>
      </template>

      <!-- E04: 管理者 (role: "admin") の表示制御（ダッシュボード非表示） -->
      <template v-if="isAdmin">
        <button :style="getButtonStyle('admin-courts')" @click="handleTabClick('admin-courts')">
          コート登録・編集
        </button>
        <button :style="getButtonStyle('admin-reservations')" @click="handleTabClick('admin-reservations')">
          予約一覧・受付管理
        </button>
      </template>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { User } from '../types';

const props = withDefaults(
  defineProps<{
    currentUser: User;
    currentTab: string;
    isOpen?: boolean;
  }>(),
  {
    isOpen: true,
  }
);

const emit = defineEmits<{
  (e: 'selectTab', tab: string): void;
}>();

const isAdmin = computed(() => props.currentUser.role === 'admin');

// E04 画面遷移ボタン押下処理
const handleTabClick = (tab: string) => {
  emit('selectTab', tab);
};

const getButtonStyle = (tabName: string) => ({
  display: 'block',
  width: '100%',
  padding: '12px 16px',
  textAlign: 'left' as const,
  backgroundColor: props.currentTab === tabName ? '#007bff' : 'transparent',
  color: props.currentTab === tabName ? '#fff' : '#333',
  border: 'none',
  borderBottom: '1px solid #e0e0e0',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: props.currentTab === tabName ? 'bold' : 'normal',
});
</script>