'use client';

import React, { useState } from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { useAuthStore } from '@/stores/auth-store';
import { useUIStore } from '@/stores/ui-store';
import { DEMO_JOBS, formatPay } from '@/lib/demo-data';
import { ArrowLeft, Check, PartyPopper, Sparkles } from 'lucide-react';
import type { Screen } from '@/app/app/page';

interface Props {
  jobId: string;
  navigate: (s: Screen) => void;
}

export default function ApplyScreen({ jobId, navigate }: Props) {
  const { t } = useI18n();
  const { user } = useAuthStore();
  const { showToast } = useUIStore();
  const job = DEMO_JOBS.find(j => j.id === jobId) || DEMO_JOBS[0];

  const [step, setStep] = useState(1);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedShift, setSelectedShift] = useState(job.shift);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(4);
      showToast('Application submitted! 🎉', 'success');
    }, 1500);
  };

  const steps = [
    { num: 1, label: t('apply.step1') },
    { num: 2, label: t('apply.step2') },
    { num: 3, label: t('apply.step3') },
    { num: 4, label: t('apply.step4') },
  ];

  return (
    <div className="page-enter" style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)', borderBottom: '1px solid var(--border-light)' }}>
        <button className="btn btn-icon btn-ghost" onClick={() => step === 4 ? navigate('seeker-applications') : navigate('seeker-job-detail')} aria-label="Go back">
          <ArrowLeft size={20} />
        </button>
        <h1 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-primary)' }}>{t('apply.title')}</h1>
      </div>

      {/* Progress */}
      {step < 4 && (
        <div style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          {steps.slice(0, 3).map((s, i) => (
            <React.Fragment key={s.num}>
              <div className={`step-dot ${step === s.num ? 'active' : step > s.num ? 'completed' : ''}`} />
              {i < 2 && <div className={`step-bar ${step > s.num ? 'completed' : ''}`} />}
            </React.Fragment>
          ))}
        </div>
      )}

      <div style={{ padding: 'var(--space-4)' }}>
        {/* Job Summary */}
        {step < 4 && (
          <div className="card" style={{ marginBottom: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-lg)', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
              {job.companyLogo}
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{job.title}</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>{job.company} · {formatPay(job.pay, job.payType)}</p>
            </div>
          </div>
        )}

        {/* Step 1: Confirm details */}
        {step === 1 && (
          <div className="animate-fade-in-up">
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--text-primary)' }}>
              {t('apply.step1')}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div className="input-group">
                <label className="input-label">Name</label>
                <input className="input-field" value={user?.name || 'Jagan'} readOnly style={{ background: 'var(--bg-secondary)' }} />
              </div>
              <div className="input-group">
                <label className="input-label">Phone</label>
                <input className="input-field" value={user?.phone || '+91 98765 43210'} readOnly style={{ background: 'var(--bg-secondary)' }} />
              </div>
              <div className="input-group">
                <label className="input-label">Area</label>
                <input className="input-field" value={user?.area || 'Purasaiwakkam'} readOnly style={{ background: 'var(--bg-secondary)' }} />
              </div>
            </div>
            <button className="btn btn-primary btn-lg btn-block" style={{ marginTop: 'var(--space-6)' }} onClick={() => setStep(2)}>
              {t('common.next')}
            </button>
          </div>
        )}

        {/* Step 2: Add note */}
        {step === 2 && (
          <div className="animate-fade-in-up">
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--text-primary)' }}>
              {t('apply.step2')}
            </h2>
            <div className="input-group">
              <label className="input-label">{t('apply.note')}</label>
              <textarea className="input-field" rows={4} value={note} onChange={e => setNote(e.target.value)}
                placeholder={t('apply.notePlaceholder')}
                style={{ resize: 'none', minHeight: 100 }}
                maxLength={200} />
              <span className="input-hint">{note.length}/200</span>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
              <button className="btn btn-secondary btn-lg" style={{ flex: 1 }} onClick={() => setStep(1)}>{t('common.back')}</button>
              <button className="btn btn-primary btn-lg" style={{ flex: 2 }} onClick={() => setStep(3)}>{t('common.next')}</button>
            </div>
          </div>
        )}

        {/* Step 3: Confirm shift */}
        {step === 3 && (
          <div className="animate-fade-in-up">
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--text-primary)' }}>
              {t('apply.step3')}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {['morning', 'evening', 'night', 'weekend'].map(sh => (
                <button key={sh} className={`chip ${selectedShift === sh ? 'active' : ''}`}
                  onClick={() => setSelectedShift(sh)}
                  style={{ padding: 'var(--space-3) var(--space-4)', justifyContent: 'flex-start', fontSize: 'var(--text-base)' }}>
                  {sh === 'morning' ? '🌅' : sh === 'evening' ? '🌆' : sh === 'night' ? '🌙' : '📅'}
                  <span style={{ marginLeft: 'var(--space-2)' }}>
                    {sh.charAt(0).toUpperCase() + sh.slice(1)}
                  </span>
                  {selectedShift === sh && <Check size={16} style={{ marginLeft: 'auto' }} />}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
              <button className="btn btn-secondary btn-lg" style={{ flex: 1 }} onClick={() => setStep(2)}>{t('common.back')}</button>
              <button className="btn btn-primary btn-lg" style={{ flex: 2 }} onClick={handleSubmit} disabled={loading}>
                {loading ? <><span className="btn-spinner" /> Submitting...</> : t('apply.confirm')}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="animate-scale-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-12) 0', textAlign: 'center' }}>
            <div style={{
              width: 100, height: 100, borderRadius: 'var(--radius-full)',
              background: 'linear-gradient(135deg, var(--success), var(--success-dark))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 'var(--space-6)', boxShadow: '0 10px 30px rgba(34,197,94,0.4)',
            }}>
              <Check size={48} color="white" />
            </div>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>
              {t('apply.success')}
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-8)', maxWidth: 280 }}>
              {t('apply.successDesc')}
            </p>
            <button className="btn btn-primary btn-lg btn-block" style={{ maxWidth: 300 }}
              onClick={() => navigate('seeker-applications')}>
              {t('apply.trackStatus')}
            </button>
            <button className="btn btn-ghost" style={{ marginTop: 'var(--space-3)' }}
              onClick={() => navigate('seeker-home')}>
              Browse more jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
