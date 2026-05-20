'use client';

import React from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { DEMO_CHATS, DEMO_JOBS, ADMIN_USERS } from '@/lib/demo-data';
import { MessageCircle, Search, ArrowLeft, ChevronRight } from 'lucide-react';
import type { Screen } from '@/app/app/page';

interface Props {
  navigate: (s: Screen, jobId?: string) => void;
}

export default function ChatListScreen({ navigate }: Props) {
  const { t } = useI18n();

  return (
    <div className="page-enter" style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div className="glass" style={{ position: 'sticky', top: 0, zIndex: 'var(--z-sticky)', padding: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)', borderBottom: '1px solid var(--border-light)' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--text-primary)' }}>Messages</h1>
      </div>

      <div style={{ padding: 'var(--space-4)' }}>
        {/* Search */}
        <div className="search-bar" style={{ marginBottom: 'var(--space-6)' }}>
          <Search size={18} color="var(--text-tertiary)" />
          <input type="text" placeholder="Search chats..." id="chat-search" />
        </div>

        {/* Chat List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {DEMO_CHATS.map(chat => {
            const job = DEMO_JOBS.find(j => j.id === chat.jobId);
            const employer = ADMIN_USERS.find(u => u.id === chat.employerId);
            
            return (
              <div 
                key={chat.id} 
                className="card" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 'var(--space-4)', 
                  cursor: 'pointer',
                  padding: 'var(--space-4)',
                  position: 'relative'
                }}
                onClick={() => navigate('seeker-chat-detail' as Screen, chat.id)}
              >
                <div className="avatar avatar-md" style={{ background: 'var(--primary-gradient)', color: 'white' }}>
                  {job?.companyLogo || employer?.name.charAt(0) || 'C'}
                </div>
                
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {employer?.name || 'Employer'}
                    </p>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{chat.lastTimestamp}</span>
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 2, fontWeight: 600 }}>
                    {job?.title}
                  </p>
                  <p style={{ 
                    fontSize: 'var(--text-sm)', 
                    color: chat.unreadCount > 0 ? 'var(--text-primary)' : 'var(--text-tertiary)',
                    fontWeight: chat.unreadCount > 0 ? 600 : 400,
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    whiteSpace: 'nowrap' 
                  }}>
                    {chat.lastMessage}
                  </p>
                </div>
                
                {chat.unreadCount > 0 && (
                  <div style={{ 
                    width: 20, 
                    height: 20, 
                    borderRadius: 'var(--radius-full)', 
                    background: 'var(--primary)', 
                    color: 'white', 
                    fontSize: 10, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontWeight: 700
                  }}>
                    {chat.unreadCount}
                  </div>
                )}
                
                <ChevronRight size={16} color="var(--text-tertiary)" style={{ marginLeft: 'var(--space-2)' }} />
              </div>
            );
          })}
        </div>

        {DEMO_CHATS.length === 0 && (
          <div style={{ textAlign: 'center', padding: 'var(--space-12) 0', color: 'var(--text-tertiary)' }}>
            <MessageCircle size={48} style={{ margin: '0 auto var(--space-4)', opacity: 0.2 }} />
            <p>No messages yet.</p>
            <button className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }} onClick={() => navigate('seeker-home')}>
              Find jobs to apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
