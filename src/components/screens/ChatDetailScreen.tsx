'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { useAuthStore } from '@/stores/auth-store';
import { useJobsStore } from '@/stores/jobs-store';
import { supabase, isSupabaseEnabled } from '@/services/supabase';
import { DEMO_CHATS, DEMO_MESSAGES, ADMIN_USERS, DEMO_JOBS, ChatMessage } from '@/lib/demo-data';
import { ArrowLeft, Send, Phone, Info, MoreVertical, Check, CheckCheck } from 'lucide-react';
import type { Screen } from '@/app/app/page';

interface Props {
  chatId: string;
  navigate: (s: Screen, jobId?: string) => void;
}

export default function ChatDetailScreen({ chatId, navigate }: Props) {
  const { t } = useI18n();
  const { user } = useAuthStore();
  const jobs = useJobsStore((state) => state.jobs);
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [liveChat, setLiveChat] = useState<any>(null);
  const [liveOtherUser, setLiveOtherUser] = useState<any>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Time formatter helper
  const formatTime = (isoString: string): string => {
    try {
      const date = new Date(isoString);
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      return `${hours}:${minutes} ${ampm}`;
    } catch {
      return 'Just now';
    }
  };

  // 1. Resolve participant and job details (Live DB -> local mock)
  const chat = liveChat || DEMO_CHATS.find(c => c.id === chatId);
  const job = jobs.find(j => j.id === chat?.jobId) || DEMO_JOBS.find(j => j.id === chat?.jobId);
  const otherUser = liveOtherUser 
    ? { id: liveOtherUser.id, name: liveOtherUser.name, role: liveOtherUser.role }
    : ADMIN_USERS.find(u => u.id === (user?.role === 'seeker' ? chat?.employerId : chat?.seekerId));

  // 2. Fetch thread participants details dynamically if Supabase is active
  useEffect(() => {
    const client = supabase;
    if (!isSupabaseEnabled() || !client || !user) return;

    const loadChatParticipants = async () => {
      try {
        const { data: chatData } = await client
          .from('chats')
          .select('*')
          .eq('id', chatId)
          .single();

        if (chatData) {
          setLiveChat(chatData);
          
          const targetUserId = user.role === 'seeker' ? chatData.employer_id : chatData.seeker_id;
          const { data: profileData } = await client
            .from('profiles')
            .select('*')
            .eq('id', targetUserId)
            .single();

          if (profileData) {
            setLiveOtherUser(profileData);
          }
        }
      } catch (err) {
        console.warn('[ChatDetail] Participant fetch warning:', err);
      }
    };

    loadChatParticipants();
  }, [chatId, user]);

  // 3. Setup lightweight 5-second polling loop for messages
  useEffect(() => {
    const client = supabase;
    if (!isSupabaseEnabled() || !client) {
      // Mock messages initial load
      const chatMessages = DEMO_MESSAGES.filter(m => m.chatId === chatId);
      setMessages(chatMessages);
      return;
    }

    const pollMessages = async () => {
      try {
        const { data, error } = await client
          .from('messages')
          .select('*')
          .eq('chat_id', chatId)
          .order('created_at', { ascending: true });

        if (error) throw error;

        if (data) {
          const mapped: ChatMessage[] = data.map(m => ({
            id: m.id,
            chatId: m.chat_id,
            senderId: m.sender_id,
            text: m.text,
            timestamp: formatTime(m.created_at),
            isRead: m.is_read
          }));

          // Avoid resetting state if there are no new messages to prevent UI flicker
          setMessages(prev => {
            if (prev.length !== mapped.length || (prev.length > 0 && prev[prev.length - 1].id !== mapped[mapped.length - 1].id)) {
              return mapped;
            }
            return prev;
          });
        }
      } catch (err) {
        console.warn('[ChatDetail] Polling failed:', err);
      }
    };

    pollMessages();
    const pollInterval = setInterval(pollMessages, 5000); // 5s active polling

    return () => clearInterval(pollInterval);
  }, [chatId]);

  // 4. Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 5. Send message action
  const handleSend = async () => {
    if (!inputText.trim()) return;

    const textToSend = inputText;
    setInputText('');

    const client = supabase;
    if (!isSupabaseEnabled() || !client || !user) {
      // Offline mock flow
      const newMessage: ChatMessage = {
        id: `m${Date.now()}`,
        chatId,
        senderId: user?.id || 'u1',
        text: textToSend,
        timestamp: 'Just now',
        isRead: false,
      };

      setMessages(prev => [...prev, newMessage]);

      // Mock auto-reply
      setTimeout(() => {
        const reply: ChatMessage = {
          id: `m${Date.now() + 1}`,
          chatId,
          senderId: otherUser?.id || '',
          text: `I'll get back to you shortly regarding the ${job?.title || 'job'}.`,
          timestamp: 'Just now',
          isRead: false,
        };
        setMessages(prev => [...prev, reply]);
      }, 2000);
      return;
    }

    // Real Supabase insert
    try {
      const { error: insertError } = await client
        .from('messages')
        .insert({
          chat_id: chatId,
          sender_id: user.id,
          text: textToSend,
          is_read: false
        });

      if (insertError) throw insertError;

      // Update chats metadata row
      await client
        .from('chats')
        .update({
          last_message: textToSend,
          last_timestamp: new Date().toISOString()
        })
        .eq('id', chatId);

      // Force immediate poll refresh to show sent message
      const { data } = await client
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });

      if (data) {
        setMessages(data.map(m => ({
          id: m.id,
          chatId: m.chat_id,
          senderId: m.sender_id,
          text: m.text,
          timestamp: formatTime(m.created_at),
          isRead: m.is_read
        })));
      }
    } catch (err: any) {
      console.error('[ChatDetail] Send failed:', err.message);
    }
  };

  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg-secondary)' }}>
      {/* Header */}
      <div className="glass" style={{ padding: 'var(--space-3) var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)', borderBottom: '1px solid var(--border-light)', zIndex: 10 }}>
        <button className="btn btn-icon btn-ghost" onClick={() => navigate('seeker-chats' as Screen)}>
          <ArrowLeft size={20} />
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flex: 1, cursor: 'pointer' }}>
          <div className="avatar avatar-sm" style={{ background: 'var(--primary-gradient)', color: 'white' }}>
            {otherUser?.name.charAt(0) || 'E'}
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {otherUser?.name || 'Employer'}
            </p>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--success)', fontWeight: 600 }}>Online</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
          <button className="btn btn-icon btn-ghost" aria-label="Call">
            <Phone size={18} />
          </button>
          <button className="btn btn-icon btn-ghost" aria-label="More">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Job Context Bar */}
      {job && (
        <div style={{ background: 'var(--bg-primary)', padding: 'var(--space-2) var(--space-4)', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Regarding:</span>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-primary)' }}>{job.title}</span>
          </div>
          <button className="btn btn-ghost btn-sm" style={{ fontSize: 10, color: 'var(--primary)', fontWeight: 700 }} onClick={() => navigate('seeker-job-detail' as Screen, job.id)}>
            VIEW JOB
          </button>
        </div>
      )}

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <p style={{ textAlign: 'center', fontSize: 10, color: 'var(--text-tertiary)', margin: 'var(--space-4) 0', textTransform: 'uppercase', letterSpacing: 1 }}>
          Today
        </p>
        
        {messages.map((m, i) => {
          const isMe = m.senderId === user?.id || (user?.role === 'seeker' && m.senderId === 'u1');
          const showAvatar = i === 0 || messages[i-1].senderId !== m.senderId;

          return (
            <div key={m.id} style={{ 
              display: 'flex', 
              flexDirection: isMe ? 'row-reverse' : 'row', 
              alignItems: 'flex-end', 
              gap: 'var(--space-2)',
              alignSelf: isMe ? 'flex-end' : 'flex-start',
              maxWidth: '85%'
            }}>
              {!isMe && (
                <div style={{ width: 28, height: 28, borderRadius: 'var(--radius-full)', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, opacity: showAvatar ? 1 : 0 }}>
                  {otherUser?.name.charAt(0) || 'E'}
                </div>
              )}
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                <div className={`chat-bubble ${isMe ? 'mine' : 'theirs'}`} style={{
                  padding: 'var(--space-3) var(--space-4)',
                  borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: isMe ? 'var(--primary-gradient)' : 'var(--bg-primary)',
                  color: isMe ? 'white' : 'var(--text-primary)',
                  boxShadow: 'var(--shadow-sm)',
                  fontSize: 'var(--text-sm)',
                  lineHeight: 1.4
                }}>
                  {m.text}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, padding: '0 4px' }}>
                  <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{m.timestamp}</span>
                  {isMe && (m.isRead ? <CheckCheck size={12} color="var(--primary)" /> : <Check size={12} color="var(--text-tertiary)" />)}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="glass" style={{ padding: 'var(--space-3) var(--space-4)', borderTop: '1px solid var(--border-light)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', background: 'var(--bg-primary)', borderRadius: 'var(--radius-full)', padding: '4px 4px 4px 16px', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
          <input 
            type="text" 
            placeholder="Type a message..." 
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 'var(--text-sm)', padding: 'var(--space-2) 0' }}
          />
          <button 
            className="btn btn-icon btn-primary" 
            onClick={handleSend} 
            disabled={!inputText.trim()}
            style={{ width: 36, height: 36, borderRadius: 'var(--radius-full)' }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

