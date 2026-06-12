import React from 'react';
import { Shield } from 'lucide-react';

export default function AppFooter() {
  return (
    <footer className="px-4 py-6 border-t border-gold/10 bg-surface-dark">
      <div className="max-w-lg mx-auto text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Shield className="w-4 h-4 text-gold/50" />
          <span className="text-xs text-muted-foreground font-medium tracking-wide">
            Gauteng Provincial Government
          </span>
        </div>
        <p className="text-[11px] text-gold/40 italic font-medium">
          Kuyasheshwa: Gauteng Working Better
        </p>
        <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground">
          <span>Privacy Policy</span>
          <span className="text-gold/20">·</span>
          <span>Terms of Service</span>
        </div>
        <p className="text-[10px] text-muted-foreground/60">
          © 2025 Gauteng Provincial Government. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
