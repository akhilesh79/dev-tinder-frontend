import {
  MessageCircle,
  Zap,
  BookMarked,
  TrendingUp,
  Eye,
  Star,
  BadgeCheck,
  Infinity as InfinityIcon,
  ShieldCheck,
} from 'lucide-react';

export const VITE_API_BASE_URL = location.hostname === 'localhost' ? 'http://localhost:7777/' : '/api/';
export const skillOptions = [
  // Frontend Skills
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'html', label: 'HTML5' },
  { value: 'css', label: 'CSS3' },
  { value: 'tailwind', label: 'Tailwind CSS' },
  { value: 'bootstrap', label: 'Bootstrap' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },

  // Backend Skills
  { value: 'nodejs', label: 'Node.js' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },

  // Backend Frameworks
  { value: 'express', label: 'Express.js' },
  { value: 'django', label: 'Django' },
  { value: 'fastapi', label: 'FastAPI' },
  { value: 'spring', label: 'Spring Boot' },
  { value: 'laravel', label: 'Laravel' },
  { value: 'rails', label: 'Ruby on Rails' },

  // Databases
  { value: 'mongodb', label: 'MongoDB' },
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'redis', label: 'Redis' },
  { value: 'firebase', label: 'Firebase' },
  { value: 'elasticsearch', label: 'Elasticsearch' },

  // DevOps & Cloud
  { value: 'docker', label: 'Docker' },
  { value: 'kubernetes', label: 'Kubernetes' },
  { value: 'aws', label: 'AWS' },
  { value: 'gcp', label: 'Google Cloud' },
  { value: 'azure', label: 'Microsoft Azure' },
  { value: 'ci-cd', label: 'CI/CD (GitHub Actions, Jenkins)' },

  // Mobile Development
  { value: 'react-native', label: 'React Native' },
  { value: 'flutter', label: 'Flutter' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },

  // Other Skills
  { value: 'graphql', label: 'GraphQL' },
  { value: 'rest-api', label: 'REST APIs' },
  { value: 'git', label: 'Git/GitHub' },
  { value: 'testing', label: 'Testing (Jest, Mocha, Pytest)' },
  { value: 'agile', label: 'Agile/Scrum' },
];

export const plans = [
  {
    id: 'bronze',
    name: 'Bronze',
    tagline: 'Kickstart your dev journey',
    monthlyPrice: 99,
    annualPrice: 799,
    gradient: 'from-amber-700 via-orange-600 to-amber-500',
    glowColor: 'shadow-amber-500/20',
    accentColor: 'amber',
    icon: '🥉',
    popular: false,
    cta: '🚀 Start with Bronze',
    features: [
      { icon: MessageCircle, text: '20 messages per chat connection', available: true },
      { icon: BadgeCheck, text: 'Blue tick verification', available: false },
      { icon: TrendingUp, text: 'Basic profile visibility boost', available: true },
      { icon: Eye, text: 'See who viewed your profile', available: false },
      { icon: Star, text: 'Super likes (2 / day)', available: false },
      { icon: BookMarked, text: '5 saved course suggestions', available: true, comingSoon: true },
      { icon: Zap, text: 'Advanced developer filters', available: false },
    ],
  },
  {
    id: 'silver',
    name: 'Silver',
    tagline: 'Perfect for active networkers',
    monthlyPrice: 199,
    annualPrice: 1599,
    gradient: 'from-slate-600 via-zinc-400 to-slate-300',
    glowColor: 'shadow-indigo-500/25',
    accentColor: 'indigo',
    icon: '🥈',
    popular: true,
    cta: '⚡ Get Silver',
    features: [
      { icon: MessageCircle, text: '100 messages per chat connection', available: true },
      { icon: BadgeCheck, text: 'Blue tick verification', available: true },
      { icon: TrendingUp, text: 'Priority profile visibility boost', available: true },
      { icon: Eye, text: 'See who viewed your profile', available: true },
      { icon: Star, text: 'Super likes (5 / day)', available: false },
      { icon: BookMarked, text: '25 saved course suggestions', available: true, comingSoon: true },
      { icon: Zap, text: 'Advanced developer filters', available: false },
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    tagline: 'The ultimate DevTinder experience',
    monthlyPrice: 399,
    annualPrice: 2999,
    gradient: 'from-yellow-400 via-amber-400 to-orange-400',
    glowColor: 'shadow-yellow-500/25',
    accentColor: 'yellow',
    icon: '👑',
    popular: false,
    cta: '👑 Go Gold',
    features: [
      { icon: InfinityIcon, text: 'Unlimited messages per connection', available: true },
      { icon: BadgeCheck, text: 'Blue tick verification', available: true },
      { icon: TrendingUp, text: 'Maximum profile visibility boost', available: true },
      { icon: Eye, text: 'See who viewed your profile', available: true },
      { icon: Star, text: 'Unlimited super likes', available: true },
      { icon: BookMarked, text: 'Unlimited saved course suggestions', available: true, comingSoon: true },
      { icon: Zap, text: 'Advanced developer filters', available: true },
    ],
  },
];

export const highlights = [
  { icon: MessageCircle, label: 'Chat Messages', bronze: '20 / chat', silver: '100 / chat', gold: 'Unlimited' },
  { icon: BadgeCheck, label: 'Blue Tick', bronze: false, silver: true, gold: true },
  { icon: Eye, label: 'Profile viewers', bronze: false, silver: true, gold: true },
  { icon: Star, label: 'Super Likes', bronze: '2 / day', silver: '5 / day', gold: 'Unlimited' },
  { icon: BookMarked, label: 'Course Suggestions', bronze: '5', silver: '25', gold: 'Unlimited' },
  { icon: Zap, label: 'Dev Filters', bronze: false, silver: false, gold: true },
];

export const trustItems = [
  { label: 'Secured by Razorpay', Icon: ShieldCheck },
  { label: 'Instant activation', Icon: Zap },
];
