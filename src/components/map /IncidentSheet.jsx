import React from 'react';
import { X, Clock, MapPin, Users, Send } from 'lucide-react';
import { INFRA_LABELS, STATUS_COLORS } from '@/lib/dummyData';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export default function IncidentSheet({ incident, onClose }) {
  if (!incident) return null;

  const statusInfo = STATUS_COLORS[incident.status] || STATUS_COLORS.recent;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[1000] slide-up" style={{ paddingBottom: 72 }}>
      <div className="glass-panel rounded-t-2xl max-w-lg mx-auto overflow-hidden">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gold/30" />
        </div>

        <div className="px-4 pb-4 space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: statusInfo.bg }}
                />
                <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: statusInfo.bg }}>
                  {statusInfo.label}
                </span>
              </div>
              <h3 className="font-heading font-extrabold text-base text-white leading-tight truncate">
                {incident.title || incident.area_name}
              </h3>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gold/60" />
              <span>{incident.area_name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gold/60" />
              <span className="mono-num">{format(new Date(incident.reported_at), 'dd MMM · HH:mm')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-gold/60" />
              <span>{incident.confirmations} confirmed</span>
            </div>
          </div>

          {/* Type badge & severity */}
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-gold/10 text-gold border border-gold/20">
              {INFRA_LABELS[incident.infrastructure_type]}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-muted-foreground">Severity</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 10 }, (_, i) => (
                  <div
                    key={i}
                    className="w-2 h-3 rounded-sm"
                    style={{
                      background: i < incident.severity_score
                        ? i < 4 ? '#1A6B3C' : i < 7 ? '#E67E22' : '#C0392B'
                        : 'rgba(139,143,168,0.2)',
                    }}
                  />
                ))}
              </div>
              <span className="mono-num text-[11px] font-bold text-white">{incident.severity_score}/10</span>
            </div>
          </div>

          {/* Description */}
          {incident.description && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {incident.description}
            </p>
          )}

          {/* Coordinates */}
          <div className="mono-num text-[10px] text-muted-foreground/60">
            {Math.abs(incident.latitude).toFixed(4)}°S, {Math.abs(incident.longitude).toFixed(4)}°E · Ref: {incident.case_reference}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button className="flex-1 btn-gold rounded-xl py-2.5 text-sm font-bold flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              Send to Authorities
            </button>
            <Link
              to="/feed"
              className="px-4 py-2.5 rounded-xl border border-gold/20 text-gold text-sm font-semibold flex items-center gap-1.5 hover:bg-gold/5 transition-colors"
            >
              <Users className="w-4 h-4" />
              Confirm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
