import React, { useRef } from 'react';
import { Camera, ImagePlus, ShieldCheck } from 'lucide-react';

export default function StepEvidence({ formData, updateForm }) {
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateForm({ photo: url });
    }
  };

  return (
    <div className="space-y-5">
      {/* Photo upload */}
      <div>
        <label className="text-xs font-semibold text-gold/60 uppercase tracking-wider mb-3 block">
          Photo Evidence
        </label>
        <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFile} />
        
        {formData.photo ? (
          <div className="relative card-3d overflow-hidden">
            <img src={formData.photo} alt="Evidence" className="w-full h-48 object-cover rounded-lg" />
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute bottom-2 right-2 px-3 py-1.5 rounded-lg glass-panel text-[11px] font-semibold text-gold flex items-center gap-1.5"
            >
              <Camera className="w-3.5 h-3.5" />
              Replace
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full h-40 card-3d flex flex-col items-center justify-center gap-3 hover:bg-surface-mid transition-colors"
          >
            <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
              <ImagePlus className="w-7 h-7 text-gold" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-white">Take or upload a photo</p>
              <p className="text-[11px] text-muted-foreground">Optional but helps verification</p>
            </div>
          </button>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="text-xs font-semibold text-gold/60 uppercase tracking-wider mb-2 block">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => updateForm({ description: e.target.value })}
          placeholder="Describe what you see — this helps authorities respond faster..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-surface-mid border border-gold/10 text-white text-sm placeholder-muted-foreground focus:border-gold/30 focus:outline-none resize-none transition-colors"
        />
      </div>

      {/* Safety check */}
      <label className="card-3d p-3.5 flex items-center gap-3 cursor-pointer">
        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
          formData.is_safe ? 'bg-gpg-green border-gpg-green' : 'border-gold/30'
        }`}>
          {formData.is_safe && <ShieldCheck className="w-3.5 h-3.5 text-white" />}
        </div>
        <input
          type="checkbox"
          checked={formData.is_safe}
          onChange={(e) => updateForm({ is_safe: e.target.checked })}
          className="hidden"
        />
        <div>
          <p className="text-sm font-semibold text-white">I am in a safe location</p>
          <p className="text-[11px] text-muted-foreground">
            Uncheck if you feel unsafe — we'll prioritize your report
          </p>
        </div>
      </label>
    </div>
  );
}
