import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Users, ThumbsUp, MessageSquare, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { INFRA_LABELS, STATUS_COLORS } from '@/lib/dummyData';
import { format, formatDistanceToNow } from 'date-fns';

export default function FeedCard({ incident, index }) {
  const [confirmed, setConfirmed] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const statusInfo = STATUS_COLORS[incident.status] || STATUS_COLORS.recent;
  const confirmCount = incident.confirmations + (confirmed ? 1 : 0);

  const handleComment = () => {
    if (!comment.trim()) return;
    setComments(prev => [...prev, { text: comment, time: new Date().toISOString() }]);
    setComment('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      className="card-3d overflow-hidden"
    >
      {/* Left gold accent border */}
      <div className="flex">
        <div className="w-1 flex-shrink-0" style={{ background: statusInfo.bg }} />
        <div className="flex-1 p-3.5">
          {/* Status & time */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: statusInfo.bg }} />
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: statusInfo.bg }}>
                {statusInfo.label}
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground mono-num">
              {formatDistanceToNow(new Date(incident.reported_at), { addSuffix: true })}
            </span>
          </div>

          {/* Title */}
          <h4 className="text-sm font-bold text-white mb-1">
            {incident.title || incident.area_name}
          </h4>

          {/* Meta */}
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <MapPin className="w-3 h-3 text-gold/50" />
              {incident.area_name}
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-gold/10 text-gold border border-gold/15">
              {INFRA_LABELS[incident.infrastructure_type]}
            </span>
          </div>

          {/* Description excerpt */}
          {incident.description && (
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
              {incident.description}
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2 border-t border-gold/5">
            <button
              onClick={() => setConfirmed(!confirmed)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                confirmed ? 'bg-gpg-green/15 text-gpg-green border border-gpg-green/20' :
                'bg-surface-mid text-muted-foreground hover:text-gold hover:bg-gold/5 border border-transparent'
              }`}
              style={confirmed ? { color: '#1A6B3C' } : {}}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              {confirmed ? 'Confirmed' : 'Confirm'} · {confirmCount}
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex-1 py-2 rounded-lg text-xs font-semibold text-muted-foreground flex items-center justify-center gap-1.5 bg-surface-mid hover:text-gold hover:bg-gold/5 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Comment
              {showComments ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          {/* Comments section */}
          {showComments && (
            <div className="mt-3 pt-3 border-t border-gold/5 space-y-2">
              {comments.map((c, i) => (
                <div key={i} className="bg-surface-mid rounded-lg p-2.5">
                  <p className="text-xs text-white">{c.text}</p>
                  <p className="text-[9px] text-muted-foreground mt-1 mono-num">
                    {formatDistanceToNow(new Date(c.time), { addSuffix: true })}
                  </p>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleComment()}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 rounded-lg bg-surface-mid border border-gold/10 text-xs text-white placeholder-muted-foreground focus:border-gold/25 focus:outline-none"
                />
                <button
                  onClick={handleComment}
                  disabled={!comment.trim()}
                  className="px-3 py-2 rounded-lg bg-gold/10 text-gold disabled:opacity-30 transition-opacity"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
