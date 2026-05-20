// QuickGig — Realistic Chennai Demo Data
// All data is realistic and Chennai-specific

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  category: string;
  area: string;
  distance: number;
  pay: number;
  payType: 'daily' | 'weekly' | 'monthly';
  shift: string;
  shiftTime: string;
  description: string;
  requirements: string[];
  whatToBring: string[];
  slots: number;
  slotsTotal: number;
  postedAt: string;
  isUrgent: boolean;
  isVerified: boolean;
  isSameDay: boolean;
  employerId: string;
  rating: number;
  reviewCount: number;
  lat: number;
  lng: number;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  role: 'seeker' | 'employer' | 'admin';
  area: string;
  avatar: string;
  trustScore: number;
  joinedAt: string;
  isVerified: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: 'applied' | 'viewed' | 'shortlisted' | 'hired' | 'rejected';
  appliedAt: string;
  note: string;
}

export interface Notification {
  id: string;
  type: 'job_match' | 'status_update' | 'urgent_nearby' | 'expiring' | 'payment' | 'new_applicant' | 'daily_digest';
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface Chat {
  id: string;
  jobId: string;
  seekerId: string;
  employerId: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
}

export const CHENNAI_AREAS = [
  'Purasaiwakkam', 'T.Nagar', 'Ambattur', 'Anna Nagar', 'Adyar',
  'Velachery', 'Nungambakkam', 'Vadapalani', 'Porur', 'Guindy',
  'Mylapore', 'Tambaram', 'Chromepet', 'Sholinganallur', 'Thiruvanmiyur',
  'Kilpauk', 'Egmore', 'Perambur', 'Royapettah', 'Kodambakkam',
  'Ashok Nagar', 'Besant Nagar', 'Alwarpet', 'Chetpet', 'Perungudi',
] as const;

export const JOB_CATEGORIES = [
  { id: 'delivery', name: 'Delivery', icon: '🛵', color: '#3B82F6' },
  { id: 'retail', name: 'Retail', icon: '🏪', color: '#8B5CF6' },
  { id: 'events', name: 'Events', icon: '🎉', color: '#F59E0B' },
  { id: 'data-entry', name: 'Data Entry', icon: '💻', color: '#22C55E' },
  { id: 'kitchen', name: 'Kitchen', icon: '🍳', color: '#EF4444' },
  { id: 'logistics', name: 'Logistics', icon: '📦', color: '#06B6D4' },
  { id: 'security', name: 'Security', icon: '🛡️', color: '#64748B' },
  { id: 'printing', name: 'Printing', icon: '🖨️', color: '#EC4899' },
  { id: 'cleaning', name: 'Cleaning', icon: '🧹', color: '#14B8A6' },
  { id: 'driving', name: 'Driving', icon: '🚗', color: '#F97316' },
  { id: 'teaching', name: 'Tutoring', icon: '📚', color: '#6366F1' },
  { id: 'construction', name: 'Construction', icon: '🏗️', color: '#A855F7' },
] as const;

export const SHIFTS = [
  { id: 'morning', name: 'Morning', icon: '🌅', time: '6 AM – 12 PM' },
  { id: 'evening', name: 'Evening', icon: '🌆', time: '12 PM – 6 PM' },
  { id: 'night', name: 'Night', icon: '🌙', time: '6 PM – 12 AM' },
  { id: 'weekend', name: 'Weekend', icon: '📅', time: 'Sat & Sun' },
] as const;

export const DEMO_JOBS: Job[] = [
  {
    id: 'j1',
    title: 'Delivery Partner — Bike Required',
    company: 'Chennai Fresh Mart',
    companyLogo: '🛵',
    category: 'delivery',
    area: 'Anna Nagar',
    distance: 1.2,
    pay: 650,
    payType: 'daily',
    shift: 'evening',
    shiftTime: '2 PM – 8 PM',
    description: 'We need reliable delivery partners with their own bike for food and grocery delivery in the Anna Nagar area. You will receive orders through the app and deliver them to customers within a 5km radius. Fuel allowance provided.',
    requirements: ['Own bike with valid license', 'Smartphone with data plan', 'Know Anna Nagar roads well'],
    whatToBring: ['Driving license', 'Your bike', 'Phone charger'],
    slots: 3,
    slotsTotal: 8,
    postedAt: '2h ago',
    isUrgent: true,
    isVerified: true,
    isSameDay: true,
    employerId: 'e1',
    rating: 4.5,
    reviewCount: 23,
    lat: 13.085,
    lng: 80.220,
  },
  {
    id: 'j2',
    title: 'Evening Cashier — Retail Shop',
    company: 'Sri Murugan Textiles',
    companyLogo: '🏪',
    category: 'retail',
    area: 'T.Nagar',
    distance: 2.8,
    pay: 500,
    payType: 'daily',
    shift: 'evening',
    shiftTime: '4 PM – 10 PM',
    description: 'Looking for a friendly cashier for our busy textile shop in T.Nagar. Basic billing knowledge required. We provide dinner. Great for students looking for evening shifts.',
    requirements: ['Basic math skills', 'Can speak Tamil & English', 'Presentable appearance'],
    whatToBring: ['ID proof', 'Comfortable shoes (standing work)'],
    slots: 1,
    slotsTotal: 2,
    postedAt: '1h ago',
    isUrgent: true,
    isVerified: true,
    isSameDay: false,
    employerId: 'e2',
    rating: 4.2,
    reviewCount: 15,
    lat: 13.040,
    lng: 80.233,
  },
  {
    id: 'j3',
    title: 'Event Setup — Wedding Reception',
    company: 'Kavitha Catering Services',
    companyLogo: '🎉',
    category: 'events',
    area: 'Velachery',
    distance: 4.5,
    pay: 800,
    payType: 'daily',
    shift: 'morning',
    shiftTime: '7 AM – 3 PM',
    description: 'Help needed for wedding reception setup and serving. Includes table arrangement, decoration assistance, and food serving. Lunch and snacks provided. Same-day cash payment.',
    requirements: ['Physical fitness', 'Punctuality is must', 'No experience needed'],
    whatToBring: ['White shirt', 'Black pants', 'Clean footwear'],
    slots: 8,
    slotsTotal: 12,
    postedAt: '3h ago',
    isUrgent: true,
    isVerified: true,
    isSameDay: true,
    employerId: 'e3',
    rating: 4.7,
    reviewCount: 42,
    lat: 12.980,
    lng: 80.220,
  },
  {
    id: 'j4',
    title: 'Data Entry Operator',
    company: 'NexGen InfoTech',
    companyLogo: '💻',
    category: 'data-entry',
    area: 'Guindy',
    distance: 3.1,
    pay: 12000,
    payType: 'monthly',
    shift: 'morning',
    shiftTime: '10 AM – 6 PM',
    description: 'Full-time data entry position for a growing IT company. Work involves entering customer data from forms into our CRM system. Air-conditioned office. Good typing speed required.',
    requirements: ['40+ WPM typing speed', 'Basic computer skills', 'English proficiency'],
    whatToBring: ['Resume', 'ID proof', 'Education certificates'],
    slots: 5,
    slotsTotal: 5,
    postedAt: '5h ago',
    isUrgent: false,
    isVerified: true,
    isSameDay: false,
    employerId: 'e4',
    rating: 4.0,
    reviewCount: 8,
    lat: 13.010,
    lng: 80.220,
  },
  {
    id: 'j5',
    title: 'Kitchen Helper — South Indian Restaurant',
    company: 'Saravana Bhavan Express',
    companyLogo: '🍳',
    category: 'kitchen',
    area: 'Mylapore',
    distance: 2.0,
    pay: 550,
    payType: 'daily',
    shift: 'morning',
    shiftTime: '5 AM – 1 PM',
    description: 'Experienced kitchen helper needed for morning shift. Duties include food preparation, washing, and keeping kitchen clean. Breakfast and lunch provided. Regular workers get bonus.',
    requirements: ['Kitchen experience preferred', 'Early morning availability', 'Hygiene conscious'],
    whatToBring: ['Apron (provided if needed)', 'Bathroom slippers'],
    slots: 2,
    slotsTotal: 3,
    postedAt: '4h ago',
    isUrgent: false,
    isVerified: true,
    isSameDay: true,
    employerId: 'e5',
    rating: 4.3,
    reviewCount: 31,
    lat: 13.033,
    lng: 80.267,
  },
  {
    id: 'j6',
    title: 'Warehouse Packer — Night Shift',
    company: 'QuickShip Logistics',
    companyLogo: '📦',
    category: 'logistics',
    area: 'Ambattur',
    distance: 5.2,
    pay: 700,
    payType: 'daily',
    shift: 'night',
    shiftTime: '8 PM – 4 AM',
    description: 'Pack and sort e-commerce orders for next-day delivery. Air-conditioned warehouse. Night shift allowance included. Free pickup shuttle from Ambattur bus stand.',
    requirements: ['Can lift up to 15kg', 'Attention to detail', 'Night shift OK'],
    whatToBring: ['ID proof', 'Comfortable clothing'],
    slots: 10,
    slotsTotal: 15,
    postedAt: '1h ago',
    isUrgent: true,
    isVerified: true,
    isSameDay: false,
    employerId: 'e6',
    rating: 4.1,
    reviewCount: 56,
    lat: 13.114,
    lng: 80.154,
  },
  {
    id: 'j7',
    title: 'Security Guard — Corporate Office',
    company: 'SecureForce India',
    companyLogo: '🛡️',
    category: 'security',
    area: 'Sholinganallur',
    distance: 8.0,
    pay: 15000,
    payType: 'monthly',
    shift: 'night',
    shiftTime: '10 PM – 6 AM',
    description: 'Night security guard needed for IT park office complex. CCTV monitoring, visitor log management, and periodic rounds. Training provided.',
    requirements: ['Age 25-45', 'Ex-servicemen preferred', 'Tamil & English spoken'],
    whatToBring: ['Aadhaar card', 'Police verification letter if available'],
    slots: 2,
    slotsTotal: 4,
    postedAt: '8h ago',
    isUrgent: false,
    isVerified: true,
    isSameDay: false,
    employerId: 'e7',
    rating: 3.9,
    reviewCount: 12,
    lat: 12.900,
    lng: 80.227,
  },
  {
    id: 'j8',
    title: 'T-Shirt Printing Assistant',
    company: 'PrintHub Chennai',
    companyLogo: '🖨️',
    category: 'printing',
    area: 'Purasaiwakkam',
    distance: 0.8,
    pay: 450,
    payType: 'daily',
    shift: 'evening',
    shiftTime: '3 PM – 9 PM',
    description: 'Help with heat press operations, screen print setups, and order packing. Perfect for students with printing knowledge. Learn new techniques on the job!',
    requirements: ['Interest in printing/design', 'Careful with equipment', 'Punctual'],
    whatToBring: ['Old clothes (ink stains possible)'],
    slots: 1,
    slotsTotal: 2,
    postedAt: '30m ago',
    isUrgent: true,
    isVerified: false,
    isSameDay: true,
    employerId: 'e8',
    rating: 4.6,
    reviewCount: 7,
    lat: 13.092,
    lng: 80.252,
  },
  {
    id: 'j9',
    title: 'Auto Driver — Pick & Drop Service',
    company: 'RideEasy Chennai',
    companyLogo: '🚗',
    category: 'driving',
    area: 'Kodambakkam',
    distance: 3.5,
    pay: 900,
    payType: 'daily',
    shift: 'morning',
    shiftTime: '6 AM – 2 PM',
    description: 'Drive company auto for office employee pick and drop service. Fixed daily route covering Kodambakkam, Vadapalani, and Ashok Nagar. Fuel provided by company.',
    requirements: ['Auto driving license', 'Good city knowledge', 'Clean driving record'],
    whatToBring: ['License', 'Aadhaar card'],
    slots: 3,
    slotsTotal: 5,
    postedAt: '6h ago',
    isUrgent: false,
    isVerified: true,
    isSameDay: false,
    employerId: 'e9',
    rating: 4.4,
    reviewCount: 19,
    lat: 13.047,
    lng: 80.221,
  },
  {
    id: 'j10',
    title: 'Tuition Teacher — Maths (Class 8-10)',
    company: 'BrightMinds Academy',
    companyLogo: '📚',
    category: 'teaching',
    area: 'Adyar',
    distance: 6.0,
    pay: 8000,
    payType: 'monthly',
    shift: 'evening',
    shiftTime: '4 PM – 7 PM',
    description: 'Teach Mathematics to Class 8-10 students at our coaching center. Small batch sizes (max 8 students). Teaching materials provided. Great opportunity for college students.',
    requirements: ['BTech/BSc student or graduate', 'Strong in maths', 'Patient with children'],
    whatToBring: ['Degree certificate or student ID', 'Resume'],
    slots: 2,
    slotsTotal: 2,
    postedAt: '12h ago',
    isUrgent: false,
    isVerified: true,
    isSameDay: false,
    employerId: 'e10',
    rating: 4.8,
    reviewCount: 35,
    lat: 13.006,
    lng: 80.257,
  },
  {
    id: 'j11',
    title: 'Construction Helper — Building Site',
    company: 'Kumar Builders',
    companyLogo: '🏗️',
    category: 'construction',
    area: 'Perambur',
    distance: 2.3,
    pay: 750,
    payType: 'daily',
    shift: 'morning',
    shiftTime: '7 AM – 5 PM',
    description: 'General construction helper needed for residential building project. Cement mixing, brick carrying, and site cleaning. Experienced workers get higher pay. Lunch and tea provided.',
    requirements: ['Physical fitness essential', 'Experience in construction preferred', 'Safety helmet provided'],
    whatToBring: ['Work boots', 'Water bottle'],
    slots: 6,
    slotsTotal: 10,
    postedAt: '2h ago',
    isUrgent: true,
    isVerified: true,
    isSameDay: true,
    employerId: 'e11',
    rating: 3.8,
    reviewCount: 28,
    lat: 13.106,
    lng: 80.237,
  },
  {
    id: 'j12',
    title: 'Office Cleaning Staff',
    company: 'CleanPro Services',
    companyLogo: '🧹',
    category: 'cleaning',
    area: 'Nungambakkam',
    distance: 1.5,
    pay: 400,
    payType: 'daily',
    shift: 'morning',
    shiftTime: '6 AM – 10 AM',
    description: 'Morning cleaning shift for IT office. Vacuum, mop, dust, and organize conference rooms. Equipment and cleaning supplies provided. Short shift perfect for extra income.',
    requirements: ['Reliability and punctuality', 'Basic cleaning experience', 'Honest and trustworthy'],
    whatToBring: ['ID proof'],
    slots: 3,
    slotsTotal: 4,
    postedAt: '45m ago',
    isUrgent: true,
    isVerified: true,
    isSameDay: true,
    employerId: 'e12',
    rating: 4.2,
    reviewCount: 14,
    lat: 13.060,
    lng: 80.246,
  },
];

export const DEMO_USER: User = {
  id: 'u1',
  name: 'Jagan',
  phone: '+91 98765 43210',
  role: 'seeker',
  area: 'Purasaiwakkam',
  avatar: '',
  trustScore: 4.2,
  joinedAt: '2025-11-15',
  isVerified: true,
};

export const DEMO_EMPLOYER: User = {
  id: 'e3',
  name: 'Kavitha',
  phone: '+91 99887 76655',
  role: 'employer',
  area: 'T.Nagar',
  avatar: '',
  trustScore: 4.7,
  joinedAt: '2025-08-20',
  isVerified: true,
};

export const DEMO_APPLICATIONS: Application[] = [
  { id: 'a1', jobId: 'j1', userId: 'u1', status: 'hired', appliedAt: '2h ago', note: 'I have my own bike and know Anna Nagar very well.' },
  { id: 'a2', jobId: 'j3', userId: 'u1', status: 'shortlisted', appliedAt: '5h ago', note: 'I have experience in event setup from college festivals.' },
  { id: 'a3', jobId: 'j8', userId: 'u1', status: 'applied', appliedAt: '1h ago', note: 'I own a heat press machine and have printing experience.' },
  { id: 'a4', jobId: 'j5', userId: 'u1', status: 'viewed', appliedAt: '3h ago', note: '' },
  { id: 'a5', jobId: 'j2', userId: 'u1', status: 'rejected', appliedAt: '1d ago', note: 'Available for evening shifts 4-10 PM.' },
];

export const DEMO_NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'status_update', title: 'You\'re hired! 🎉', body: 'Chennai Fresh Mart accepted your application for Delivery Partner', read: false, createdAt: '10m ago' },
  { id: 'n2', type: 'urgent_nearby', title: 'Urgent: 0.8km away ⚡', body: 'T-Shirt Printing Assistant — ₹450/day at PrintHub Chennai, Purasaiwakkam', read: false, createdAt: '30m ago' },
  { id: 'n3', type: 'status_update', title: 'Application Shortlisted', body: 'Kavitha Catering Services shortlisted you for Event Setup role', read: true, createdAt: '2h ago' },
  { id: 'n4', type: 'expiring', title: 'Job closing soon! ⏰', body: 'Evening Cashier at Sri Murugan Textiles closes in 2 hours', read: true, createdAt: '4h ago' },
  { id: 'n5', type: 'daily_digest', title: '5 new jobs in Purasaiwakkam', body: 'Morning: 2 • Evening: 2 • Night: 1 — Check them out!', read: true, createdAt: '8h ago' },
  { id: 'n6', type: 'job_match', title: 'Perfect match for you!', body: 'Data Entry Operator at NexGen InfoTech — ₹12,000/month in Guindy', read: true, createdAt: '1d ago' },
];

export const DEMO_EMPLOYER_APPLICANTS = [
  { id: 'u1', name: 'Jagan K.', area: 'Purasaiwakkam', trustScore: 4.2, experience: 'College student, event setup experience', phone: '+91 98765 43210', status: 'shortlisted' as const },
  { id: 'u2', name: 'Murugan S.', area: 'Ambattur', trustScore: 3.8, experience: '5 years construction, catering helper', phone: '+91 98765 11111', status: 'applied' as const },
  { id: 'u3', name: 'Priya R.', area: 'T.Nagar', trustScore: 4.5, experience: 'Hospitality diploma, 2 years hotel', phone: '+91 98765 22222', status: 'hired' as const },
  { id: 'u4', name: 'Ramesh V.', area: 'Velachery', trustScore: 3.5, experience: 'General helper, reliable', phone: '+91 98765 33333', status: 'applied' as const },
  { id: 'u5', name: 'Lakshmi D.', area: 'Anna Nagar', trustScore: 4.0, experience: 'Cooking experience, worked in canteen', phone: '+91 98765 44444', status: 'applied' as const },
];

export const ADMIN_STATS = {
  activeUsers: 12847,
  jobsToday: 342,
  applicationsToday: 1856,
  revenueToday: 48700,
  userGrowth: 12.5,
  jobGrowth: 8.3,
  applicationGrowth: 15.2,
  revenueGrowth: 22.1,
  weeklySignups: [
    { day: 'Mon', count: 245 },
    { day: 'Tue', count: 312 },
    { day: 'Wed', count: 289 },
    { day: 'Thu', count: 378 },
    { day: 'Fri', count: 421 },
    { day: 'Sat', count: 198 },
    { day: 'Sun', count: 156 },
  ],
  jobsByCategory: [
    { name: 'Delivery', value: 28 },
    { name: 'Events', value: 22 },
    { name: 'Kitchen', value: 18 },
    { name: 'Retail', value: 15 },
    { name: 'Logistics', value: 10 },
    { name: 'Other', value: 7 },
  ],
  revenueWeekly: [
    { day: 'Mon', revenue: 42000 },
    { day: 'Tue', revenue: 38000 },
    { day: 'Wed', revenue: 51000 },
    { day: 'Thu', revenue: 46000 },
    { day: 'Fri', revenue: 67000 },
    { day: 'Sat', revenue: 35000 },
    { day: 'Sun', revenue: 28000 },
  ],
  topAreas: [
    { area: 'T.Nagar', jobs: 78, applications: 423 },
    { area: 'Anna Nagar', jobs: 65, applications: 356 },
    { area: 'Velachery', jobs: 52, applications: 298 },
    { area: 'Guindy', jobs: 48, applications: 267 },
    { area: 'Ambattur', jobs: 41, applications: 198 },
  ],
  flaggedJobs: 7,
  pendingVerifications: 13,
  reportsToday: 4,
};

export const ADMIN_USERS = [
  { id: 'u1', name: 'Jagan K.', role: 'seeker' as const, area: 'Purasaiwakkam', phone: '+91 98765 43210', status: 'active' as const, joinedAt: '2025-11-15', lastActive: '2 min ago', applicationsCount: 12, isVerified: true },
  { id: 'u2', name: 'Murugan S.', role: 'seeker' as const, area: 'Ambattur', phone: '+91 98765 11111', status: 'active' as const, joinedAt: '2025-10-28', lastActive: '1 hr ago', applicationsCount: 34, isVerified: true },
  { id: 'e1', name: 'Chennai Fresh Mart', role: 'employer' as const, area: 'Anna Nagar', phone: '+91 98765 55555', status: 'active' as const, joinedAt: '2025-08-10', lastActive: '30 min ago', applicationsCount: 0, isVerified: true },
  { id: 'e3', name: 'Kavitha Catering', role: 'employer' as const, area: 'T.Nagar', phone: '+91 99887 76655', status: 'active' as const, joinedAt: '2025-08-20', lastActive: '5 min ago', applicationsCount: 0, isVerified: true },
  { id: 'u3', name: 'Priya R.', role: 'seeker' as const, area: 'T.Nagar', phone: '+91 98765 22222', status: 'active' as const, joinedAt: '2025-12-01', lastActive: '3 hr ago', applicationsCount: 8, isVerified: true },
  { id: 'u4', name: 'Ramesh V.', role: 'seeker' as const, area: 'Velachery', phone: '+91 98765 33333', status: 'suspended' as const, joinedAt: '2025-09-15', lastActive: '2 days ago', applicationsCount: 5, isVerified: false },
  { id: 'e6', name: 'QuickShip Logistics', role: 'employer' as const, area: 'Ambattur', phone: '+91 98765 66666', status: 'active' as const, joinedAt: '2025-07-05', lastActive: '15 min ago', applicationsCount: 0, isVerified: true },
  { id: 'u5', name: 'Lakshmi D.', role: 'seeker' as const, area: 'Anna Nagar', phone: '+91 98765 44444', status: 'active' as const, joinedAt: '2026-01-10', lastActive: '1 hr ago', applicationsCount: 18, isVerified: true },
];

export const DEMO_CHATS: Chat[] = [
  { id: 'c1', jobId: 'j1', seekerId: 'u1', employerId: 'e1', lastMessage: 'See you at 2 PM!', lastTimestamp: '10m ago', unreadCount: 0 },
  { id: 'c2', jobId: 'j3', seekerId: 'u1', employerId: 'e3', lastMessage: 'Are you available for tomorrow setup?', lastTimestamp: '1h ago', unreadCount: 1 },
];

export const DEMO_MESSAGES: ChatMessage[] = [
  { id: 'm1', chatId: 'c1', senderId: 'e1', text: 'Hi Jagan, thanks for applying!', timestamp: '2h ago', isRead: true },
  { id: 'm2', chatId: 'c1', senderId: 'u1', text: 'Happy to help. I have my bike ready.', timestamp: '1h ago', isRead: true },
  { id: 'm3', chatId: 'c1', senderId: 'e1', text: 'Great. See you at 2 PM!', timestamp: '10m ago', isRead: true },
  { id: 'm4', chatId: 'c2', senderId: 'e3', text: 'Hi Jagan, are you available for tomorrow setup?', timestamp: '1h ago', isRead: false },
];

export function formatPay(pay: number, payType: string): string {
  const formatted = pay >= 1000 ? `₹${(pay / 1000).toFixed(pay % 1000 === 0 ? 0 : 1)}k` : `₹${pay}`;
  const suffix = payType === 'daily' ? '/day' : payType === 'weekly' ? '/week' : '/month';
  return formatted + suffix;
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function getMatchScore(job: Job): number {
  let score = 0;
  if (job.distance < 2) score += 40;
  else if (job.distance < 5) score += 25;
  else score += 10;
  if (job.pay >= 600) score += 30;
  else if (job.pay >= 400) score += 20;
  else score += 10;
  if (['printing', 'data-entry', 'events'].includes(job.category)) score += 20;
  else score += 10;
  if (job.isUrgent) score += 10;
  return Math.min(score, 100);
}
