import React from 'react';
import { INFRA_ICONS, STATUS_COLORS } from '@/lib/dummyData';

export default function IncidentPin({ incident, onClick }) {
  const statusColor = STATUS_COLORS[incident.status] || STATUS_COLORS.recent;
  const isActive = incident.status === 'active';

  return (
    <button
      onClick={() => onClick(incident)}
      className="relative flex items-center justify-center"
      style={{ width: 40, height: 40 }}
    >
      {/* Pulse ring for active */}
      {isActive && (
        <div
          className="absolute inset-0 rounded-full pulse-ring"
          style={{ background: statusColor.bg, opacity: 0.4 }}
        />
      )}
      {/* Pin body */}
      <div
        className="relative w-9 h-9 rounded-full flex items-center justify-center text-sm border-2 shadow-lg"
        style={{
          background: `${statusColor.bg}22`,
          borderColor: statusColor.bg,
          boxShadow: `0 0 12px ${statusColor.bg}40, 0 4px 8px rgba(0,0,0,0.4)`,
        }}
      >
        <span className="text-base">{INFRA_ICONS[incident.infrastructure_type]}</span>
      </div>
      {/* Confirmations badge */}
      {incident.confirmations > 0 && (
        <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-gold text-surface-black text-[10px] font-bold flex items-center justify-center px-1 mono-num">
          {incident.confirmations}
        </div>
      )}
    </button>
  );
}
