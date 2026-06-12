import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Lightbulb, TrafficCone, Zap, TowerControl, Radio } from 'lucide-react';
import { HOTSPOT_CORRIDORS } from '@/lib/dummyData';

const RISK_COLORS = {
  CRITICAL: { bg: 'bg-gpg-red/10', text: 'text-gpg-red', border: 'border-gpg-red/20', color: '#C0392B' },
  HIGH: { bg: 'bg-gpg-amber/10', border: 'border-gpg-amber/20', color: '#E67E22' },
  MODERATE: { bg: 'bg-gold/10', border: 'border-gold/20', color: '#C9A84C' },
};

const TREND_ICONS = {
  rising: TrendingUp,
  falling: TrendingDown,
  stable: Minus,
};

const TYPE_ICONS = {
  streetlight: Lightbulb,
  traffic_light: TrafficCone,
  substation: Zap,
  eskom_pylon: TowerControl,
  telecom_cable: Radio,
};

export default function HotspotList() {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold text-gold/60 uppercase tracking-wider mb-3">
        Top 5 Hotspot Corridors
      </h3>
      {HOTSPOT_CORRIDORS.map((spot, i) => {
        const risk = RISK_COLORS[spot.risk] || RISK_COLORS.MODERATE;
        const TrendIcon = TREND_ICONS[spot.trend] || Minus;
        return (
          <motion.div
            key={spot.zone}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            className="card-3d p-3.5"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{spot.zone}</p>
                <p className="text-[10px] text-muted-foreground">Ward {spot.ward}</p>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${risk.bg} ${risk.border} border`}
                style={{ color: risk.color }}
              >
                {spot.risk}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {spot.types.map((t) => {
                  const TypeIcon = TYPE_ICONS[t];
                  return TypeIcon ? (
                    <div key={t} className="w-6 h-6 rounded bg-surface-mid flex items-center justify-center">
                      <TypeIcon className="w-3.5 h-3.5 text-gold/60" />
                    </div>
                  ) : null;
                })}
              </div>
              <div className="flex items-center gap-2">
                <span className="mono-num text-xs font-bold text-white">{spot.incidents}</span>
                <TrendIcon className="w-3.5 h-3.5" style={{
                  color: spot.trend === 'rising' ? '#C0392B' : spot.trend === 'falling' ? '#1A6B3C' : '#C9A84C'
                }} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
