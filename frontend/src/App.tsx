// src/App.tsx
import React, { useState } from 'react';
import type { Court, User, Reservation } from './types';
import { Login } from './pages/Login';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { CourtList } from './pages/CourtList';
import { CourtDetail } from './pages/CourtDetail';
import { ReservationConfirm } from './pages/ReservationConfirm';
import { ReservationComplete } from './pages/ReservationComplete';
import { MyPage } from './pages/MyPage';
import { ReservationDetail } from './pages/ReservationDetail';
import { AdminCourtList } from './pages/admin/AdminCourtList';
import { AdminReservationList } from './pages/admin/AdminReservationList';

export const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  
  // サイドメニュー開閉フラグ
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [subStep, setSubStep] = useState<'list' | 'detail' | 'confirm' | 'complete'>('list');

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setCurrentTab('admin-courts');
    } else {
      setCurrentTab('dashboard');
    }
    setIsSidebarOpen(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedCourt(null);
    setSelectedReservation(null);
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleSelectTab = (tab: string) => {
    setCurrentTab(tab);
    setSubStep('list');
    setSelectedCourt(null);
    setSelectedReservation(null);
    setIsSidebarOpen(false);
  };

  const handleSelectCourt = (court: Court) => {
    setSelectedCourt(court);
    setSubStep('detail');
  };

  // マイページの予約一覧から予約詳細へ遷移
  const handleSelectReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
  };

  // 予約キャンセル実行時のステータス更新
  const handleCancelReservation = (reservationId: string) => {
    if (selectedReservation && selectedReservation.id === reservationId) {
      setSelectedReservation({ ...selectedReservation, status: 'cancelled' });
    }
  };

  // 予約確定API完了後のステート移行処理
  const handleConfirmReservation = () => {
    setSubStep('complete');
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header
        currentUser={currentUser}
        onLogout={handleLogout}
        onToggleSidebar={handleToggleSidebar}
      />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar
          currentUser={currentUser}
          currentTab={currentTab}
          onSelectTab={handleSelectTab}
          isOpen={isSidebarOpen}
        />
        <main style={{ flex: 1, backgroundColor: '#fff' }}>
          {currentTab === 'dashboard' && <Dashboard currentUser={currentUser} />}

          {currentTab === 'courts' && (
            <>
              {subStep === 'list' && <CourtList onSelectCourt={handleSelectCourt} />}
              {subStep === 'detail' && selectedCourt && (
                <CourtDetail
                  court={selectedCourt}
                  onBack={() => setSubStep('list')}
                  onGoToConfirm={() => setSubStep('confirm')}
                />
              )}
              {subStep === 'confirm' && selectedCourt && (
                <ReservationConfirm
                  court={selectedCourt}
                  currentUser={currentUser}
                  onBack={() => setSubStep('detail')}
                  onConfirm={handleConfirmReservation}
                />
              )}
              {subStep === 'complete' && (
                <ReservationComplete
                  onGoToDashboard={() => {
                    setCurrentTab('dashboard');
                    setSubStep('list');
                    setSelectedCourt(null);
                  }}
                  onGoToMyPage={() => {
                    setCurrentTab('mypage');
                    setSubStep('list');
                    setSelectedCourt(null);
                  }}
                />
              )}
            </>
          )}

          {currentTab === 'mypage' && (
            <>
              {selectedReservation ? (
                <ReservationDetail
                  reservation={selectedReservation}
                  currentUser={currentUser}
                  onBackToMyPage={() => setSelectedReservation(null)}
                  onCancelReservation={handleCancelReservation}
                />
              ) : (
                <MyPage
                  currentUser={currentUser}
                  onSelectReservation={handleSelectReservation}
                />
              )}
            </>
          )}

          {currentTab === 'admin-reservations' && <AdminReservationList />}
          {currentTab === 'admin-courts' && <AdminCourtList />}
        </main>
      </div>
    </div>
  );
};

export default App;