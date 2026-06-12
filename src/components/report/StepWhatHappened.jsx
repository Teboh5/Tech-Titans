import React from 'react';
import { Lightbulb, TrafficCone, Zap, TowerControl, Radio, Wrench, AlertTriangle, Eye, Clock } from 'lucide-react';

const INFRA_TYPES = [
  { value: 'streetlight', label: 'Streetlight', icon: Lightbulb, emoji: '🔦' },
  { value: 'traffic_light', label: 'Traffic Light', icon: TrafficCone, emoji: '🚦' },
  { value: 'substation', label: 'Substation', icon: Zap, emoji: '⚡' },
  { value: 'eskom_pylon', label: 'Eskom Pylon', icon: TowerControl, emoji: '🗼' },
  { value: 'telecom_cable', label: 'Telecom Cable', icon: Radio, emoji: '📡' },
  { value: 'other', label: 'Other', icon: Wrench, emoji: '🔧' },
];

const URGENCY_LEVELS = [
  { value: 'active_theft', label: 'Active Theft in Progress', icon: AlertTriangle, color: '#C0392B', desc: 'Happening right now' },
  { value: 'fresh_damage', label: 'Fresh Damage Noticed', icon: Eye, color: '#E67E22', desc: 'Just discovered' },
  { value: 'existing_damage', label: 'Existing Unrepaired', icon: Clock, color: '#C9A84C', desc: 'Ongoing issue' },
];

export default function StepWhatHappened({ formData, updateForm }) {
  return (
    <div className="space-y-6">
      {/* Infrastructure type */}
      <div>
        <label className="text-xs font-semibold text-gold/60 uppercase tracking-wider mb-3 block">
          Infrastructure Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          {INFRA_TYPES.map((type) => {
            const selected = formData.infrastructure_type === type.value;
            return (
              <button
                key={type.value}
                onClick={() => updateForm({ infrastructure_type: type.value })}
                className={`card-3d p-3.5 flex flex-col items-center gap-2 transition-all ${
                  selected ? 'border-gold/40 bg-gold/5' : 'hover:bg-surface-mid'
                }`}
              >
                <span className="text-2xl">{type.emoji}</span>
                <span className={`text-xs font-semibold ${selected ? 'text-gold' : 'text-muted-foreground'}`}>
                  {type.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Urgency */}
      <div>
        <label className="text-xs font-semibold text-gold/60 uppercase tracking-wider mb-3 block">
          Urgency Level
        </label>
        <div className="space-y-2">
          {URGENCY_LEVELS.map((level) => {
            const selected = formData.urgency === level.value;
            const Icon = level.icon;
            return (
              <button
                key={level.value}
                onClick={() => updateForm({ urgency: level.value })}
                className={`card-3d w-full p-3.5 flex items-center gap-3 transition-all ${
                  selected ? 'border-gold/40 bg-gold/5' : 'hover:bg-surface-mid'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${level.color}15`, border: `1px solid ${level.color}30` }}
                >
                  <Icon className="w-5 h-5" style={{ color: level.color }} />
                </div>
                <div className="text-left">
                  <p className={`text-sm font-semibold ${selected ? 'text-gold' : 'text-white'}`}>
                    {level.label}
                  </p>
                  <p className="text-[11px] text-muted-foreground">{level.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
