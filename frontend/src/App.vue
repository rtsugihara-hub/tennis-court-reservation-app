<!-- src/App.vue -->
<template>
  <!-- 1. 未ログイン時：ログイン画面表示 -->
  <Login v-if="!currentUser" @login="handleLogin" />

  <!-- 2. ログイン時：メインシステム画面 -->
  <div v-else style="min-height: 100vh; display: flex; flex-direction: column; font-family: sans-serif; background-color: #fff;">
    <Header
      :current-user="currentUser"
      :on-toggle-sidebar="toggleSidebar"
      @logout="handleLogout"
    />

    <div style="display: flex; flex: 1;">
      <Sidebar
        :current-user="currentUser"
        :current-tab="currentTab"
        :is-open="isSidebarOpen"
        @select-tab="handleSelectTab"
      />

      <main style="flex: 1; display: flex; flex-direction: column;">
        <!-- 一般ユーザー画面 -->
        <Dashboard
          v-if="currentTab === 'dashboard'"
          :current-user="currentUser"
        />

        <CourtList
          v-else-if="currentTab === 'courts'"
          @select-court="handleSelectCourt"
        />

        <CourtDetail
          v-else-if="currentTab === 'court-detail' && selectedCourt"
          :court="selectedCourt"
          @back="currentTab = 'courts'"
          @go-to-confirm="currentTab = 'confirm'"
        />

        <ReservationConfirm
          v-else-if="currentTab === 'confirm' && selectedCourt"
          :court="selectedCourt"
          :current-user="currentUser"
          @back="currentTab = 'court-detail'"
          @confirm="handleConfirmSuccess"
        />

        <ReservationComplete
          v-else-if="currentTab === 'complete'"
          @go-to-dashboard="currentTab = 'dashboard'"
          @go-to-my-page="currentTab = 'mypage'"
        />

        <MyPage
          v-else-if="currentTab === 'mypage'"
          :current-user="currentUser"
          @select-reservation="handleSelectReservation"
        />

        <ReservationDetail
          v-else-if="currentTab === 'detail' && selectedReservation"
          :reservation="selectedReservation"
          :current-user="currentUser"
          @back-to-my-page="currentTab = 'mypage'"
          @cancel-reservation="handleCancelSuccess"
        />

        <!-- 管理者画面 -->
        <AdminCourtList
          v-else-if="currentTab === 'admin-courts'"
        />

        <AdminReservationList
          v-else-if="currentTab === 'admin-reservations'"
        />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { User, Court, Reservation } from './types';

// コンポーネントインポート
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import Login from './components/Login.vue';
import Dashboard from './components/Dashboard.vue';
import CourtList from './components/CourtList.vue';
import CourtDetail from './components/CourtDetail.vue';
import ReservationConfirm from './components/ReservationConfirm.vue';
import ReservationComplete from './components/ReservationComplete.vue';
import MyPage from './components/MyPage.vue';
import ReservationDetail from './components/ReservationDetail.vue';
import AdminCourtList from './components/admin/AdminCourtList.vue';
import AdminReservationList from './components/admin/AdminReservationList.vue';

// ログイン状態（初期状態を null に設定してログイン画面を表示）
const currentUser = ref<User | null>(null);

// UI状態
const isSidebarOpen = ref(true);
const currentTab = ref('dashboard');

// 選択データ
const selectedCourt = ref<Court | null>(null);
const selectedReservation = ref<Reservation | null>(null);

// イベントハンドラ
const handleLogin = (user: User) => {
  currentUser.value = user;
  currentTab.value = user.role === 'admin' ? 'admin-courts' : 'dashboard';
};

const handleLogout = () => {
  currentUser.value = null;
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const handleSelectTab = (tab: string) => {
  currentTab.value = tab;
};

const handleSelectCourt = (court: Court) => {
  selectedCourt.value = court;
  currentTab.value = 'court-detail';
};

const handleConfirmSuccess = () => {
  currentTab.value = 'complete';
};

const handleSelectReservation = (reservation: Reservation) => {
  selectedReservation.value = reservation;
  currentTab.value = 'detail';
};

const handleCancelSuccess = (canceledId: string) => {
  if (selectedReservation.value && selectedReservation.value.id === canceledId) {
    selectedReservation.value.status = 'cancelled';
  }
};
</script>