import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Crosshair, Loader2 } from 'lucide-react';

const pinIcon = L.divIcon({
  html: `<div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#C9A84C,#8B6914);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(201,168,76,0.4),0 0 20px rgba(201,168,76,0.2);border:2px solid rgba(255,255,255,0.3);">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A0A0F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
  </div>`,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

function LocationPicker({ position, onPositionChange }) {
  useMapEvents({
    click: (e) => {
      onPositionChange([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? <Marker position={position} icon={pinIcon} /> : null;
}

export default function StepLocation({ formData, updateForm }) {
  const [detecting, setDetecting] = useState(false);
  const position = formData.latitude && formData.longitude
    ? [formData.latitude, formData.longitude]
    : null;

  const detectLocation = () => {
    setDetecting(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          updateForm({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            address: `${pos.coords.latitude.toFixed(4)}°S, ${pos.coords.longitude.toFixed(4)}°E`,
          });
          setDetecting(false);
        },
        () => {
          // Fallback to Sebokeng
          updateForm({ latitude: -26.5649, longitude: 27.8271, address: 'Sebokeng, Gauteng' });
          setDetecting(false);
        },
        { timeout: 10000 }
      );
    } else {
      updateForm({ latitude: -26.5649, longitude: 27.8271, address: 'Sebokeng, Gauteng' });
      setDetecting(false);
    }
  };

  const handlePositionChange = (pos) => {
    updateForm({
      latitude: pos[0],
      longitude: pos[1],
      address: `${Math.abs(pos[0]).toFixed(4)}°S, ${Math.abs(pos[1]).toFixed(4)}°E`,
    });
  };

  return (
    <div className="space-y-4">
      {/* Auto-detect */}
      <button
        onClick={detectLocation}
        disabled={detecting}
        className="w-full btn-gold rounded-xl py-3 font-bold flex items-center justify-center gap-2"
      >
        {detecting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Crosshair className="w-5 h-5" />}
        {detecting ? 'Detecting...' : 'Use My Current Location'}
      </button>

      {/* Mini map */}
      <div className="card-3d overflow-hidden" style={{ height: 240 }}>
        <MapContainer
          center={position || [-26.2, 28.0]}
          zoom={position ? 14 : 9}
          className="w-full h-full"
          zoomControl={false}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          <LocationPicker position={position} onPositionChange={handlePositionChange} />
        </MapContainer>
      </div>

      <p className="text-[11px] text-muted-foreground text-center">
        Tap the map to set location, or use GPS detection above
      </p>

      {/* Address */}
      <div>
        <label className="text-xs font-semibold text-gold/60 uppercase tracking-wider mb-2 block">
          Address / Area Name
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => updateForm({ address: e.target.value })}
          placeholder="e.g. Zone 11, Sebokeng"
          className="w-full px-4 py-3 rounded-xl bg-surface-mid border border-gold/10 text-white text-sm placeholder-muted-foreground focus:border-gold/30 focus:outline-none transition-colors"
        />
      </div>

      {/* Coords display */}
      {position && (
        <div className="mono-num text-[11px] text-gold/50 text-center">
          {Math.abs(position[0]).toFixed(6)}°S, {Math.abs(position[1]).toFixed(6)}°E
        </div>
      )}
    </div>
  );
}
