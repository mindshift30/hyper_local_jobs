'use client';

import React, { useState, useEffect } from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { useAuthStore } from '@/stores/auth-store';
import { useUIStore } from '@/stores/ui-store';
import { useJobsStore } from '@/stores/jobs-store';
import { DEMO_JOBS, formatPay, JOB_CATEGORIES } from '@/lib/demo-data';
import { LayoutDashboard, PlusCircle, Users, User, Eye, Briefcase, UserCheck, Plus, Check, X, MessageCircle, ChevronRight, Star, Phone } from 'lucide-react';
import { geocodeArea } from '@/services/geocoding';
import { CHENNAI_AREA_COORDS } from '@/lib/constants/chennai-areas';
import type { Screen } from '@/app/app/page';

interface Props {
  screen: Screen;
  navigate: (s: Screen, jobId?: string) => void;
}

export default function EmployerShell({ screen, navigate }: Props) {
  const { t } = useI18n();

  const renderContent = () => {
    switch (screen) {
      case 'employer-dashboard': return <EmployerDashboard navigate={navigate} />;
      case 'employer-post-job': return <PostJobWizard navigate={navigate} />;
      case 'employer-applicants': return <ApplicantsManager navigate={navigate} />;
      case 'employer-profile': return <EmployerProfile />;
      default: return <EmployerDashboard navigate={navigate} />;
    }
  };

  const navItems = [
    { id: 'employer-dashboard' as Screen, icon: <LayoutDashboard size={20} />, label: t('nav.dashboard') },
    { id: 'employer-post-job' as Screen, icon: <PlusCircle size={20} />, label: t('nav.postJob') },
    { id: 'employer-applicants' as Screen, icon: <Users size={20} />, label: t('nav.applicants') },
    { id: 'employer-profile' as Screen, icon: <User size={20} />, label: t('nav.profile') },
  ];

  return (
    <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', position: 'relative', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {renderContent()}
      <nav className="bottom-nav" style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }} aria-label="Employer navigation">
        {navItems.map(item => (
          <button key={item.id} className={`nav-item ${screen === item.id ? 'active' : ''}`}
            onClick={() => navigate(item.id)} aria-label={item.label}>
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

/* === EMPLOYER DASHBOARD === */
function EmployerDashboard({ navigate }: { navigate: (s: Screen) => void }) {
  const { t } = useI18n();
  const { user } = useAuthStore();
  const { jobs, fetchJobs, employerApplications, fetchEmployerApplications } = useJobsStore();

  useEffect(() => {
    if (user?.id) {
      fetchJobs();
      fetchEmployerApplications(user.id);
    }
  }, [user?.id, fetchJobs, fetchEmployerApplications]);

  const myJobs = jobs.filter(j => j.employerId === user?.id);
  const myApplicants = employerApplications;
  
  // Calculate dynamic stats
  const activeJobsCount = myJobs.length;
  const totalApplicantsCount = myApplicants.length;
  const hiredCount = myApplicants.filter(a => a.status === 'hired').length;

  return (
    <div className="page-enter" style={{ paddingBottom: 'calc(var(--bottom-nav-height) + var(--space-4))' }}>
      <div style={{ padding: 'var(--space-4)' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 2 }}>Welcome back,</p>
        <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-6)', color: 'var(--text-primary)' }}>
          {user?.name || 'Kavitha'} 👋
        </h1>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
          {[
            { label: t('employer.activeJobs'), value: String(activeJobsCount), icon: <Briefcase size={18} />, color: 'var(--primary)' },
            { label: t('employer.applicants'), value: String(totalApplicantsCount), icon: <Users size={18} />, color: 'var(--secondary)' },
            { label: t('employer.views'), value: String(activeJobsCount * 12 + totalApplicantsCount * 2), icon: <Eye size={18} />, color: 'var(--warning)' },
            { label: t('employer.hiredWeek'), value: String(hiredCount), icon: <UserCheck size={18} />, color: 'var(--success)' },
          ].map(stat => (
            <div key={stat.label} className="stats-card">
              <div style={{ color: stat.color, marginBottom: 'var(--space-1)' }}>{stat.icon}</div>
              <p className="stats-card-value" style={{ fontSize: 'var(--text-2xl)' }}>{stat.value}</p>
              <p className="stats-card-label">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Post Job FAB */}
        <button className="btn btn-primary btn-lg btn-block" onClick={() => navigate('employer-post-job')}
          style={{ marginBottom: 'var(--space-6)', gap: 'var(--space-2)' }}>
          <Plus size={20} /> {t('employer.postJob')}
        </button>

        {/* Active Jobs */}
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-3)', color: 'var(--text-primary)' }}>
          {t('employer.activeJobs')}
        </h2>
        {myJobs.length === 0 ? (
          <div className="card" style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <Briefcase size={32} style={{ margin: '0 auto var(--space-2)', opacity: 0.5 }} />
            <p style={{ fontSize: 'var(--text-sm)' }}>No active job listings yet. Click above to post your first job!</p>
          </div>
        ) : (
          myJobs.map(job => {
            const jobApps = myApplicants.filter(a => a.jobId === job.id);
            return (
              <div key={job.id} className="card" style={{ marginBottom: 'var(--space-3)', cursor: 'pointer' }}
                onClick={() => navigate('employer-applicants')}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{job.title}</p>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>{job.area} · {formatPay(job.pay, job.payType)}</p>
                  </div>
                  <span className="badge badge-primary">{jobApps.length} {jobApps.length === 1 ? 'applicant' : 'applicants'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-2)' }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Posted {job.postedAt}</span>
                  <ChevronRight size={14} color="var(--text-tertiary)" />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

/* === POST JOB WIZARD === */
function PostJobWizard({ navigate }: { navigate: (s: Screen) => void }) {
  const { t } = useI18n();
  const { showToast } = useUIStore();
  const { user } = useAuthStore();
  const { createJob } = useJobsStore();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '', category: '', customCategory: '', people: 1, pay: '', payType: 'daily' as 'daily' | 'weekly' | 'monthly',
    shift: 'morning', duration: '1 day', area: 'T.Nagar', description: '', sameDayPay: true,
    latitude: 13.0418, longitude: 80.2341, // Default T.Nagar coords
  });

  const handleAreaBlur = async (areaText: string) => {
    if (!areaText.trim()) return;
    const cleanArea = areaText.trim();
    // 1. Try hardcoded coords first (case insensitive match)
    const matchKey = Object.keys(CHENNAI_AREA_COORDS).find(k => k.toLowerCase() === cleanArea.toLowerCase());
    if (matchKey) {
      const coords = CHENNAI_AREA_COORDS[matchKey];
      setForm(f => ({ ...f, area: matchKey, latitude: coords.lat, longitude: coords.lng }));
    } else {
      // 2. Fallback to API geocoding
      try {
        const coords = await geocodeArea(cleanArea);
        setForm(f => ({ ...f, area: cleanArea, latitude: coords.latitude, longitude: coords.longitude }));
      } catch (err) {
        console.error('Error geocoding custom area:', err);
        // Keep the custom area text, but keep the default lat/lng
        setForm(f => ({ ...f, area: cleanArea }));
      }
    }
  };

  const handlePost = async () => {
    if (!user?.id) {
      showToast('You must be logged in to post a job', 'error');
      return;
    }
    setIsSubmitting(true);
    try {
      const selectedCategory = form.category === 'others' ? (form.customCategory || 'Others') : (form.category || 'events');
      const categoryIcon = selectedCategory.toLowerCase().includes('delivery') ? '🛵' : 
                           selectedCategory.toLowerCase().includes('retail') ? '🏪' : 
                           selectedCategory.toLowerCase().includes('kitchen') ? '🍳' : 
                           form.category === 'others' ? '➕' : '🏢';
      await createJob({
        title: form.title || 'Untitled Job',
        company: user.name || 'Kavitha Catering',
        companyLogo: categoryIcon,
        category: selectedCategory,
        area: form.area,
        distance: 1.0,
        pay: Number(form.pay) || 600,
        payType: form.payType,
        shift: form.shift,
        shiftTime: form.shift === 'morning' ? '7 AM – 3 PM' : 
                   form.shift === 'evening' ? '2 PM – 8 PM' : 
                   form.shift === 'night' ? '8 PM – 4 AM' : 
                   form.shift === 'one-day' ? 'Single Day Shift' : '9 AM – 5 PM',
        description: form.description || 'General helper duties.',
        requirements: ['Punctual', 'Honest work ethic'],
        whatToBring: ['Aadhaar card copy'],
        slots: form.people,
        slotsTotal: form.people,
        isUrgent: false,
        isVerified: false,
        isSameDay: form.sameDayPay,
        rating: 5.0,
        reviewCount: 0,
        lat: form.latitude,
        lng: form.longitude,
      }, user.id);
      
      showToast(t('employer.postSuccess'), 'success');
      setStep(5);
    } catch (err: any) {
      showToast('Failed to post job: ' + err.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-enter" style={{ paddingBottom: 'calc(var(--bottom-nav-height) + var(--space-4))' }}>
      <div style={{ padding: 'var(--space-4)' }}>
        <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>{t('employer.postJob')}</h1>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>Fill in the details to post your job</p>

        {step < 5 && (
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
            {[1, 2, 3, 4].map(s => (
              <React.Fragment key={s}>
                <div className={`step-dot ${step === s ? 'active' : step > s ? 'completed' : ''}`} />
                {s < 4 && <div className={`step-bar ${step > s ? 'completed' : ''}`} />}
              </React.Fragment>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="animate-fade-in-up">
            <h2 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--text-primary)' }}>{t('employer.step1')}</h2>
            <div className="input-group" style={{ marginBottom: 'var(--space-4)' }}>
              <label className="input-label">Job Title</label>
              <input className="input-field" placeholder="e.g. Delivery Partner, Kitchen Helper" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <label className="input-label" style={{ marginBottom: 'var(--space-2)', display: 'block' }}>Category</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-2)' }}>
                {[...JOB_CATEGORIES.slice(0, 7), { id: 'others', name: 'Others', icon: '➕', color: '#10B981' }].map(c => (
                  <button key={c.id} className={`category-item ${form.category === c.id ? '' : ''}`}
                    onClick={() => setForm({ ...form, category: c.id })}
                    style={form.category === c.id ? { borderColor: 'var(--primary)', background: 'var(--primary-50)' } : {}}
                    id={`post-cat-${c.id}`}
                  >
                    <span style={{ fontSize: 20 }}>{c.icon}</span>
                    <span className="category-name">{c.name}</span>
                  </button>
                ))}
              </div>
              {form.category === 'others' && (
                <div className="input-group animate-fade-in-up" style={{ marginTop: 'var(--space-3)' }}>
                  <label className="input-label">Custom Category Name</label>
                  <input
                    className="input-field"
                    placeholder="e.g. Catering, Gardening, Painting"
                    value={form.customCategory}
                    onChange={e => setForm({ ...form, customCategory: e.target.value })}
                    id="post-custom-category"
                  />
                </div>
              )}
            </div>
            <div className="input-group" style={{ marginBottom: 'var(--space-4)' }}>
              <label className="input-label">Number of people needed</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <button className="btn btn-secondary btn-icon" onClick={() => setForm({ ...form, people: Math.max(1, form.people - 1) })}>-</button>
                <span style={{ fontSize: 'var(--text-xl)', fontWeight: 700, minWidth: 40, textAlign: 'center', color: 'var(--text-primary)' }}>{form.people}</span>
                <button className="btn btn-secondary btn-icon" onClick={() => setForm({ ...form, people: Math.min(50, form.people + 1) })}>+</button>
              </div>
            </div>
            <button className="btn btn-primary btn-lg btn-block" onClick={() => setStep(2)}>{t('common.next')}</button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in-up">
            <h2 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--text-primary)' }}>{t('employer.step2')}</h2>
            <div className="input-group" style={{ marginBottom: 'var(--space-4)' }}>
              <label className="input-label">Pay Amount (₹)</label>
              <input className="input-field" type="number" placeholder="650" value={form.pay} onChange={e => setForm({ ...form, pay: e.target.value })} />
              <span className="input-hint" style={{ color: 'var(--primary)' }}>💡 Average pay for this role in T.Nagar: ₹550–₹700/day</span>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              {(['daily', 'weekly', 'monthly'] as const).map(pt => (
                <button key={pt} className={`chip ${form.payType === pt ? 'active' : ''}`} onClick={() => setForm({ ...form, payType: pt })}>
                  {pt.charAt(0).toUpperCase() + pt.slice(1)}
                </button>
              ))}
            </div>
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <label className="input-label" style={{ marginBottom: 'var(--space-2)', display: 'block' }}>Shift</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(95px, 1fr))', gap: 'var(--space-2)' }}>
                {[
                  { id: 'morning', icon: '🌅', label: 'Morning' },
                  { id: 'evening', icon: '🌆', label: 'Evening' },
                  { id: 'night', icon: '🌙', label: 'Night' },
                  { id: 'weekend', icon: '📅', label: 'Weekend' },
                  { id: 'one-day', icon: '⏱️', label: 'One Day' }
                ].map(sh => (
                  <button key={sh.id} className={`chip ${form.shift === sh.id ? 'active' : ''}`}
                    onClick={() => setForm({ ...form, shift: sh.id })} style={{ justifyContent: 'center', padding: 'var(--space-3)', width: '100%' }}>
                    {sh.icon} {sh.label}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--success-50)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--success)' }}>
              <div className={`toggle ${form.sameDayPay ? 'active' : ''}`} onClick={() => setForm({ ...form, sameDayPay: !form.sameDayPay })} />
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--success-dark)' }}>💰 Same-day pay (builds trust!)</span>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <button className="btn btn-secondary btn-lg" style={{ flex: 1 }} onClick={() => setStep(1)}>{t('common.back')}</button>
              <button className="btn btn-primary btn-lg" style={{ flex: 2 }} onClick={() => setStep(3)}>{t('common.next')}</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in-up">
            <h2 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--text-primary)' }}>{t('employer.step3')}</h2>
            <div className="input-group" style={{ marginBottom: 'var(--space-4)' }}>
              <label className="input-label">Area / Location</label>
              <input
                className="input-field"
                placeholder="e.g. Anna Nagar, Madipakkam, Adyar"
                value={form.area}
                onChange={e => setForm({ ...form, area: e.target.value })}
                onBlur={e => handleAreaBlur(e.target.value)}
                id="post-job-area-input"
              />
              <span className="input-hint" style={{ color: 'var(--text-tertiary)', marginTop: 4, display: 'block', fontSize: 'var(--text-xxs)' }}>
                💡 Type any area or street. We will find it on the map!
              </span>
            </div>
            <div className="input-group" style={{ marginBottom: 'var(--space-4)' }}>
              <label className="input-label">Job Description (optional)</label>
              <textarea className="input-field" rows={3} placeholder="Describe the job responsibilities..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ resize: 'none' }} />
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <button className="btn btn-secondary btn-lg" style={{ flex: 1 }} onClick={() => setStep(2)}>{t('common.back')}</button>
              <button className="btn btn-primary btn-lg" style={{ flex: 2 }} onClick={async () => {
                setIsSubmitting(true);
                try {
                  await handleAreaBlur(form.area);
                } finally {
                  setIsSubmitting(false);
                  setStep(4);
                }
              }} disabled={isSubmitting}>{t('common.next')}</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-in-up">
            <h2 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--text-primary)' }}>{t('employer.step4')}</h2>
            <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
              <p style={{ fontWeight: 700, fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>{form.title || 'Job Title'}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                <span>📍 {form.area}</span>
                <span>💰 ₹{form.pay || '0'}/{form.payType}</span>
                <span>👥 {form.people} people</span>
                <span>⏰ {form.shift}</span>
              </div>
            </div>
            <div className="card" style={{
              background: 'linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(34,197,94,0.02) 100%)',
              border: '1px dashed var(--success)',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              marginBottom: 'var(--space-4)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)'
            }}>
              <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--success-dark)', display: 'flex', alignItems: 'center', gap: 6, margin: 0 }}>
                🎉 QuickGig is 100% Free!
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                We support Chennai's local businesses. Your job will be broadcasted instantly to matching job seekers in <strong>{form.area}</strong> for free.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <button className="btn btn-secondary btn-lg" style={{ flex: 1 }} onClick={() => setStep(3)}>{t('common.back')}</button>
              <button className="btn btn-primary btn-lg" style={{ flex: 2 }} onClick={handlePost} disabled={isSubmitting}>
                {isSubmitting ? 'Posting...' : 'Post Job (Free)'}
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="animate-scale-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 'var(--space-12) 0', textAlign: 'center' }}>
            <div style={{ width: 100, height: 100, borderRadius: 'var(--radius-full)', background: 'linear-gradient(135deg, var(--success), var(--success-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-6)', boxShadow: '0 10px 30px rgba(34,197,94,0.4)' }}>
              <Check size={48} color="white" />
            </div>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>{t('employer.postSuccess')}</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-8)' }}>{t('employer.postSuccessDesc')}</p>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('employer-dashboard')}>Go to Dashboard</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* === APPLICANTS MANAGER === */
function ApplicantsManager({ navigate }: { navigate: (s: Screen) => void }) {
  const { t } = useI18n();
  const { showToast } = useUIStore();
  const { user } = useAuthStore();
  const { employerApplications, updateApplicationStatus, fetchEmployerApplications } = useJobsStore();

  useEffect(() => {
    if (user?.id) {
      fetchEmployerApplications(user.id);
    }
  }, [user?.id, fetchEmployerApplications]);

  const updateStatus = async (id: string, status: 'applied' | 'viewed' | 'shortlisted' | 'hired' | 'rejected') => {
    try {
      await updateApplicationStatus(id, status);
      showToast(`Applicant ${status}!`, 'success');
    } catch (err: any) {
      showToast(`Failed to update: ${err.message}`, 'error');
    }
  };

  const statusColors: Record<string, string> = {
    applied: 'var(--primary)', shortlisted: 'var(--warning)', hired: 'var(--success)', rejected: 'var(--danger)', viewed: 'var(--text-tertiary)'
  };

  return (
    <div className="page-enter" style={{ paddingBottom: 'calc(var(--bottom-nav-height) + var(--space-4))' }}>
      <div style={{ padding: 'var(--space-4)' }}>
        <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>Applicants</h1>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>Manage seeker applications for your active jobs</p>

        {employerApplications.length === 0 ? (
          <div className="card" style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <Users size={36} style={{ margin: '0 auto var(--space-3)', opacity: 0.5 }} />
            <p style={{ fontSize: 'var(--text-sm)' }}>No applications received yet. Your active listings are live on the seeker feed!</p>
          </div>
        ) : (
          employerApplications.map(a => (
            <div key={a.id} className="card" style={{ marginBottom: 'var(--space-3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                <div className="avatar avatar-md" style={{ background: `linear-gradient(135deg, ${statusColors[a.status] || 'var(--primary)'}, var(--secondary))` }}>
                  {a.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{a.name}</p>
                      <p style={{ fontSize: 'var(--text-xxs)', color: 'var(--primary)', fontWeight: 600 }}>{a.jobTitle}</p>
                    </div>
                    <span className="badge" style={{ background: `${statusColors[a.status]}20`, color: statusColors[a.status] }}>
                      {a.status}
                    </span>
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>{a.area} · ⭐ {a.trustScore}</p>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 2, fontStyle: a.experience ? 'italic' : 'normal' }}>
                    {a.experience || 'No application cover note provided.'}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                {a.status === 'applied' && <>
                  <button className="btn btn-sm btn-primary" style={{ flex: 1 }} onClick={() => updateStatus(a.id, 'shortlisted')}>
                    <Star size={14} /> {t('applicant.shortlist')}
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => updateStatus(a.id, 'rejected')}>
                    <X size={14} />
                  </button>
                </>}
                {a.status === 'shortlisted' && <>
                  <button className="btn btn-sm btn-success" style={{ flex: 1 }} onClick={() => updateStatus(a.id, 'hired')}>
                    <Check size={14} /> {t('applicant.hire')}
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => updateStatus(a.id, 'rejected')}>
                    <X size={14} />
                  </button>
                </>}
                <a href={`tel:${a.phone}`} className="btn btn-sm btn-success" style={{ gap: 'var(--space-1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={14} />
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* === EMPLOYER PROFILE === */
function EmployerProfile() {
  const { t } = useI18n();
  const { user } = useAuthStore();

  return (
    <div className="page-enter" style={{ paddingBottom: 'calc(var(--bottom-nav-height) + var(--space-4))' }}>
      <div style={{ background: 'linear-gradient(135deg, var(--secondary), var(--primary))', padding: 'var(--space-8) var(--space-4)', textAlign: 'center', color: 'white' }}>
        <div className="avatar avatar-xl" style={{ background: 'rgba(255,255,255,0.2)', margin: '0 auto var(--space-4)', border: '3px solid rgba(255,255,255,0.5)' }}>K</div>
        <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800 }}>{user?.name || 'Kavitha Catering'}</h1>
        <p style={{ opacity: 0.9, marginTop: 4 }}>T.Nagar, Chennai</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 'var(--space-2)' }}>
          <Star size={16} fill="var(--warning)" color="var(--warning)" /> <strong>4.7</strong> · 42 reviews
        </div>
      </div>
      <div style={{ padding: 'var(--space-4)' }}>
        <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', textAlign: 'center', gap: 'var(--space-4)', marginTop: 'calc(-1 * var(--space-4))' }}>
          <div><p style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-primary)' }}>28</p><p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Jobs Posted</p></div>
          <div><p style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--success)' }}>45</p><p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Workers Hired</p></div>
          <div><p style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--primary)' }}>4.7</p><p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Rating</p></div>
        </div>
      </div>
    </div>
  );
}
