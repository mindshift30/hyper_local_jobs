'use client';

import React from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { useAuthStore } from '@/stores/auth-store';
import { Star, MapPin, Briefcase, Share2, Edit, BadgeCheck, Calendar } from 'lucide-react';

export default function ProfileScreen() {
  const { t } = useI18n();
  const { user } = useAuthStore();
  const name = user?.name || 'Jagan';
  const initials = name.charAt(0).toUpperCase();

  const skills = ['Heat Press Printing', 'Data Entry', 'Event Setup', 'Tamil & English', 'Bike License'];
  const availability = [
    { shift: 'Morning', active: false },
    { shift: 'Evening', active: true },
    { shift: 'Night', active: false },
    { shift: 'Weekend', active: true },
  ];

  return (
    <div className="page-enter" style={{ paddingBottom: 'calc(var(--bottom-nav-height) + var(--space-4))' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', padding: 'var(--space-8) var(--space-4) var(--space-12)', textAlign: 'center', color: 'white' }}>
        <div className="avatar avatar-xl" style={{ background: 'rgba(255,255,255,0.2)', margin: '0 auto var(--space-4)', border: '3px solid rgba(255,255,255,0.5)' }}>
          {initials}
        </div>
        <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800 }}>{name}</h1>
        <p style={{ opacity: 0.9, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 4 }}>
          {user?.phone || '+91 98765 43210'}
          {user?.isVerified && <BadgeCheck size={16} />}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
          <Star size={16} fill="var(--warning)" color="var(--warning)" />
          <span style={{ fontWeight: 700 }}>{user?.trustScore || 4.2}</span>
          <span style={{ opacity: 0.7, fontSize: 'var(--text-sm)' }}>{t('profile.trustScore')}</span>
        </div>
      </div>

      <div style={{ padding: 'var(--space-4)', marginTop: 'calc(-1 * var(--space-6))' }}>
        {/* Stats row */}
        <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', textAlign: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
          <div>
            <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-primary)' }}>12</p>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Applied</p>
          </div>
          <div>
            <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--success)' }}>5</p>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Hired</p>
          </div>
          <div>
            <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--primary)' }}>₹8.4k</p>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Earned</p>
          </div>
        </div>

        {/* Details */}
        <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
            <MapPin size={16} color="var(--text-secondary)" />
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{user?.area || 'Purasaiwakkam'}, Chennai</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
            <Briefcase size={16} color="var(--text-secondary)" />
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>CS Student · SRM University</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Calendar size={16} color="var(--text-secondary)" />
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Joined Nov 2025</span>
          </div>
        </div>

        {/* Skills */}
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <h2 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-3)', color: 'var(--text-primary)' }}>{t('profile.skills')}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {skills.map(skill => <span key={skill} className="chip active">{skill}</span>)}
          </div>
        </div>

        {/* Availability */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h2 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-3)', color: 'var(--text-primary)' }}>{t('profile.availability')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
            {availability.map(a => (
              <div key={a.shift} className={`chip ${a.active ? 'active' : ''}`} style={{ justifyContent: 'center' }}>
                {a.shift}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button className="btn btn-primary btn-lg" style={{ flex: 1, gap: 'var(--space-2)' }}>
            <Edit size={16} /> {t('profile.editProfile')}
          </button>
          <button className="btn btn-secondary btn-lg" style={{ gap: 'var(--space-2)' }}>
            <Share2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
