'use client';

import { createClient } from '@supabase/supabase-js';
import { DEMO_JOBS } from '@/lib/demo-data';

// Helper to check if credentials are valid and not placeholder values
export const isSupabaseEnabled = (): boolean => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  return !!(
    url && 
    key && 
    url !== 'your_supabase_url_here' && 
    key !== 'your_supabase_anon_key_here' &&
    url.startsWith('https://')
  );
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Initialize client only if keys are present
export const supabase = isSupabaseEnabled()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    })
  : null;

// Seed database with beautiful Chennai data if it is empty
export const seedDatabaseIfEmpty = async (supabaseClient: any) => {
  try {
    const { count, error } = await supabaseClient
      .from('jobs')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.warn('[Supabase Seed] Could not query jobs table. Schema might not be loaded yet:', error.message);
      return;
    }

    if (count === 0) {
      console.log('[Supabase Seed] Jobs table is empty. Seeding Chennai demo jobs...');
      
      const jobsToInsert = DEMO_JOBS.map(job => ({
        title: job.title,
        company: job.company,
        company_logo: job.companyLogo,
        category: job.category,
        area: job.area,
        distance: job.distance,
        pay: job.pay,
        pay_type: job.payType,
        shift: job.shift,
        shift_time: job.shiftTime,
        description: job.description,
        requirements: job.requirements,
        what_to_bring: job.whatToBring,
        slots: job.slots,
        slots_total: job.slotsTotal,
        is_urgent: job.isUrgent,
        is_verified: job.isVerified,
        is_same_day: job.isSameDay,
        employer_id: null, // Seed jobs are public template gigs
        rating: job.rating,
        review_count: job.reviewCount,
        lat: job.lat,
        lng: job.lng
      }));

      const { error: insertError } = await supabaseClient
        .from('jobs')
        .insert(jobsToInsert);

      if (insertError) {
        console.error('[Supabase Seed] Insert failed:', insertError.message);
      } else {
        console.log('[Supabase Seed] Successfully seeded 12 Chennai jobs!');
      }
    } else {
      console.log('[Supabase Seed] Database already contains jobs. Skipping seed.');
    }
  } catch (err) {
    console.error('[Supabase Seed] Unexpected error:', err);
  }
};
