// src/components/Header.tsx
import React from 'react';
import type { User } from '../types';

interface HeaderProps {
  currentUser: User;
  onLogout: () => void;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentUser, onLogout, onToggleSidebar }) => {
  // E03 ログアウトボタン押下処理
  const handleLogoutClick = () => {
    if (window.confirm('ログアウトしますか？')) {
      onLogout();
    }
  };

  return (
    <header
      style={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {/* 白枠とテキストを削除し、ハンバーガーアイコンのみにシンプル化 */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            aria-label="メニューを開閉"
            style={{
              backgroundColor: 'transparent',
              color: '#fff',
              border: 'none',
              padding: '4px',
              fontSize: '22px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              lineHeight: 1,
            }}
          >
            ☰
          </button>
        )}
        {/* 文字色を明確に白 (#fff) に指定 */}
        <h1 style={{ margin: 0, fontSize: '18px', color: '#fff' }}>
          テニスコート予約システム
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ color: '#fff' }}>
          {currentUser.name} 様 ({currentUser.role === 'admin' ? '管理者' : '一般ユーザー'})
        </span>
        <button
          onClick={handleLogoutClick}
          style={{
            backgroundColor: '#6c757d',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '6px 12px',
            cursor: 'pointer',
          }}
        >
          ログアウト
        </button>
      </div>
    </header>
  );
};