'use client';

import React, { useState } from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { MapPin, Banknote, Users, ChevronRight } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const slides = [
  { emoji: '📍', key: 'slide1', gradient: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)' },
  { emoji: '💰', key: 'slide2', gradient: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)' },
  { emoji: '⭐', key: 'slide3', gradient: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)' },
];

export default function OnboardingScreen({ onComplete }: Props) {
  const [current, setCurrent] = useState(0);
  const { t } = useI18n();

  const handleNext = () => {
    if (current < 2) setCurrent(current + 1);
    else onComplete();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      {/* Skip */}
      <div style={{ padding: 'var(--space-4)', display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn btn-ghost" onClick={onComplete} id="onboarding-skip">
          {t('onboarding.skip')}
        </button>
      </div>

      {/* Slide */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-8)', textAlign: 'center' }} className="animate-fade-in-up">
        <div style={{
          width: 160, height: 160, borderRadius: 'var(--radius-full)',
          background: slides[current].gradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 64, marginBottom: 'var(--space-8)',
          boxShadow: '0 20px 60px rgba(37,99,235,0.3)',
          animation: 'pulse 3s ease infinite',
        }}>
          {slides[current].emoji}
        </div>

        <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-4)', lineHeight: 1.2, color: 'var(--text-primary)' }}>
          {t(`onboarding.${slides[current].key}.title`)}
        </h1>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', maxWidth: 320, lineHeight: 1.6 }}>
          {t(`onboarding.${slides[current].key}.desc`)}
        </p>
      </div>

      {/* Controls */}
      <div style={{ padding: 'var(--space-6) var(--space-4) var(--space-8)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)' }}>
        {/* Dots */}
        <div className="stepper">
          {[0, 1, 2].map(i => (
            <div key={i} className={`step-dot ${i === current ? 'active' : i < current ? 'completed' : ''}`} />
          ))}
        </div>

        <button className="btn btn-primary btn-lg btn-block" onClick={handleNext} id="onboarding-next"
          style={{ maxWidth: 360 }}>
          {current === 2 ? t('onboarding.getStarted') : t('onboarding.next')}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
