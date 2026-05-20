'use client';

import React, { useState, useEffect } from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { DEMO_JOBS, formatPay } from '@/lib/demo-data';
import { MapPin, Search, SlidersHorizontal, ArrowLeft, Navigation, Star, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { Screen } from '@/app/app/page';

// Fix default marker icon
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Props {
  navigate: (s: Screen, jobId?: string) => void;
}

const CHENNAI_CENTER: [number, number] = [13.06, 80.24];

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function MapViewScreen({ navigate }: Props) {
  const { t } = useI18n();
  const [selectedJob, setSelectedJob] = useState<typeof DEMO_JOBS[0] | null>(null);

  return (
    <div className="page-enter" style={{ height: '100vh', position: 'relative', overflow: 'hidden', background: '#F1F5F9' }}>
      {/* Search Header */}
      <div style={{ position: 'absolute', top: 'var(--space-4)', left: 'var(--space-4)', right: 'var(--space-4)', zIndex: 1000, display: 'flex', gap: 'var(--space-2)' }}>
        <button className="btn btn-icon btn-white" style={{ background: 'white', border: 'none', boxShadow: 'var(--shadow-md)' }} onClick={() => navigate('seeker-search')}>
          <ArrowLeft size={20} />
        </button>
        <div className="search-bar" style={{ flex: 1, background: 'white', border: 'none', boxShadow: 'var(--shadow-md)', marginBottom: 0 }}>
          <Search size={18} color="var(--text-tertiary)" />
          <input type="text" placeholder="Search near your location..." id="map-search" />
          <SlidersHorizontal size={18} color="var(--text-tertiary)" />
        </div>
      </div>

      {/* Real Map Background */}
      <MapContainer
        center={CHENNAI_CENTER}
        zoom={13}
        style={{ height: "100%", width: "100%", zIndex: 1 }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {DEMO_JOBS.map(job => (
          <Marker 
            key={job.id} 
            position={[job.lat, job.lng]}
            eventHandlers={{
              click: () => {
                setSelectedJob(job);
              },
            }}
          >
            <Popup offset={[0, -20]}>
              <div style={{ padding: 4 }}>
                <strong>{job.title}</strong><br/>
                <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{formatPay(job.pay, job.payType)}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating Action Buttons */}
      <div style={{ position: 'absolute', bottom: selectedJob ? 320 : 'var(--space-4)', right: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', zIndex: 10, transition: 'bottom 0.3s' }}>
        <button className="btn btn-icon btn-white" style={{ background: 'white', borderRadius: 'var(--radius-full)', boxShadow: 'var(--shadow-lg)' }} onClick={() => {}}>
          <Navigation size={20} color="var(--primary)" />
        </button>
      </div>

      {/* Job Preview Card (Bottom Sheet style) */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ translateY: '100%' }}
            animate={{ translateY: 0 }}
            exit={{ translateY: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            style={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              right: 0, 
              background: 'white', 
              borderTopLeftRadius: 'var(--radius-3xl)', 
              borderTopRightRadius: 'var(--radius-3xl)', 
              boxShadow: '0 -10px 40px rgba(0,0,0,0.1)',
              padding: 'var(--space-6) var(--space-4) var(--space-8)',
              zIndex: 1001
            }}
          >
            <div style={{ width: 40, height: 4, background: 'var(--border-light)', borderRadius: 'var(--radius-full)', margin: '0 auto var(--space-6)' }} onClick={() => setSelectedJob(null)} />
            
            <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
              <div style={{ width: 64, height: 64, background: 'var(--bg-secondary)', borderRadius: 'var(--radius-2xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>
                {selectedJob.companyLogo}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--text-primary)' }}>{selectedJob.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Star size={14} fill="var(--warning)" color="var(--warning)" />
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700 }}>{selectedJob.rating}</span>
                  </div>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{selectedJob.company} · {selectedJob.area}</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-2)', marginBottom: 'var(--space-8)' }}>
              <div style={{ background: 'var(--bg-secondary)', padding: 'var(--space-3)', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
                <p style={{ fontSize: 10, color: 'var(--text-tertiary)', marginBottom: 2 }}>PAY</p>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-primary)' }}>{formatPay(selectedJob.pay, selectedJob.payType)}</p>
              </div>
              <div style={{ background: 'var(--bg-secondary)', padding: 'var(--space-3)', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
                <p style={{ fontSize: 10, color: 'var(--text-tertiary)', marginBottom: 2 }}>DISTANCE</p>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-primary)' }}>{selectedJob.distance} km</p>
              </div>
              <div style={{ background: 'var(--bg-secondary)', padding: 'var(--space-3)', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
                <p style={{ fontSize: 10, color: 'var(--text-tertiary)', marginBottom: 2 }}>SHIFT</p>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-primary)' }}>{selectedJob.shift}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <button className="btn btn-secondary btn-lg" style={{ flex: 1 }} onClick={() => navigate('seeker-job-detail', selectedJob.id)}>Details</button>
              <button className="btn btn-primary btn-lg" style={{ flex: 2 }} onClick={() => navigate('seeker-apply', selectedJob.id)}>Apply Now</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
