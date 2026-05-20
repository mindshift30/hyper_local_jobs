'use client';

import React from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { ADMIN_STATS, ADMIN_USERS } from '@/lib/demo-data';
import { 
  Users, 
  Briefcase, 
  BarChart3, 
  ShieldAlert, 
  TrendingUp, 
  Map as MapIcon, 
  MoreVertical,
  Search,
  Filter
} from 'lucide-react';
import { DEMO_JOBS } from '@/lib/demo-data';
import AdminJobMap from '@/components/maps/AdminJobMap';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#2563EB', '#7C3AED', '#F59E0B', '#22C55E', '#EF4444', '#06B6D4'];

export default function AdminDashboard() {
  const { t } = useI18n();

  return (
    <div className="admin-layout" style={{ background: 'var(--bg-secondary)' }}>
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 900 }}>
            <span className="text-gradient">⚡ QuickGig Admin</span>
          </h1>
        </div>
        <nav className="admin-sidebar-nav">
          <a href="#" className="admin-nav-item active"><BarChart3 size={18} /> {t('admin.overview')}</a>
          <a href="#" className="admin-nav-item"><Users size={18} /> {t('admin.users')}</a>
          <a href="#" className="admin-nav-item"><Briefcase size={18} /> {t('admin.jobs')}</a>
          <a href="#" className="admin-nav-item"><TrendingUp size={18} /> {t('admin.analytics')}</a>
          <a href="#" className="admin-nav-item"><ShieldAlert size={18} /> {t('admin.moderation')}</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        <div className="container-admin">
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
            <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-primary)' }}>Dashboard Overview</h1>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <button className="btn btn-secondary"><Filter size={16} /> Filters</button>
              <button className="btn btn-primary">Export Report</button>
            </div>
          </header>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
            <div className="stats-card">
              <p className="stats-card-label">{t('admin.activeUsers')}</p>
              <p className="stats-card-value">{ADMIN_STATS.activeUsers.toLocaleString()}</p>
              <p className="stats-card-change up"><TrendingUp size={14} /> +{ADMIN_STATS.userGrowth}%</p>
            </div>
            <div className="stats-card">
              <p className="stats-card-label">{t('admin.jobsToday')}</p>
              <p className="stats-card-value">{ADMIN_STATS.jobsToday}</p>
              <p className="stats-card-change up"><TrendingUp size={14} /> +{ADMIN_STATS.jobGrowth}%</p>
            </div>
            <div className="stats-card">
              <p className="stats-card-label">{t('admin.appsToday')}</p>
              <p className="stats-card-value">{ADMIN_STATS.applicationsToday.toLocaleString()}</p>
              <p className="stats-card-change up"><TrendingUp size={14} /> +{ADMIN_STATS.applicationGrowth}%</p>
            </div>
            <div className="stats-card">
              <p className="stats-card-label">{t('admin.revenue')}</p>
              <p className="stats-card-value">₹{(ADMIN_STATS.revenueToday / 1000).toFixed(1)}k</p>
              <p className="stats-card-change up"><TrendingUp size={14} /> +{ADMIN_STATS.revenueGrowth}%</p>
            </div>
          </div>

          {/* Charts Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
            <div className="card" style={{ height: 400 }}>
              <h3 style={{ marginBottom: 'var(--space-4)', fontWeight: 700 }}>User Registrations (Weekly)</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ADMIN_STATS.weeklySignups}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}
                    itemStyle={{ color: 'var(--primary)' }}
                  />
                  <Line type="monotone" dataKey="count" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, fill: 'var(--primary)' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="card" style={{ height: 400 }}>
              <h3 style={{ marginBottom: 'var(--space-4)', fontWeight: 700 }}>Jobs by Category</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ADMIN_STATS.jobsByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {ADMIN_STATS.jobsByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
                {ADMIN_STATS.jobsByCategory.map((entry, index) => (
                  <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS[index % COLORS.length] }} />
                    <span style={{ color: 'var(--text-secondary)' }}>{entry.name} ({entry.value}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Job Density Map */}
          <div className="card" style={{ marginBottom: 'var(--space-8)' }}>
            <h3 style={{ marginBottom: 'var(--space-4)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <MapIcon size={18} /> Job Density Map
            </h3>
            <AdminJobMap jobs={DEMO_JOBS} />
          </div>

          {/* Table Row */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontWeight: 700 }}>Recent Users</h3>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: 12, top: 10, color: 'var(--text-tertiary)' }} />
                <input className="input-field" placeholder="Search users..." style={{ paddingLeft: 32, minHeight: 36, fontSize: 13, width: 200 }} />
              </div>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Area</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Last Active</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {ADMIN_USERS.map(user => (
                  <tr key={user.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <div className="avatar avatar-sm" style={{ background: 'var(--primary-100)', color: 'var(--primary)' }}>{user.name.charAt(0)}</div>
                        <div>
                          <p style={{ fontWeight: 600 }}>{user.name}</p>
                          <p style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{user.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge badge-neutral" style={{ textTransform: 'capitalize' }}>{user.role}</span></td>
                    <td>{user.area}</td>
                    <td>
                      <span className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>{user.joinedAt}</td>
                    <td>{user.lastActive}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn btn-icon btn-ghost"><MoreVertical size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
