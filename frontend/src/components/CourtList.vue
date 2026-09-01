<!-- src/components/CourtList.vue -->
<template>
  <div style="padding: 20px; flex: 1;">
    <!-- 画面タイトル -->
    <h2 style="margin-top: 0; margin-bottom: 20px; color: #333;">コート検索・一覧</h2>

    <!-- 検索フォームエリア -->
    <div
      style="
        border-radius: 8px;
        padding: 10px 0 20px 0;
        margin-bottom: 20px;
        background-color: #fff;
        max-width: 600px;
      "
    >
      <div style="display: flex; flex-direction: column; gap: 15px; max-width: 350px;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <label style="font-weight: bold;">コート種別：</label>
          <select
            v-model="typeFilter"
            style="width: 180px; padding: 6px; font-size: 14px; border: 1px solid #333;"
          >
            <option value="すべて">すべて</option>
            <option value="オムニ">オムニ</option>
            <option value="クレー">クレー</option>
            <option value="ハード">ハード</option>
            <option value="人工芝">人工芝</option>
          </select>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between;">
          <label style="font-weight: bold;">屋内外：</label>
          <select
            v-model="locationFilter"
            style="width: 180px; padding: 6px; font-size: 14px; border: 1px solid #333;"
          >
            <option value="すべて">すべて</option>
            <option value="屋内">屋内</option>
            <option value="屋外">屋外</option>
          </select>
        </div>

        <div style="text-align: right; margin-top: 10px;">
          <button
            @click="handleSearch"
            style="
              background-color: #00a0e9;
              color: #fff;
              border: none;
              border-radius: 4px;
              padding: 8px 24px;
              font-size: 15px;
              font-weight: bold;
              cursor: pointer;
            "
          >
            検索
          </button>
        </div>
      </div>
    </div>

    <!-- コート一覧エリア -->
    <div style="border-radius: 8px; padding: 10px 0; background-color: #fff;">
      <h3 style="margin: 0 0 15px 0;">■ コート一覧</h3>

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
            <th style="border: 1px solid #333; padding: 12px; font-size: 16px;">コート名</th>
            <th style="border: 1px solid #333; padding: 12px; font-size: 16px;">コート種別</th>
            <th style="border: 1px solid #333; padding: 12px; font-size: 16px;">屋内外</th>
            <th style="border: 1px solid #333; padding: 12px; font-size: 16px;">利用日時</th>
            <th style="border: 1px solid #333; padding: 12px; font-size: 16px;">利用料金</th>
            <th style="border: 1px solid #333; padding: 12px; font-size: 16px;">概要・説明</th>
            <th style="border: 1px solid #333; padding: 12px; font-size: 16px;">詳細</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="filteredCourts.length > 0">
            <tr
              v-for="court in filteredCourts"
              :key="court.id"
              style="border-bottom: 1px solid #333;"
            >
              <td style="border: 1px solid #333; padding: 14px; font-size: 16px;">{{ court.name }}</td>
              <td style="border: 1px solid #333; padding: 14px; font-size: 16px;">{{ court.type }}</td>
              <td style="border: 1px solid #333; padding: 14px; font-size: 16px;">
                {{ court.isIndoor ? '屋内' : '屋外' }}
              </td>
              <td style="border: 1px solid #333; padding: 14px; font-size: 16px;">
                {{ court.date }} {{ court.timeSlot }}
              </td>
              <td style="border: 1px solid #333; padding: 14px; font-size: 16px;">
                ¥{{ court.pricePerHour?.toLocaleString() }}
              </td>
              <td style="border: 1px solid #333; padding: 14px; font-size: 16px; text-align: left;">
                {{ court.description }}
              </td>

              <td style="border: 1px solid #333; padding: 14px;">
                <button
                  @click="emit('selectCourt', court)"
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
                  詳細
                </button>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colSpan="7" style="padding: 20px; color: #666; font-size: 16px;">
                条件に一致するコートが見つかりませんでした。
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
import type { Court } from '../types';

const emit = defineEmits<{
  (e: 'selectCourt', court: Court): void;
}>();

const courts = ref<Court[]>([]);
const loading = ref<boolean>(true);

const typeFilter = ref<string>('すべて');
const locationFilter = ref<string>('すべて');

const appliedType = ref<string>('すべて');
const appliedLocation = ref<string>('すべて');

// バックエンドAPIからコート一覧を取得
const fetchCourts = async () => {
  try {
    loading.value = true;
    const response = await fetch('http://localhost:8080/api/courts');
    if (!response.ok) throw new Error('コート情報の取得に失敗しました');
    const data: Court[] = await response.json();
    courts.value = data;
  } catch (error) {
    console.error(error);
    alert('コート情報の取得に失敗しました。バックエンドが起動しているか確認してください。');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCourts();
});

const handleSearch = () => {
  appliedType.value = typeFilter.value;
  appliedLocation.value = locationFilter.value;
};

const filteredCourts = computed(() => {
  return courts.value.filter((court) => {
    // 削除済みデータおよび非公開データ（available以外）を除外
    if (court.isDeleted || court.status !== 'available') return false;

    const matchesType = appliedType.value === 'すべて' || court.type === appliedType.value;
    const matchesLocation =
      appliedLocation.value === 'すべて'
        ? true
        : appliedLocation.value === '屋内'
        ? court.isIndoor
        : !court.isIndoor;

    return matchesType && matchesLocation;
  });
});
</script>