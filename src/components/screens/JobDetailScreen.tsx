'use client';

import React from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { DEMO_JOBS, formatPay } from '@/lib/demo-data';
import { ArrowLeft, Heart, MapPin, Clock, BadgeCheck, Star, Zap, Share2, MessageCircle, Users } from 'lucide-react';
import { useJobsStore } from '@/stores/jobs-store';
import { useUIStore } from '@/stores/ui-store';
import dynamic from 'next/dynamic';

const JobLocationMap = dynamic(() => import('@/components/maps/JobLocationMap'), {
  ssr: false,
  loading: () => (
    <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)' }}>
      <span className="btn-spinner" style={{ width: 30, height: 30, borderTopColor: 'var(--primary)' }} />
    </div>
  )
});
import type { Screen } from '@/app/app/page';

interface Props {
  jobId: string;
  navigate: (s: Screen, jobId?: string) => void;
}

export default function JobDetailScreen({ jobId, navigate }: Props) {
  const { t } = useI18n();
  const { savedJobs, toggleSaved } = useJobsStore();
  const { showToast } = useUIStore();
  const job = DEMO_JOBS.find(j => j.id === jobId) || DEMO_JOBS[0];
  const isSaved = savedJobs.includes(job.id);
  const moreJobs = DEMO_JOBS.filter(j => j.employerId === job.employerId && j.id !== job.id);

  const handleShareLocation = () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${job.lat},${job.lng}`;
    if (navigator.share) {
      navigator.share({
        title: `${job.title} - Job Location`,
        text: `Here is the work location for "${job.title}" at ${job.area}:`,
        url: mapsUrl,
      }).catch(() => {
        navigator.clipboard.writeText(mapsUrl);
        showToast('Location link copied!', 'success');
      });
    } else {
      navigator.clipboard.writeText(mapsUrl);
      showToast('Location link copied!', 'success');
    }
  };

  return (
    <div className="page-enter" style={{ paddingBottom: 100 }}>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)`,
        padding: 'var(--space-4) var(--space-4) var(--space-8)',
        color: 'white',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}>
          <button className="btn btn-icon" onClick={() => navigate('seeker-home')}
            style={{ color: 'white', background: 'rgba(255,255,255,0.15)' }} aria-label="Go back">
            <ArrowLeft size={20} />
          </button>
          <button className="btn btn-icon" onClick={() => toggleSaved(job.id)}
            style={{ color: 'white', background: 'rgba(255,255,255,0.15)' }} aria-label="Save job">
            <Heart size={20} fill={isSaved ? 'white' : 'none'} />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', marginBottom: 'var(--space-2)', flexWrap: 'wrap' }}>
          {job.isUrgent && <span className="badge badge-urgent"><Zap size={10} /> Urgent</span>}
          {job.isSameDay && <span className="badge badge-success">{t('job.sameDayPay')}</span>}
          {job.isVerified && <span className="badge badge-verified"><BadgeCheck size={10} /> {t('job.verified')}</span>}
        </div>

        <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-2)', lineHeight: 1.2 }}>
          {job.title}
        </h1>

        <p style={{ opacity: 0.9, display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: 'var(--text-base)' }}>
          {job.company} {job.isVerified && <BadgeCheck size={16} />}
        </p>
      </div>

      <div style={{ padding: '0 var(--space-4)', marginTop: 'calc(-1 * var(--space-4))' }}>
        {/* Quick Info Card */}
        <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
          <div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 2 }}>Pay</p>
            <p style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--success-dark)' }}>{formatPay(job.pay, job.payType)}</p>
          </div>
          <div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 2 }}>Shift</p>
            <p style={{ fontSize: 'var(--text-base)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-primary)' }}>
              <Clock size={14} /> {job.shiftTime}
            </p>
          </div>
          <div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 2 }}>Location</p>
            <p style={{ fontSize: 'var(--text-base)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-primary)' }}>
              <MapPin size={14} /> {job.area} · {job.distance}km
            </p>
          </div>
          <div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 2 }}>Openings</p>
            <p style={{ fontSize: 'var(--text-base)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-primary)' }}>
              <Users size={14} /> {job.slots}/{job.slotsTotal} left
            </p>
          </div>
        </div>

        {/* Employer Card */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-lg)', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
            {job.companyLogo}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-primary)' }}>
              {job.company} {job.isVerified && <BadgeCheck size={14} color="var(--primary)" />}
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Star size={12} fill="var(--warning)" color="var(--warning)" />
              {job.rating} · {job.reviewCount} reviews
            </p>
          </div>
        </div>

        {/* About */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-3)', color: 'var(--text-primary)' }}>
            {t('job.aboutJob')}
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 'var(--text-sm)' }}>{job.description}</p>
        </div>

        {/* Map Location */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              Job Location
            </h2>
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleShareLocation}
              style={{ gap: 'var(--space-1)', display: 'inline-flex', alignItems: 'center', height: 32, padding: '0 var(--space-3)' }}
              id="share-location-btn"
            >
              <Share2 size={14} /> Share Location
            </button>
          </div>
          <JobLocationMap lat={job.lat} lng={job.lng} title={job.title} area={job.area} />
        </div>

        {/* Requirements */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-3)', color: 'var(--text-primary)' }}>
            {t('job.requirements')}
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {job.requirements.map((req, i) => (
              <span key={i} className="chip">{req}</span>
            ))}
          </div>
        </div>

        {/* What to bring */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-3)', color: 'var(--text-primary)' }}>
            {t('job.whatToBring')}
          </h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {job.whatToBring.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)', flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* More from employer */}
        {moreJobs.length > 0 && (
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-3)', color: 'var(--text-primary)' }}>
              {t('job.moreFromEmployer')}
            </h2>
            {moreJobs.map(j => (
              <div key={j.id} className="card" style={{ marginBottom: 'var(--space-2)', padding: 'var(--space-3)', cursor: 'pointer' }}
                onClick={() => navigate('seeker-job-detail', j.id)}>
                <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{j.title}</p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--success-dark)', fontWeight: 700 }}>{formatPay(j.pay, j.payType)}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fixed Bottom Bar */}
      <div className="glass" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        padding: 'var(--space-3) var(--space-4)',
        display: 'flex', gap: 'var(--space-3)',
        borderTop: '1px solid var(--border-light)',
        zIndex: 'var(--z-sticky)',
      }}>
        <button className="btn btn-secondary" onClick={() => toggleSaved(job.id)} style={{ flex: 0 }}>
          <Heart size={18} fill={isSaved ? 'var(--danger)' : 'none'} color={isSaved ? 'var(--danger)' : 'var(--text-secondary)'} />
        </button>
        <button className="btn btn-primary btn-lg" style={{ flex: 1 }} onClick={() => navigate('seeker-apply', job.id)} id="apply-now-btn">
          {t('job.applyNow')}
        </button>
        <button className="btn btn-success" style={{ flex: 0, gap: 'var(--space-1)' }}>
          <MessageCircle size={18} />
        </button>
      </div>
    </div>
  );
}
