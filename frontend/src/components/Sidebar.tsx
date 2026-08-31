// src/components/Sidebar.tsx
import React from 'react';
import type { User } from '../types';

interface SidebarProps {
  currentUser: User;
  currentTab: string;
  onSelectTab: (tab: string) => void;
  isOpen?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentUser,
  currentTab,
  onSelectTab,
  isOpen = true,
}) => {
  if (!isOpen) return null;

  const isAdmin = currentUser.role === 'admin';

  // E04 画面遷移ボタン押下処理（タブ選択 ＆ 自動クローズ）
  const handleTabClick = (tab: string) => {
    onSelectTab(tab);
  };

  const getButtonStyle = (tabName: string) => ({
    display: 'block',
    width: '100%',
    padding: '12px 16px',
    textAlign: 'left' as const,
    backgroundColor: currentTab === tabName ? '#007bff' : 'transparent',
    color: currentTab === tabName ? '#fff' : '#333',
    border: 'none',
    borderBottom: '1px solid #e0e0e0',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: currentTab === tabName ? 'bold' : 'normal',
  });

  return (
    <aside
      style={{
        width: '220px',
        backgroundColor: '#f4f4f4',
        borderRight: '1px solid #ddd',
        minHeight: 'calc(100vh - 50px)',
      }}
    >
      <div style={{ padding: '10px 16px', fontWeight: 'bold', borderBottom: '1px solid #ddd', color: '#666', fontSize: '12px' }}>
        {isAdmin ? '管理メニュー' : 'メインメニュー'}
      </div>

      <nav>
        {/* E04: 一般ユーザー (role: "user") の表示制御 */}
        {!isAdmin && (
          <>
            <button style={getButtonStyle('dashboard')} onClick={() => handleTabClick('dashboard')}>
              ダッシュボード
            </button>
            <button style={getButtonStyle('courts')} onClick={() => handleTabClick('courts')}>
              コート一覧・予約
            </button>
            <button style={getButtonStyle('mypage')} onClick={() => handleTabClick('mypage')}>
              マイページ
            </button>
          </>
        )}

        {/* E04: 管理者 (role: "admin") の表示制御（ダッシュボード非表示） */}
        {isAdmin && (
          <>
            <button style={getButtonStyle('admin-courts')} onClick={() => handleTabClick('admin-courts')}>
              コート登録・編集
            </button>
            <button style={getButtonStyle('admin-reservations')} onClick={() => handleTabClick('admin-reservations')}>
              予約一覧・受付管理
            </button>
          </>
        )}
      </nav>
    </aside>
  );
};