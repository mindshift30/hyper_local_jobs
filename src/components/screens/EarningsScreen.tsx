'use client';

import React from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { TrendingUp, Briefcase, DollarSign, Share2 } from 'lucide-react';

export default function EarningsScreen() {
  const { t } = useI18n();

  return (
    <div className="page-enter" style={{ paddingBottom: 'calc(var(--bottom-nav-height) + var(--space-4))' }}>
      <div style={{ padding: 'var(--space-4)' }}>
        <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-6)', color: 'var(--text-primary)' }}>
          {t('earnings.title')}
        </h1>

        {/* Monthly Summary Card */}
        <div className="card" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', color: 'white', marginBottom: 'var(--space-4)', textAlign: 'center', padding: 'var(--space-8) var(--space-4)' }}>
          <p style={{ fontSize: 'var(--text-sm)', opacity: 0.8 }}>{t('earnings.thisMonth')}</p>
          <p style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: 'var(--space-2)' }}>₹8,400</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-8)', marginTop: 'var(--space-4)' }}>
            <div>
              <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 800 }}>5</p>
              <p style={{ fontSize: 'var(--text-xs)', opacity: 0.7 }}>{t('earnings.completed')}</p>
            </div>
            <div>
              <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 800 }}>₹680</p>
              <p style={{ fontSize: 'var(--text-xs)', opacity: 0.7 }}>{t('earnings.avgDaily')}</p>
            </div>
          </div>
        </div>

        {/* Share card */}
        <button className="btn btn-outline btn-block" style={{ marginBottom: 'var(--space-6)', gap: 'var(--space-2)' }}>
          <Share2 size={16} /> {t('earnings.share')}
        </button>

        {/* History */}
        <h2 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-3)', color: 'var(--text-primary)' }}>Recent</h2>
        {[
          { title: 'Delivery Partner', company: 'Chennai Fresh Mart', amount: 650, date: 'May 18' },
          { title: 'Event Setup', company: 'Kavitha Catering', amount: 800, date: 'May 15' },
          { title: 'Data Entry', company: 'NexGen InfoTech', amount: 2400, date: 'May 10-14' },
          { title: 'Kitchen Helper', company: 'Saravana Bhavan', amount: 1100, date: 'May 8-9' },
          { title: 'Warehouse Packer', company: 'QuickShip Logistics', amount: 3450, date: 'May 1-5' },
        ].map((item, i) => (
          <div key={i} className="card card-flat" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)', padding: 'var(--space-3) var(--space-4)' }}>
            <div>
              <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{item.title}</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>{item.company} · {item.date}</p>
            </div>
            <p style={{ fontWeight: 800, color: 'var(--success-dark)', fontSize: 'var(--text-base)' }}>+₹{item.amount.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
