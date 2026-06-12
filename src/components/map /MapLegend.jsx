import React from 'react';

const items = [
  { color: '#C0392B', label: 'Active / In Progress', pulse: true },
  { color: '#E67E22', label: 'Last 24 Hours' },
  { color: '#C9A84C', label: 'Last 7 Days' },
  { color: '#1A6B3C', label: 'Resolved' },
];

export default function MapLegend() {
  return (
    <div className="card-3d px-3 py-2.5 space-y-1.5">
      <p className="text-[10px] font-semibold text-gold/60 uppercase tracking-wider">Legend</p>
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
            {item.pulse && (
              <div className="absolute inset-0 w-2.5 h-2.5 rounded-full pulse-ring" style={{ background: item.color }} />
            )}
          </div>
          <span className="text-[10px] text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
