<!-- src/components/admin/AdminCourtList.vue -->
<template>
  <div style="padding: 20px; flex: 1;">
    <h2 style="margin-top: 0; margin-bottom: 20px; color: #333;">コート登録・編集</h2>

    <!-- フォームエリア -->
    <div
      style="
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 20px;
        background-color: #fff;
        max-width: 550px;
        margin: 0 auto 30px auto;
      "
    >
      <h3 style="text-align: center; margin-top: 0; margin-bottom: 20px;">
        {{ editingCourtId ? 'コート情報編集' : '新規コート登録' }}
      </h3>

      <form @submit.prevent="handleSave" style="display: flex; flex-direction: column; gap: 12px;">
        <div style="display: flex; align-items: center;">
          <label style="width: 130px; font-weight: bold;">コート名：</label>
          <input
            type="text"
            placeholder="コート名を入力してください。"
            v-model="name"
            style="flex: 1; padding: 6px; border: 1px solid #333; border-radius: 4px;"
          />
        </div>

        <div style="display: flex; align-items: center;">
          <label style="width: 130px; font-weight: bold;">コート種別：</label>
          <select
            v-model="type"
            style="flex: 1; padding: 6px; border: 1px solid #333; border-radius: 4px;"
          >
            <option value="">選択してください</option>
            <option value="オムニ">オムニ</option>
            <option value="クレー">クレー</option>
            <option value="ハード">ハード</option>
            <option value="人工芝">人工芝</option>
          </select>
        </div>

        <div style="display: flex; align-items: center;">
          <label style="width: 130px; font-weight: bold;">屋内外区分：</label>
          <div style="display: flex; gap: 15px;">
            <label>
              <input
                type="radio"
                name="indoorOutdoor"
                :value="false"
                v-model="isIndoor"
              /> 屋外
            </label>
            <label>
              <input
                type="radio"
                name="indoorOutdoor"
                :value="true"
                v-model="isIndoor"
              /> 屋内
            </label>
          </div>
        </div>

        <div style="display: flex; align-items: center;">
          <label style="width: 130px; font-weight: bold;">利用日：</label>
          <input
            type="date"
            v-model="date"
            style="flex: 1; padding: 6px; border: 1px solid #333; border-radius: 4px;"
          />
        </div>

        <div style="display: flex; align-items: center;">
          <label style="width: 130px; font-weight: bold;">利用時間帯：</label>
          <input
            type="text"
            placeholder="例: 10:00-12:00"
            v-model="timeSlot"
            style="flex: 1; padding: 6px; border: 1px solid #333; border-radius: 4px;"
          />
        </div>

        <div style="display: flex; align-items: center;">
          <label style="width: 130px; font-weight: bold;">利用料金：</label>
          <input
            type="number"
            placeholder="例: 2000"
            v-model="price"
            style="flex: 1; padding: 6px; border: 1px solid #333; border-radius: 4px;"
          />
        </div>

        <div style="display: flex; align-items: center;">
          <label style="width: 130px; font-weight: bold;">公開ステータス：</label>
          <select
            v-model="status"
            style="flex: 1; padding: 6px; border: 1px solid #333; border-radius: 4px;"
          >
            <option value="">選択してください</option>
            <option value="公開中">公開中</option>
            <option value="非公開">非公開</option>
          </select>
        </div>

        <div style="display: flex; align-items: flex-start;">
          <label style="width: 130px; font-weight: bold; margin-top: 6px;">備考・説明：</label>
          <textarea
            rows="3"
            v-model="description"
            style="flex: 1; padding: 6px; border: 1px solid #333; border-radius: 4px;"
          />
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 15px; margin-top: 10px;">
          <button
            type="button"
            @click="handleClear"
            style="padding: 6px 20px; background-color: #6c757d; color: #fff; border: none; border-radius: 4px; cursor: pointer;"
          >
            クリア
          </button>
          <button
            type="submit"
            style="padding: 6px 24px; background-color: #00a0e9; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;"
          >
            {{ editingCourtId ? '更新' : '保存' }}
          </button>
        </div>
      </form>
    </div>

    <!-- 一覧テーブルエリア -->
    <div style="padding: 10px 0; background-color: #fff;">
      <h3 style="margin: 0 0 15px 0;">■ コート一覧</h3>
      <p v-if="loading" style="text-align: center; color: #666;">データを読み込み中...</p>
      
      <table v-else style="width: 100%; border-collapse: collapse; border: 1px solid #333; text-align: center;">
        <thead>
          <tr style="background-color: #d4edda; border-bottom: 1px solid #333;">
            <th style="border: 1px solid #333; padding: 8px;">コートID</th>
            <th style="border: 1px solid #333; padding: 8px;">コート名</th>
            <th style="border: 1px solid #333; padding: 8px;">コート種別</th>
            <th style="border: 1px solid #333; padding: 8px;">屋内外</th>
            <th style="border: 1px solid #333; padding: 8px;">利用日時</th>
            <th style="border: 1px solid #333; padding: 8px;">利用料金</th>
            <th style="border: 1px solid #333; padding: 8px;">公開ステータス</th>
            <th style="border: 1px solid #333; padding: 8px;">備考・説明</th>
            <th style="border: 1px solid #333; padding: 8px;">編集・削除</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="activeCourts.length > 0">
            <tr v-for="court in activeCourts" :key="court.id" style="border-bottom: 1px solid #333;">
              <td style="border: 1px solid #333; padding: 10px;">{{ court.id }}</td>
              <td style="border: 1px solid #333; padding: 10px;">{{ court.name }}</td>
              <td style="border: 1px solid #333; padding: 10px;">{{ court.type }}</td>
              <td style="border: 1px solid #333; padding: 10px;">{{ court.isIndoor ? '屋内' : '屋外' }}</td>
              <td style="border: 1px solid #333; padding: 10px;">{{ court.date }} {{ court.timeSlot }}</td>
              <td style="border: 1px solid #333; padding: 10px;">¥{{ court.pricePerHour?.toLocaleString() }}</td>
              <td style="border: 1px solid #333; padding: 10px;">{{ court.status === 'available' ? '公開中' : '非公開' }}</td>
              <td style="border: 1px solid #333; padding: 10px; text-align: left;">{{ court.description }}</td>
              <td style="border: 1px solid #333; padding: 10px;">
                <div style="display: flex; gap: 8px; justify-content: center;">
                  <button
                    @click="handleEdit(court)"
                    style="background-color: #00a0e9; color: #fff; border: none; border-radius: 4px; padding: 4px 12px; cursor: pointer;"
                  >
                    編集
                  </button>
                  <button
                    @click="handleDelete(court.id)"
                    style="background-color: #dc3545; color: #fff; border: none; border-radius: 4px; padding: 4px 12px; cursor: pointer;"
                  >
                    削除
                  </button>
                </div>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colSpan="9" style="padding: 20px; color: #666;">
                登録されているコートがありません。
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
import type { Court } from '../../types';

const courts = ref<Court[]>([]);
const editingCourtId = ref<string | null>(null);
const loading = ref<boolean>(true);

// フォームステート
const name = ref('');
const type = ref('');
const isIndoor = ref<boolean | null>(null);
const date = ref('');
const timeSlot = ref('');
const price = ref('');
const status = ref('');
const description = ref('');

const loadCourts = async () => {
  try {
    loading.value = true;
    const response = await fetch('http://localhost:8080/api/courts');
    if (!response.ok) throw new Error('コート一覧の取得に失敗しました');
    const data: Court[] = await response.json();
    courts.value = data;
  } catch (error) {
    console.error(error);
    alert('コート情報の取得に失敗しました。');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadCourts();
});

const handleClear = () => {
  editingCourtId.value = null;
  name.value = '';
  type.value = '';
  isIndoor.value = null;
  date.value = '';
  timeSlot.value = '';
  price.value = '';
  status.value = '';
  description.value = '';
};

const handleEdit = (court: Court) => {
  editingCourtId.value = court.id;
  name.value = court.name;
  type.value = court.type;
  isIndoor.value = court.isIndoor;
  date.value = court.date;
  timeSlot.value = court.timeSlot;
  price.value = court.pricePerHour.toString();
  status.value = court.status === 'available' ? '公開中' : '非公開';
  description.value = court.description;
};

const handleDelete = async (id: string) => {
  if (!window.confirm('このコート情報を削除しますか？')) return;

  try {
    const response = await fetch(`http://localhost:8080/api/courts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('削除に失敗しました');

    alert('削除しました');
    if (editingCourtId.value === id) handleClear();
    loadCourts();
  } catch (error) {
    console.error(error);
    alert('削除処理に失敗しました。');
  }
};

const handleSave = async () => {
  if (
    !name.value ||
    !type.value ||
    isIndoor.value === null ||
    !date.value ||
    !timeSlot.value ||
    !price.value ||
    !status.value
  ) {
    alert('必須項目をすべて入力してください。');
    return;
  }

  const courtDataPayload: Record<string, any> = {
    name: name.value,
    type: type.value,
    isIndoor: Boolean(isIndoor.value),
    date: date.value,
    timeSlot: timeSlot.value,
    pricePerHour: Number(price.value) || 0,
    description: description.value,
    status: status.value === '公開中' ? 'available' : 'maintenance',
    isDeleted: false,
  };

  if (editingCourtId.value) {
    courtDataPayload.id = editingCourtId.value;
  }

  try {
    const url = editingCourtId.value
      ? `http://localhost:8080/api/courts/${editingCourtId.value}`
      : 'http://localhost:8080/api/courts';
    const method = editingCourtId.value ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courtDataPayload),
    });

    if (!response.ok) {
      throw new Error('保存に失敗しました');
    }

    alert(editingCourtId.value ? '更新しました' : '登録しました');
    handleClear();
    loadCourts();
  } catch (error) {
    console.error(error);
    alert('保存処理に失敗しました。');
  }
};

const activeCourts = computed(() => {
  return courts.value.filter((court) => !court.isDeleted);
});
</script>