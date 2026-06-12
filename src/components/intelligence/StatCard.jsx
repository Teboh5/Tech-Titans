import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ label, value, icon: Icon, trend, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.08, duration: 0.3 }}
      className="card-3d p-4 relative overflow-hidden"
    >
      {/* Gold top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="flex items-start justify-between mb-2">
        <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/15 flex items-center justify-center">
          <Icon className="w-4.5 h-4.5 text-gold" />
        </div>
        {trend && (
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
            trend > 0 ? 'bg-gpg-red/10 text-gpg-red' : 'bg-gpg-green/10 text-gpg-green'
          }`} style={{ color: trend > 0 ? '#C0392B' : '#1A6B3C' }}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="mono-num text-2xl font-bold text-white leading-none mb-1">{value}</p>
      <p className="text-[11px] text-muted-foreground font-medium">{label}</p>
    </motion.div>
  );
}
