import React from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import BottomNav from './BottomNav';

export default function AppShell() {
  return (
    <div className="min-h-screen bg-surface-black flex flex-col">
      <AppHeader />
      <main className="flex-1 pt-14 pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
