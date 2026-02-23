// ================================================
// DSA FORGE - PRODUCTION CONFIGURATION
// ================================================

// Admin Configuration
export const ADMIN_EMAIL = 'acontrol030@gmail.com'

// Contact & Support
export const SUPPORT_EMAIL = 'acontrol030@gmail.com'

// Education Level Symbols (CRITICAL - Use ONLY these)
export const EDUCATION_SYMBOLS = {
  BEGINNER: '●',
  INTERMEDIATE: '▲',
  ADVANCED: '■',
} as const

// Role System
export const ROLES = {
  USER: 'USER',
  CONTRIBUTOR: 'CONTRIBUTOR',
  ADMIN: 'ADMIN',
} as const

// Experience Level Labels
export const EXPERIENCE_LABELS = {
  BEGINNER: `Beginner ${EDUCATION_SYMBOLS.BEGINNER}`,
  INTERMEDIATE: `Intermediate ${EDUCATION_SYMBOLS.INTERMEDIATE}`,
  ADVANCED: `Advanced ${EDUCATION_SYMBOLS.ADVANCED}`,
} as const

// Difficulty Labels
export const DIFFICULTY_LABELS = {
  EASY: `Easy ${EDUCATION_SYMBOLS.BEGINNER}`,
  MEDIUM: `Medium ${EDUCATION_SYMBOLS.INTERMEDIATE}`,
  HARD: `Hard ${EDUCATION_SYMBOLS.ADVANCED}`,
} as const

// Site Configuration
export const SITE_CONFIG = {
  name: 'DSA FORGE',
  tagline: 'Think. Build. Master DSA.',
  description: 'A production-grade DSA learning platform.',
  url: 'https://dsaforge.dev',
}

// Navigation Links
export const NAV_LINKS = [
  { label: 'Docs', href: '/docs' },
  { label: 'About', href: '/about' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
]

// Programming Languages
export const PROGRAMMING_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
] as const

// Feature Flags
export const FEATURES = {
  maintenanceMode: false,
  allowSignups: true,
  allowGoogleOAuth: true,
  allowEmailPassword: true,
}
