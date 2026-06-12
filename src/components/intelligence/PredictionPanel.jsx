import React from 'react';
import { motion } from 'framer-motion';
import { Brain, AlertTriangle } from 'lucide-react';
import { PREDICTIONS } from '@/lib/dummyData';

export default function PredictionPanel() {
  return (
    <div className="card-3d overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gold/10 flex items-center gap-2">
        <Brain className="w-4 h-4 text-gold" />
        <h3 className="text-sm font-bold text-white">Next 48 Hours — At Risk Zones</h3>
      </div>
      <div className="p-4 space-y-3">
        {PREDICTIONS.map((pred, i) => (
          <motion.div
            key={pred.area}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="flex items-start gap-3"
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{
              background: `rgba(192,57,43,${0.1 + (pred.confidence / 300)})`,
              border: '1px solid rgba(192,57,43,0.2)'
            }}>
              <AlertTriangle className="w-3.5 h-3.5" style={{ color: '#C0392B' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">{pred.area}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{pred.reason}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-surface-mid overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pred.confidence}%`,
                      background: `linear-gradient(90deg, #1A6B3C, #E67E22, #C0392B)`,
                    }}
                  />
                </div>
                <span className="mono-num text-[11px] font-bold text-gold">{pred.confidence}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
