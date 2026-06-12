import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin } from 'lucide-react';

export default function ReportSuccess({ onDone }) {
  return (
    <div className="min-h-full flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="text-center max-w-sm mx-auto"
      >
        {/* Ripple */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full bg-gold/20"
          />
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
            className="absolute inset-0 rounded-full bg-gold/15"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold to-gold-deep flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-10 h-10 text-surface-black" />
          </div>
        </div>

        <h2 className="font-heading font-extrabold text-2xl text-white mb-2">
          Report Submitted
        </h2>
        <p className="text-sm text-muted-foreground mb-2">
          Your community thanks you. Your report is now live on the threat map.
        </p>
        <p className="mono-num text-[11px] text-gold/50 mb-8">
          Ref: CW-2025-{String(Math.floor(Math.random() * 9000 + 1000))}
        </p>

        <button
          onClick={onDone}
          className="btn-gold w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2"
        >
          <MapPin className="w-5 h-5" />
          View on Map
        </button>
      </motion.div>
    </div>
  );
}
