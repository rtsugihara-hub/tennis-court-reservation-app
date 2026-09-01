<!-- src/components/Login.vue -->
<template>
  <div
    style="
      width: 100%;
      flex: 1;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f8f9fa;
      box-sizing: border-box;
      padding: 20px;
    "
  >
    <div
      style="
        width: 100%;
        max-width: 600px;
        padding: 40px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        box-sizing: border-box;
      "
    >
      <h2
        style="
          text-align: center;
          margin-top: 0;
          margin-bottom: 24px;
          font-size: 24px;
          color: #333;
        "
      >
        テニスコート予約管理システム ログイン
      </h2>

      <p
        v-if="error"
        style="
          color: red;
          font-size: 14px;
          margin-bottom: 20px;
          text-align: center;
        "
      >
        {{ error }}
      </p>

      <form @submit.prevent="handleSubmit">
        <div style="margin-bottom: 20px;">
          <label
            style="
              display: block;
              margin-bottom: 8px;
              font-weight: bold;
              text-align: left;
              color: #333;
            "
          >
            メールアドレス
          </label>
          <input
            type="email"
            v-model="email"
            style="
              width: 100%;
              padding: 12px;
              font-size: 16px;
              border-radius: 4px;
              border: 1px solid #ccc;
              box-sizing: border-box;
            "
            placeholder="Eメールを入力してください。"
            required
          />
        </div>

        <div style="margin-bottom: 24px;">
          <label
            style="
              display: block;
              margin-bottom: 8px;
              font-weight: bold;
              text-align: left;
              color: #333;
            "
          >
            パスワード
          </label>
          <input
            type="password"
            v-model="password"
            style="
              width: 100%;
              padding: 12px;
              font-size: 16px;
              border-radius: 4px;
              border: 1px solid #ccc;
              box-sizing: border-box;
            "
            placeholder="パスワードを入力してください。"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          :style="{
            width: '100%',
            padding: '12px',
            backgroundColor: loading ? '#6c757d' : '#007bff',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }"
        >
          {{ loading ? 'ログイン中...' : 'ログイン' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { User } from '../types';

const emit = defineEmits<{
  (e: 'login', user: User): void;
}>();

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const handleSubmit = async () => {
  error.value = '';
  loading.value = true;

  try {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      throw new Error('ログインに失敗しました');
    }

    const user: User = await response.json();
    emit('login', user);
  } catch (err) {
    console.error(err);
    error.value = 'メールアドレスまたはパスワードが正しくありません。';
  } finally {
    loading.value = false;
  }
};
</script>