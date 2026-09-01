<!-- src/components/Dashboard.vue -->
<template>
  <div style="padding: 20px; flex: 1;">
    <h2 style="margin-top: 0; margin-bottom: 8px; color: #333;">ダッシュボード</h2>
    <p style="color: #666; margin-top: 0; margin-bottom: 20px;">
      ようこそ、{{ currentUser.name }} さん！
    </p>

    <p v-if="loading" style="text-align: center; color: #666;">データを読み込み中...</p>

    <template v-else>
      <!-- サマリーカード -->
      <div style="display: flex; gap: 20px; margin-bottom: 30px;">
        <div
          style="
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            background-color: #fff;
            width: 180px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          "
        >
          <div style="color: #555; font-size: 14px; font-weight: bold;">利用可能コート</div>
          <div style="font-size: 28px; font-weight: bold; margin-top: 10px; color: #007bff;">
            {{ availableCourtsCount }} 件
          </div>
        </div>

        <div
          style="
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            background-color: #fff;
            width: 180px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          "
        >
          <div style="color: #555; font-size: 14px; font-weight: bold;">あなたの予約数</div>
          <div style="font-size: 28px; font-weight: bold; margin-top: 10px; color: #28a745;">
            {{ activeReservations.length }} 件
          </div>
        </div>
      </div>

      <!-- 予約カレンダーエリア -->
      <div
        style="
          background-color: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 30px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        "
      >
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
          "
        >
          <h3 style="margin: 0; color: #333;">
            ■ 予約カレンダー（{{ currentYear }}年 {{ currentMonth }}月）
          </h3>
          <div>
            <button
              @click="handlePrevMonth"
              style="
                padding: 6px 12px;
                margin-right: 8px;
                cursor: pointer;
                border: 1px solid #ccc;
                border-radius: 4px;
                background-color: #fff;
              "
            >
              &lt; 前月
            </button>
            <button
              @click="handleNextMonth"
              style="
                padding: 6px 12px;
                cursor: pointer;
                border: 1px solid #ccc;
                border-radius: 4px;
                background-color: #fff;
              "
            >
              次月 &gt;
            </button>
          </div>
        </div>

        <div
          style="
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 1px;
            background-color: #ccc;
            border: 1px solid #ccc;
          "
        >
          <div
            v-for="(day, idx) in weekDays"
            :key="day"
            :style="{
              backgroundColor: '#f8f9fa',
              padding: '8px',
              textAlign: 'center',
              fontWeight: 'bold',
              color: idx === 0 ? '#dc3545' : idx === 6 ? '#007bff' : '#333'
            }"
          >
            {{ day }}
          </div>

          <template v-for="(dateNum, index) in days">
            <div
              v-if="dateNum === null"
              :key="`empty-${index}`"
              style="background-color: #f8f9fa; min-height: 80px;"
            />
            <div
              v-else
              :key="dateNum"
              style="
                background-color: #fff;
                padding: 6px;
                min-height: 80px;
                box-sizing: border-box;
              "
            >
              <div
                style="
                  font-weight: bold;
                  font-size: 13px;
                  color: #555;
                  margin-bottom: 4px;
                "
              >
                {{ dateNum }}
              </div>

              <div
                v-for="res in getReservationsForDate(dateNum)"
                :key="res.id"
                :style="{
                  backgroundColor: res.status === 'confirmed' ? '#d4edda' : '#e2e3e5',
                  color: res.status === 'confirmed' ? '#155724' : '#383d41',
                  fontSize: '11px',
                  padding: '3px 5px',
                  borderRadius: '3px',
                  marginBottom: '4px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }"
                :title="`${res.courtName} (${res.timeSlot})`"
              >
                {{ res.courtName }}
                <br />
                {{ res.timeSlot }}
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- 直近の予約状況一覧テーブル -->
      <div style="background-color: #fff; padding: 10px 0;">
        <h3 style="margin: 0 0 15px 0; color: #333;">■ 直近の予約状況一覧（最新1件）</h3>

        <table
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
              <th style="border: 1px solid #333; padding: 10px;">コート名</th>
              <th style="border: 1px solid #333; padding: 10px;">利用日時</th>
              <th style="border: 1px solid #333; padding: 10px;">ステータス</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="latestReservation.length > 0">
              <tr
                v-for="res in latestReservation"
                :key="res.id"
                style="border-bottom: 1px solid #333;"
              >
                <td style="border: 1px solid #333; padding: 10px;">{{ res.id }}</td>
                <td style="border: 1px solid #333; padding: 10px;">{{ res.courtName }}</td>
                <td style="border: 1px solid #333; padding: 10px;">
                  {{ res.date }} {{ res.timeSlot }}
                </td>
                <td style="border: 1px solid #333; padding: 10px;">
                  {{ getStatusText(res.status) }}
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colSpan="4" style="padding: 20px; color: #666;">
                  予約がありません
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import type { User, Court, Reservation } from '../types';

const props = defineProps<{
  currentUser: User;
}>();

const courts = ref<Court[]>([]);
const reservations = ref<Reservation[]>([]);
const loading = ref<boolean>(true);

const currentYear = ref<number>(2026);
const currentMonth = ref<number>(9);

const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

const fetchData = async () => {
  try {
    loading.value = true;

    // 1. コート一覧の取得
    const courtRes = await fetch('http://localhost:8080/api/courts');
    if (!courtRes.ok) throw new Error('コート情報の取得に失敗しました');
    const courtData: Court[] = await courtRes.json();
    courts.value = courtData;

    // 2. 予約一覧の取得 (管理者の場合は全件、一般ユーザーはユーザー別)
    const reservationUrl =
      props.currentUser.role === 'admin'
        ? 'http://localhost:8080/api/reservations'
        : `http://localhost:8080/api/reservations/user/${props.currentUser.id}`;

    const resRes = await fetch(reservationUrl);
    if (!resRes.ok) throw new Error('予約情報の取得に失敗しました');
    const resData: Reservation[] = await resRes.json();
    reservations.value = resData;
  } catch (error) {
    console.error(error);
    alert('ダッシュボードデータの取得に失敗しました。');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});

watch(
  () => props.currentUser,
  () => {
    fetchData();
  }
);

const availableCourtsCount = computed(() => {
  return courts.value.filter((c) => !c.isDeleted && c.status === 'available').length;
});

const activeReservations = computed(() => {
  return reservations.value.filter((res) => res.status !== 'cancelled');
});

const latestReservation = computed(() => {
  return activeReservations.value.slice(0, 1);
});

const days = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value - 1, 1).getDay();
  const daysInMonth = new Date(currentYear.value, currentMonth.value, 0).getDate();

  const daysArr: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    daysArr.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArr.push(i);
  }
  return daysArr;
});

const getReservationsForDate = (dateNum: number) => {
  const dateStr = `${currentYear.value}-${String(currentMonth.value).padStart(2, '0')}-${String(
    dateNum
  ).padStart(2, '0')}`;
  return reservations.value.filter(
    (r) => r.date === dateStr && r.status !== 'cancelled'
  );
};

const handlePrevMonth = () => {
  if (currentMonth.value === 1) {
    currentMonth.value = 12;
    currentYear.value -= 1;
  } else {
    currentMonth.value -= 1;
  }
};

const handleNextMonth = () => {
  if (currentMonth.value === 12) {
    currentMonth.value = 1;
    currentYear.value += 1;
  } else {
    currentMonth.value += 1;
  }
};

const getStatusText = (status: string) => {
  if (status === 'confirmed') return '予約済';
  if (status === 'completed') return '来店済';
  if (status === 'cancelled') return 'キャンセル';
  return '';
};
</script>