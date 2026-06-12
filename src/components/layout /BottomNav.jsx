import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map, BarChart3, Eye, MessageSquare, Zap, ShieldAlert } from 'lucide-react';

const tabs = [
  { path: '/', icon: Map, label: 'Map' },
  { path: '/intelligence', icon: BarChart3, label: 'Intel' },
  { path: '/report', icon: null, label: 'Report' },
  { path: '/wards', icon: Eye, label: 'Wards' },
  { path: '/feed', icon: MessageSquare, label: 'Feed' },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-bottom" style={{ background: '#12131A', borderTop: '1px solid rgba(201,168,76,0.2)' }}>
      <div className="flex items-end justify-around px-2 pt-1 pb-2 max-w-lg mx-auto relative">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          
          // FAB in center
          if (tab.path === '/report') {
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className="flex flex-col items-center -mt-6 relative"
              >
                <div className="w-14 h-14 rounded-full btn-gold fab-glow flex items-center justify-center relative">
                  <Zap className="w-6 h-6 text-surface-black" fill="#0A0A0F" />
                  <ShieldAlert className="w-3.5 h-3.5 text-surface-black absolute -bottom-0.5 -right-0.5" />
                </div>
                <span className="text-[10px] mt-1 font-semibold text-gold">REPORT</span>
              </Link>
            );
          }

          const Icon = tab.icon;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className="flex flex-col items-center py-1 px-3 relative group"
            >
              <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-gold' : 'text-muted-foreground'}`} />
              <span className={`text-[10px] mt-0.5 font-medium transition-colors ${isActive ? 'text-gold' : 'text-muted-foreground'}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-2 w-6 h-0.5 bg-gold rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
