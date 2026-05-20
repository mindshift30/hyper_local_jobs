'use client';

import { create } from 'zustand';
import { supabase, isSupabaseEnabled, seedDatabaseIfEmpty } from '@/services/supabase';
import { Job, Application, DEMO_JOBS, DEMO_APPLICATIONS } from '@/lib/demo-data';

export interface EmployerApplication {
  id: string;
  jobId: string;
  jobTitle?: string;
  userId: string;
  name: string;
  phone: string;
  area: string;
  trustScore: number;
  isVerified: boolean;
  status: 'applied' | 'viewed' | 'shortlisted' | 'hired' | 'rejected';
  appliedAt: string;
  experience: string;
}

interface JobFilters {
  search: string;
  areas: string[];
  categories: string[];
  shifts: string[];
  payMin: number;
  payMax: number;
  payType: 'all' | 'daily' | 'weekly' | 'monthly';
  maxDistance: number;
  verifiedOnly: boolean;
  urgentOnly: boolean;
  postedWithin: 'all' | '1h' | 'today' | 'week';
}

interface JobsState {
  jobs: Job[];
  applications: Application[];
  employerApplications: EmployerApplication[];
  loading: boolean;
  filters: JobFilters;
  savedJobs: string[];
  recentSearches: string[];
  setSearch: (search: string) => void;
  setFilters: (filters: Partial<JobFilters>) => void;
  resetFilters: () => void;
  toggleSaved: (jobId: string) => void;
  isSaved: (jobId: string) => boolean;
  addRecentSearch: (query: string) => void;
  
  // Real Database Actions
  fetchJobs: () => Promise<void>;
  fetchApplications: (userId: string) => Promise<void>;
  fetchEmployerApplications: (employerId: string) => Promise<void>;
  updateApplicationStatus: (applicationId: string, status: 'applied' | 'viewed' | 'shortlisted' | 'hired' | 'rejected') => Promise<void>;
  applyToJob: (jobId: string, userId: string, note?: string) => Promise<void>;
  createJob: (newJob: Omit<Job, 'id' | 'postedAt' | 'employerId'>, employerId: string) => Promise<void>;
}

const defaultFilters: JobFilters = {
  search: '',
  areas: [],
  categories: [],
  shifts: [],
  payMin: 0,
  payMax: 2000,
  payType: 'all',
  maxDistance: 20,
  verifiedOnly: false,
  urgentOnly: false,
  postedWithin: 'all',
};

// Formatting helpers
const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

// DB row to Seeker camelCase mapping
const mapDbJobToJob = (dbJob: any): Job => ({
  id: dbJob.id,
  title: dbJob.title,
  company: dbJob.company,
  companyLogo: dbJob.company_logo || '🏢',
  category: dbJob.category,
  area: dbJob.area,
  distance: Number(dbJob.distance || 1.0),
  pay: dbJob.pay,
  payType: dbJob.pay_type,
  shift: dbJob.shift,
  shiftTime: dbJob.shift_time,
  description: dbJob.description,
  requirements: dbJob.requirements || [],
  whatToBring: dbJob.what_to_bring || [],
  slots: dbJob.slots || 1,
  slotsTotal: dbJob.slots_total || 1,
  postedAt: dbJob.created_at ? formatTimeAgo(dbJob.created_at) : 'Just now',
  isUrgent: dbJob.is_urgent || false,
  isVerified: dbJob.is_verified || false,
  isSameDay: dbJob.is_same_day || false,
  employerId: dbJob.employer_id || '',
  rating: Number(dbJob.rating || 4.0),
  reviewCount: dbJob.review_count || 0,
  lat: dbJob.lat,
  lng: dbJob.lng,
});

const mapDbAppToApp = (dbApp: any): Application => ({
  id: dbApp.id,
  jobId: dbApp.job_id,
  userId: dbApp.user_id,
  status: dbApp.status,
  note: dbApp.note || '',
  appliedAt: dbApp.applied_at ? formatTimeAgo(dbApp.applied_at) : 'Just now',
});

const MOCK_EMPLOYER_APPLICANTS: EmployerApplication[] = [
  { id: 'app_1', jobId: 'j3', jobTitle: 'Event Setup — Wedding Reception', userId: 'u1', name: 'Jagan K.', phone: '+91 98765 43210', area: 'Purasaiwakkam', trustScore: 4.2, isVerified: true, status: 'shortlisted', appliedAt: '2h ago', experience: 'College student, event setup experience' },
  { id: 'app_2', jobId: 'j3', jobTitle: 'Event Setup — Wedding Reception', userId: 'u2', name: 'Murugan S.', phone: '+91 98765 11111', area: 'Ambattur', trustScore: 3.8, isVerified: true, status: 'applied', appliedAt: '5h ago', experience: '5 years construction, catering helper' },
  { id: 'app_3', jobId: 'j3', jobTitle: 'Event Setup — Wedding Reception', userId: 'u3', name: 'Priya R.', phone: '+91 98765 22222', area: 'T.Nagar', trustScore: 4.5, isVerified: true, status: 'hired', appliedAt: '1d ago', experience: 'Hospitality diploma, 2 years hotel' },
  { id: 'app_4', jobId: 'j3', jobTitle: 'Event Setup — Wedding Reception', userId: 'u4', name: 'Ramesh V.', phone: '+91 98765 33333', area: 'Velachery', trustScore: 3.5, isVerified: false, status: 'applied', appliedAt: '2d ago', experience: 'General helper, reliable' },
  { id: 'app_5', jobId: 'j3', jobTitle: 'Event Setup — Wedding Reception', userId: 'u5', name: 'Lakshmi D.', phone: '+91 98765 44444', area: 'Anna Nagar', trustScore: 4.0, isVerified: true, status: 'applied', appliedAt: '3d ago', experience: 'Cooking experience, worked in canteen' },
];

export const useJobsStore = create<JobsState>((set, get) => ({
  jobs: [],
  applications: [],
  employerApplications: [],
  loading: false,
  filters: { ...defaultFilters },
  savedJobs: ['j3', 'j8'],
  recentSearches: ['delivery anna nagar', 'evening cashier', 'event helper'],
  
  setSearch: (search) =>
    set((state) => ({ filters: { ...state.filters, search } })),
  setFilters: (partial) =>
    set((state) => ({ filters: { ...state.filters, ...partial } })),
  resetFilters: () => set({ filters: { ...defaultFilters } }),
  toggleSaved: (jobId) =>
    set((state) => ({
      savedJobs: state.savedJobs.includes(jobId)
        ? state.savedJobs.filter((id) => id !== jobId)
        : [...state.savedJobs, jobId],
    })),
  isSaved: (jobId) => get().savedJobs.includes(jobId),
  addRecentSearch: (query) =>
    set((state) => ({
      recentSearches: [query, ...state.recentSearches.filter((q) => q !== query)].slice(0, 5),
    })),

  // Database actions
  fetchJobs: async () => {
    set({ loading: true });
    
    const client = supabase;
    if (!isSupabaseEnabled() || !client) {
      console.log('[JobsStore] Supabase not active. Using mock jobs.');
      set({ jobs: DEMO_JOBS, loading: false });
      return;
    }

    try {
      // Auto seed if empty
      await seedDatabaseIfEmpty(client);

      const { data, error } = await client
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        set({ jobs: data.map(mapDbJobToJob) });
      }
    } catch (err: any) {
      console.warn('[JobsStore] Failed to query PostgreSQL. Graceful mock fallback:', err.message);
      set({ jobs: DEMO_JOBS });
    } finally {
      set({ loading: false });
    }
  },

  fetchApplications: async (userId: string) => {
    const client = supabase;
    if (!isSupabaseEnabled() || !client) {
      set({ applications: DEMO_APPLICATIONS });
      return;
    }

    try {
      const { data, error } = await client
        .from('applications')
        .select('*')
        .eq('user_id', userId)
        .order('applied_at', { ascending: false });

      if (error) throw error;

      if (data) {
        set({ applications: data.map(mapDbAppToApp) });
      }
    } catch (err: any) {
      console.warn('[JobsStore] Applications fallback:', err.message);
      set({ applications: DEMO_APPLICATIONS });
    }
  },

  applyToJob: async (jobId: string, userId: string, note = '') => {
    const client = supabase;
    if (!isSupabaseEnabled() || !client) {
      console.log('[JobsStore] Mock applying to job:', jobId);
      const newApp: Application = {
        id: 'mock_a_' + Date.now(),
        jobId,
        userId,
        status: 'applied',
        appliedAt: 'Just now',
        note,
      };
      set((state) => ({
        applications: [newApp, ...state.applications],
      }));
      return;
    }

    try {
      const { error } = await client
        .from('applications')
        .insert({
          job_id: jobId,
          user_id: userId,
          note,
          status: 'applied',
        });

      if (error) throw error;
      
      // Update local state by fetching latest applications
      await get().fetchApplications(userId);
    } catch (err: any) {
      console.error('[JobsStore] Job application failed:', err.message);
      throw err;
    }
  },

  createJob: async (newJob, employerId) => {
    const client = supabase;
    if (!isSupabaseEnabled() || !client) {
      console.log('[JobsStore] Mock creating job:', newJob.title);
      const mockJob: Job = {
        ...newJob,
        id: 'mock_j_' + Date.now(),
        postedAt: 'Just now',
        employerId,
      };
      set((state) => ({
        jobs: [mockJob, ...state.jobs],
      }));
      return;
    }

    try {
      const dbRow = {
        title: newJob.title,
        company: newJob.company,
        company_logo: newJob.companyLogo,
        category: newJob.category,
        area: newJob.area,
        distance: newJob.distance,
        pay: newJob.pay,
        pay_type: newJob.payType,
        shift: newJob.shift,
        shift_time: newJob.shiftTime,
        description: newJob.description,
        requirements: newJob.requirements,
        what_to_bring: newJob.whatToBring,
        slots: newJob.slots,
        slots_total: newJob.slotsTotal,
        is_urgent: newJob.isUrgent,
        is_verified: newJob.isVerified,
        is_same_day: newJob.isSameDay,
        employer_id: employerId,
        rating: newJob.rating,
        review_count: newJob.reviewCount,
        lat: newJob.lat,
        lng: newJob.lng,
      };

      const { error } = await client
        .from('jobs')
        .insert(dbRow);

      if (error) throw error;

      // Refresh local jobs list
      await get().fetchJobs();
    } catch (err: any) {
      console.error('[JobsStore] Failed to post job to Supabase:', err.message);
      throw err;
    }
  },

  fetchEmployerApplications: async (employerId: string) => {
    const client = supabase;
    if (!isSupabaseEnabled() || !client) {
      console.log('[JobsStore] Supabase not active. Using mock employer applications.');
      set({ employerApplications: MOCK_EMPLOYER_APPLICANTS });
      return;
    }

    try {
      // Query applications where jobs.employer_id == employerId
      const { data, error } = await client
        .from('applications')
        .select(`
          id,
          job_id,
          user_id,
          status,
          note,
          applied_at,
          jobs!inner (
            id,
            title,
            employer_id
          ),
          profiles:user_id (
            id,
            name,
            phone,
            area,
            trust_score,
            is_verified
          )
        `)
        .eq('jobs.employer_id', employerId);

      if (error) throw error;

      if (data) {
        const mapped: EmployerApplication[] = (data as any[]).map((row: any) => ({
          id: row.id,
          jobId: row.job_id,
          jobTitle: row.jobs?.title || 'Unknown Job',
          userId: row.user_id,
          name: row.profiles?.name || 'Anonymous Seeker',
          phone: row.profiles?.phone || '',
          area: row.profiles?.area || 'Chennai',
          trustScore: Number(row.profiles?.trust_score || 4.0),
          isVerified: row.profiles?.is_verified || false,
          status: row.status,
          appliedAt: row.applied_at ? formatTimeAgo(row.applied_at) : 'Just now',
          experience: row.note || '',
        }));
        set({ employerApplications: mapped });
      }
    } catch (err: any) {
      console.warn('[JobsStore] Failed to fetch employer applications:', err.message);
      set({ employerApplications: MOCK_EMPLOYER_APPLICANTS });
    }
  },

  updateApplicationStatus: async (applicationId: string, status: 'applied' | 'viewed' | 'shortlisted' | 'hired' | 'rejected') => {
    const client = supabase;
    
    // Update local state first to be instant and responsive
    set((state) => ({
      employerApplications: state.employerApplications.map((app) =>
        app.id === applicationId ? { ...app, status } : app
      ),
    }));

    if (!isSupabaseEnabled() || !client) {
      console.log('[JobsStore] Offline: updated status in memory.');
      return;
    }

    try {
      const { error } = await client
        .from('applications')
        .update({ status })
        .eq('id', applicationId);

      if (error) throw error;
    } catch (err: any) {
      console.error('[JobsStore] Failed to update application status:', err.message);
    }
  },
}));
