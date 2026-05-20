// QuickGig i18n — English + Tamil translations
export type Locale = 'en' | 'ta';

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // App
    'app.name': 'QuickGig',
    'app.tagline': 'Find work. Earn today.',

    // Onboarding
    'onboarding.slide1.title': 'Find daily work near you',
    'onboarding.slide1.desc': 'Browse hundreds of part-time and daily wage jobs in your neighbourhood',
    'onboarding.slide2.title': 'Get paid same day or weekly',
    'onboarding.slide2.desc': 'No middlemen, no commission cuts. Get your full pay directly.',
    'onboarding.slide3.title': 'Trusted by 500+ employers in Chennai',
    'onboarding.slide3.desc': 'Verified employers, honest pay, and real reviews from workers like you.',
    'onboarding.skip': 'Skip',
    'onboarding.next': 'Next',
    'onboarding.getStarted': 'Get Started',

    // Role
    'role.title': 'How do you want to use QuickGig?',
    'role.seeker': "I'm looking for work",
    'role.seekerDesc': 'Find part-time, daily wage, and flexible jobs near you',
    'role.employer': 'I want to hire',
    'role.employerDesc': 'Post jobs and find reliable temp staff in minutes',

    // Auth
    'auth.title': 'Enter your phone number',
    'auth.subtitle': "We'll send you a 6-digit OTP to verify",
    'auth.placeholder': '98765 43210',
    'auth.sendOtp': 'Send OTP',
    'auth.otpTitle': 'Verify OTP',
    'auth.otpSubtitle': 'Enter the 6-digit code sent to',
    'auth.verify': 'Verify',
    'auth.resend': 'Resend OTP',
    'auth.resendIn': 'Resend in',
    'auth.wrongNumber': 'Wrong number?',
    'auth.whatsapp': 'Verify via WhatsApp',

    // Home
    'home.greeting': 'Good evening',
    'home.search': 'Search jobs, areas, companies...',
    'home.urgent': "Today's Urgent",
    'home.nearYou': 'Near You',
    'home.bestPay': 'Best Pay Today',
    'home.recommended': 'Recommended for You',
    'home.viewAll': 'View all',

    // Categories
    'cat.delivery': 'Delivery',
    'cat.retail': 'Retail',
    'cat.events': 'Events',
    'cat.data-entry': 'Data Entry',
    'cat.kitchen': 'Kitchen',
    'cat.logistics': 'Logistics',
    'cat.security': 'Security',
    'cat.printing': 'Printing',

    // Job Card
    'job.slotsLeft': 'slots left',
    'job.verified': 'Verified',
    'job.urgent': 'Urgent',
    'job.sameDayPay': 'Same-day pay',
    'job.apply': 'Quick Apply',
    'job.save': 'Save',
    'job.saved': 'Saved',
    'job.details': 'View Details',
    'job.requirements': 'Requirements',
    'job.whatToBring': 'What to bring',
    'job.aboutJob': 'About this job',
    'job.moreFromEmployer': 'More from this employer',
    'job.applyNow': 'Apply Now',
    'job.whatsappApply': 'WhatsApp Apply',

    // Application
    'apply.title': 'Confirm Application',
    'apply.step1': 'Your Details',
    'apply.step2': 'Add a Note',
    'apply.step3': 'Confirm Shift',
    'apply.step4': 'Done!',
    'apply.note': 'Add a note to the employer (optional)',
    'apply.notePlaceholder': 'Tell the employer why you are a good fit...',
    'apply.confirm': 'Confirm & Apply',
    'apply.success': "You've applied! 🎉",
    'apply.successDesc': 'The employer will review your application soon.',
    'apply.trackStatus': 'Track Status',

    // Applications
    'apps.title': 'My Applications',
    'apps.active': 'Active',
    'apps.hired': 'Hired',
    'apps.rejected': 'Rejected',
    'apps.applied': 'Applied',
    'apps.viewed': 'Viewed',
    'apps.shortlisted': 'Shortlisted',
    'apps.earnings': 'This week you could earn',
    'apps.reapply': 'Reapply',

    // Saved
    'saved.title': 'Saved Jobs',
    'saved.empty': 'No saved jobs yet',
    'saved.emptyDesc': 'Tap the heart icon on any job to save it here',
    'saved.expiring': 'Closes in 2 hours!',

    // Earnings
    'earnings.title': 'Earnings',
    'earnings.thisMonth': 'This Month',
    'earnings.completed': 'Jobs Completed',
    'earnings.avgDaily': 'Avg Daily Rate',
    'earnings.share': 'Share Earnings Card',

    // Employer
    'employer.dashboard': 'Dashboard',
    'employer.postJob': 'Post a Job',
    'employer.activeJobs': 'Active Jobs',
    'employer.applicants': 'Applicants',
    'employer.views': 'Views',
    'employer.hiredWeek': 'Hired this week',
    'employer.step1': 'Basic Info',
    'employer.step2': 'Pay & Shift',
    'employer.step3': 'Location & Details',
    'employer.step4': 'Review & Post',
    'employer.postSuccess': 'Your job is live! 🎉',
    'employer.postSuccessDesc': 'Expect applicants within 30 minutes',

    // Applicant Management
    'applicant.shortlist': 'Shortlist',
    'applicant.reject': 'Reject',
    'applicant.message': 'Message',
    'applicant.hire': 'Mark as Hired',
    'applicant.whatsapp': 'WhatsApp',

    // Profile
    'profile.title': 'Profile',
    'profile.trustScore': 'Trust Score',
    'profile.skills': 'Skills',
    'profile.availability': 'Availability',
    'profile.shareProfile': 'Share Profile',
    'profile.editProfile': 'Edit Profile',

    // Settings
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.darkMode': 'Dark Mode',
    'settings.notifications': 'Notifications',
    'settings.area': 'Area Preferences',
    'settings.account': 'Account',
    'settings.deleteAccount': 'Delete Account',
    'settings.privacy': 'Privacy Policy',
    'settings.terms': 'Terms of Service',
    'settings.help': 'Help & FAQ',
    'settings.refer': 'Refer a Friend',
    'settings.logout': 'Logout',

    // Notifications
    'notif.title': 'Notifications',
    'notif.empty': 'No notifications yet',
    'notif.markRead': 'Mark all as read',

    // Admin
    'admin.overview': 'Overview',
    'admin.users': 'Users',
    'admin.jobs': 'Jobs',
    'admin.analytics': 'Analytics',
    'admin.moderation': 'Moderation',
    'admin.activeUsers': 'Active Users',
    'admin.jobsToday': 'Jobs Today',
    'admin.appsToday': 'Applications Today',
    'admin.revenue': 'Revenue Today',

    // Nav
    'nav.home': 'Home',
    'nav.search': 'Search',
    'nav.applications': 'Applications',
    'nav.saved': 'Saved',
    'nav.profile': 'Profile',
    'nav.dashboard': 'Dashboard',
    'nav.postJob': 'Post Job',
    'nav.applicants': 'Applicants',
    'nav.earnings': 'Earnings',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.retry': 'Retry',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.done': 'Done',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.reset': 'Reset',
    'common.apply': 'Apply',
    'common.search': 'Search',
    'common.noResults': 'No results found',
  },
  ta: {
    // App
    'app.name': 'QuickGig',
    'app.tagline': 'வேலை கண்டுபிடி. இன்றே சம்பாதி.',

    // Onboarding
    'onboarding.slide1.title': 'உங்கள் அருகில் தினசரி வேலை கண்டுபிடியுங்கள்',
    'onboarding.slide1.desc': 'உங்கள் பகுதியில் நூற்றுக்கணக்கான பகுதி நேர மற்றும் தினசரி வேலைகளை பாருங்கள்',
    'onboarding.slide2.title': 'அன்றே அல்லது வாரம் சம்பளம் பெறுங்கள்',
    'onboarding.slide2.desc': 'இடைத்தரகர்கள் இல்லை, கமிஷன் கட்டணம் இல்லை. முழு சம்பளம் நேரடியாக உங்களுக்கே.',
    'onboarding.slide3.title': 'சென்னையில் 500+ முதலாளிகள் நம்புகிறார்கள்',
    'onboarding.slide3.desc': 'சரிபார்க்கப்பட்ட முதலாளிகள், நேர்மையான ஊதியம், உண்மையான மதிப்பாய்வுகள்.',
    'onboarding.skip': 'தவிர்',
    'onboarding.next': 'அடுத்து',
    'onboarding.getStarted': 'தொடங்குவோம்',

    // Role
    'role.title': 'QuickGig-ஐ எப்படி பயன்படுத்த விரும்புகிறீர்கள்?',
    'role.seeker': 'நான் வேலை தேடுகிறேன்',
    'role.seekerDesc': 'உங்கள் அருகில் பகுதி நேர, தினசரி மற்றும் நெகிழ்வான வேலைகளை கண்டுபிடியுங்கள்',
    'role.employer': 'நான் பணியமர்த்த விரும்புகிறேன்',
    'role.employerDesc': 'வேலைகளை போஸ்ட் செய்து நிமிடங்களில் நம்பகமான ஊழியர்களை கண்டுபிடியுங்கள்',

    // Auth
    'auth.title': 'உங்கள் போன் எண்ணை உள்ளிடவும்',
    'auth.subtitle': 'சரிபார்க்க 6 இலக்க OTP அனுப்புவோம்',
    'auth.placeholder': '98765 43210',
    'auth.sendOtp': 'OTP அனுப்பு',
    'auth.otpTitle': 'OTP சரிபார்க்கவும்',
    'auth.otpSubtitle': 'அனுப்பப்பட்ட 6 இலக்க குறியீட்டை உள்ளிடவும்',
    'auth.verify': 'சரிபார்',
    'auth.resend': 'மீண்டும் OTP அனுப்பு',
    'auth.resendIn': 'மீண்டும் அனுப்ப',
    'auth.wrongNumber': 'தவறான எண்?',
    'auth.whatsapp': 'WhatsApp மூலம் சரிபார்',

    // Home
    'home.greeting': 'நல்வணக்கம்',
    'home.search': 'வேலைகள், பகுதிகள் தேடவும்...',
    'home.urgent': 'இன்றைய அவசரம்',
    'home.nearYou': 'உங்கள் அருகில்',
    'home.bestPay': 'சிறந்த சம்பளம்',
    'home.recommended': 'உங்களுக்கு பரிந்துரை',
    'home.viewAll': 'அனைத்தையும் காண்',

    // Categories
    'cat.delivery': 'டெலிவரி',
    'cat.retail': 'கடை',
    'cat.events': 'நிகழ்வுகள்',
    'cat.data-entry': 'டேட்டா என்ட்ரி',
    'cat.kitchen': 'சமையல்',
    'cat.logistics': 'லாஜிஸ்டிக்ஸ்',
    'cat.security': 'பாதுகாப்பு',
    'cat.printing': 'அச்சு',

    // Nav
    'nav.home': 'முகப்பு',
    'nav.search': 'தேடல்',
    'nav.applications': 'விண்ணப்பங்கள்',
    'nav.saved': 'சேமித்தவை',
    'nav.profile': 'சுயவிவரம்',
    'nav.dashboard': 'டாஷ்போர்ட்',
    'nav.postJob': 'வேலை போஸ்ட்',
    'nav.applicants': 'விண்ணப்பதாரர்கள்',
    'nav.earnings': 'வருமானம்',

    // Job Card
    'job.slotsLeft': 'இடங்கள் உள்ளன',
    'job.verified': 'சரிபார்க்கப்பட்டது',
    'job.urgent': 'அவசரம்',
    'job.sameDayPay': 'அன்றே சம்பளம்',
    'job.apply': 'உடனடி விண்ணப்பம்',
    'job.save': 'சேமி',
    'job.saved': 'சேமிக்கப்பட்டது',
    'job.details': 'விவரங்கள் காண்',
    'job.requirements': 'தேவைகள்',
    'job.whatToBring': 'என்ன கொண்டு வர வேண்டும்',
    'job.aboutJob': 'இந்த வேலை பற்றி',
    'job.moreFromEmployer': 'இந்த முதலாளியிடம் மேலும்',
    'job.applyNow': 'இப்போது விண்ணப்பி',
    'job.whatsappApply': 'WhatsApp விண்ணப்பம்',

    // Application
    'apply.title': 'விண்ணப்பத்தை உறுதிப்படுத்து',
    'apply.confirm': 'உறுதிப்படுத்தி விண்ணப்பி',
    'apply.success': 'விண்ணப்பித்துவிட்டீர்கள்! 🎉',
    'apply.successDesc': 'முதலாளி உங்கள் விண்ணப்பத்தை விரைவில் பரிசீலிப்பார்.',

    // Applications
    'apps.title': 'என் விண்ணப்பங்கள்',
    'apps.active': 'செயலில்',
    'apps.hired': 'பணியமர்த்தப்பட்டது',
    'apps.rejected': 'நிராகரிக்கப்பட்டது',
    'apps.applied': 'விண்ணப்பிக்கப்பட்டது',
    'apps.viewed': 'பார்க்கப்பட்டது',
    'apps.shortlisted': 'குறுக்குப்பட்டியல்',

    // Saved
    'saved.title': 'சேமித்த வேலைகள்',
    'saved.empty': 'சேமித்த வேலைகள் இல்லை',

    // Settings
    'settings.title': 'அமைப்புகள்',
    'settings.language': 'மொழி',
    'settings.darkMode': 'டார்க் மோட்',
    'settings.notifications': 'அறிவிப்புகள்',
    'settings.logout': 'வெளியேறு',

    // Employer
    'employer.dashboard': 'டாஷ்போர்ட்',
    'employer.postJob': 'வேலை போஸ்ட் செய்',
    'employer.activeJobs': 'செயலில் உள்ள வேலைகள்',
    'employer.applicants': 'விண்ணப்பதாரர்கள்',
    'employer.postSuccess': 'உங்கள் வேலை நேரலை! 🎉',
    'employer.postSuccessDesc': '30 நிமிடங்களுக்குள் விண்ணப்பதாரர்களை எதிர்பாருங்கள்',

    // Notifications
    'notif.title': 'அறிவிப்புகள்',
    'notif.empty': 'அறிவிப்புகள் இல்லை',

    // Profile
    'profile.title': 'சுயவிவரம்',
    'profile.trustScore': 'நம்பகத் தரம்',

    // Common
    'common.loading': 'ஏற்றுகிறது...',
    'common.error': 'ஏதோ தவறு நடந்துவிட்டது',
    'common.retry': 'மீண்டும் முயற்சி',
    'common.cancel': 'ரத்து',
    'common.close': 'மூடு',
    'common.back': 'பின்',
    'common.next': 'அடுத்து',
    'common.done': 'முடிந்தது',
    'common.save': 'சேமி',
    'common.filter': 'வடிகட்டி',
    'common.reset': 'மீட்டமை',
    'common.apply': 'பயன்படுத்து',
    'common.search': 'தேடல்',
    'common.noResults': 'முடிவுகள் இல்லை',

    // Admin
    'admin.overview': 'கண்ணோட்டம்',
    'admin.users': 'பயனர்கள்',
    'admin.jobs': 'வேலைகள்',
    'admin.analytics': 'பகுப்பாய்வு',
    'admin.moderation': 'மதிப்பாய்வு',
    'admin.activeUsers': 'செயலில் உள்ள பயனர்கள்',
    'admin.jobsToday': 'இன்றைய வேலைகள்',
    'admin.appsToday': 'இன்றைய விண்ணப்பங்கள்',
    'admin.revenue': 'இன்றைய வருவாய்',
  },
};

export function t(key: string, locale: Locale = 'en'): string {
  return translations[locale][key] || translations['en'][key] || key;
}

export default translations;
