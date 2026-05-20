'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { useAuthStore } from '@/stores/auth-store';
import { useUIStore } from '@/stores/ui-store';
import { Phone, ArrowLeft, MessageCircle } from 'lucide-react';

interface Props {
  onSuccess: () => void;
}

export default function AuthScreen({ onSuccess }: Props) {
  const { t } = useI18n();
  const { user, login } = useAuthStore();
  const { showToast } = useUIStore();

  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    if (step !== 'otp' || timer <= 0) return;
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [step, timer]);

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 10);
    if (digits.length > 5) return digits.slice(0, 5) + ' ' + digits.slice(5);
    return digits;
  };

  const handleSendOtp = () => {
    if (phone.replace(/\s/g, '').length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setTimer(60);
      showToast('OTP sent successfully!', 'success');
    }, 1000);
  };

  const handleOtpChange = useCallback((index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (value && !/\d/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    // Auto verify when all 6 digits entered
    if (newOtp.every(d => d !== '')) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        login('+91 ' + phone, user?.role || 'seeker');
        showToast('Verified successfully! ✅', 'success');
        onSuccess();
      }, 1200);
    }
  }, [otp, phone, user, login, showToast, onSuccess]);

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimer(60);
    showToast('OTP resent!', 'info');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        {step === 'otp' && (
          <button className="btn btn-icon btn-ghost" onClick={() => { setStep('phone'); setOtp(['','','','','','']); }} aria-label="Go back">
            <ArrowLeft size={20} />
          </button>
        )}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-6)' }} className="animate-fade-in-up">
        {/* Icon */}
        <div style={{
          width: 80, height: 80, borderRadius: 'var(--radius-full)',
          background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 'var(--space-6)', boxShadow: 'var(--shadow-glow)',
        }}>
          <Phone size={36} color="white" />
        </div>

        {step === 'phone' ? (
          <>
            <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-2)', color: 'var(--text-primary)', textAlign: 'center' }}>
              {t('auth.title')}
            </h1>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-8)', textAlign: 'center' }}>
              {t('auth.subtitle')}
            </p>

            {/* Phone Input */}
            <div style={{ width: '100%', maxWidth: 360, marginBottom: 'var(--space-4)' }}>
              <div className="phone-input-wrapper" style={error ? { borderColor: 'var(--danger)' } : {}}>
                <span className="phone-prefix">🇮🇳 +91</span>
                <input
                  className="phone-input"
                  type="tel"
                  placeholder={t('auth.placeholder')}
                  value={phone}
                  onChange={e => { setPhone(formatPhone(e.target.value)); setError(''); }}
                  onKeyDown={e => e.key === 'Enter' && handleSendOtp()}
                  id="phone-input"
                  autoFocus
                  aria-label="Phone number"
                />
              </div>
              {error && <p className="input-error-text" style={{ marginTop: 'var(--space-2)' }}>{error}</p>}
            </div>

            <button className="btn btn-primary btn-lg btn-block" onClick={handleSendOtp}
              disabled={loading} style={{ maxWidth: 360 }} id="send-otp-btn">
              {loading ? <span className="btn-spinner" /> : null}
              {loading ? 'Sending...' : t('auth.sendOtp')}
            </button>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-2)', color: 'var(--text-primary)', textAlign: 'center' }}>
              {t('auth.otpTitle')}
            </h1>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-8)', textAlign: 'center' }}>
              {t('auth.otpSubtitle')} <strong>+91 {phone}</strong>
              <br />
              <button onClick={() => setStep('phone')} style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 'var(--text-sm)', marginTop: 'var(--space-1)' }}>
                {t('auth.wrongNumber')}
              </button>
            </p>

            {/* OTP Inputs */}
            <div className="otp-container" style={{ marginBottom: 'var(--space-6)' }}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={el => { otpRefs.current[i] = el; }}
                  className={`otp-input ${digit ? 'filled' : ''}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(i, e.target.value)}
                  onKeyDown={e => handleOtpKeyDown(i, e)}
                  id={`otp-${i}`}
                  autoFocus={i === 0}
                  aria-label={`OTP digit ${i + 1}`}
                />
              ))}
            </div>

            {error && <p className="input-error-text" style={{ marginBottom: 'var(--space-4)' }}>{error}</p>}

            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--primary)', marginBottom: 'var(--space-4)' }}>
                <span className="btn-spinner" style={{ borderColor: 'rgba(37,99,235,0.3)', borderTopColor: 'var(--primary)' }} />
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>Verifying...</span>
              </div>
            )}

            {/* Resend */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
              {timer > 0 ? (
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>
                  {t('auth.resendIn')} <strong>{timer}s</strong>
                </p>
              ) : (
                <button className="btn btn-ghost" onClick={handleResend}>{t('auth.resend')}</button>
              )}

              <button className="btn btn-outline" style={{ gap: 'var(--space-2)' }}>
                <MessageCircle size={16} />
                {t('auth.whatsapp')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
