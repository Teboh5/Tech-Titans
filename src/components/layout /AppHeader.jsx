import React from 'react';
import { Shield } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel gold-border-bottom safe-top">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {/* GPG Shield Icon */}
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold to-gold-deep flex items-center justify-center shadow-lg">
            <Shield className="w-5 h-5 text-surface-black" />
          </div>
          <div>
            <h1 className="font-heading text-base font-extrabold tracking-wide text-white leading-tight">
              CableWatch
            </h1>
            <p className="text-[10px] text-muted-foreground leading-tight tracking-wide">
              A G13 Initiative · Gauteng Provincial Government
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gpg-green animate-pulse" />
          <span className="text-[10px] mono-num text-gpg-green font-medium">LIVE</span>
        </div>
      </div>
    </header>
 
