# DSA FORGE

**Think. Build. Master DSA.**

A production-grade DSA learning platform designed to take developers from zero to advanced proficiency.

---

## Overview

DSA FORGE provides a structured learning path for mastering Data Structures and Algorithms. The platform emphasizes understanding over memorization, with a mandatory think-first approach before coding.

## Features

### Structured Learning Path
- 13 comprehensive modules covering foundational to advanced topics
- Progressive unlocking system ensuring proper knowledge building
- Module-specific topics and practice problems

### Problem-Solving System
- Real-world intuition for every problem
- Mandatory THINK section before coding
- Multi-language solutions (7 languages)
- Time and space complexity analysis

### Code Editor
- Monaco Editor integration
- Support for JavaScript, TypeScript, Python, Java, C++, Go, Rust
- Syntax highlighting with theme support

### Progress Tracking
- Module completion tracking
- Non-toxic streak system
- Personal statistics dashboard

### Authentication
- Google OAuth integration
- Email/Password authentication
- Secure session management

---

## Technology Stack

| Category | Technology |
|----------|------------|
| Frontend | Next.js 16, React 19, Tailwind CSS |
| UI Components | shadcn/ui |
| Code Editor | Monaco Editor |
| Backend | Next.js API Routes |
| Database | SQLite via Prisma |
| Authentication | NextAuth.js |
| State Management | Zustand |

---

## Installation

### Prerequisites
- Node.js 18+ or Bun runtime
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/dsa-forge.git
cd dsa-forge

# Install dependencies
bun install

# Configure environment
cp .env.example .env

# Initialize database
bun run db:push
bun run db:seed

# Start development server
bun run dev
```

---

## Configuration

### Environment Variables

```env
# Database
DATABASE_URL=file:./db/custom.db

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```

---

## Project Structure

```
dsa-forge/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── app/
│   │   ├── api/
│   │   └── page.tsx
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── store/
└── package.json
```

---

## Contact & Support

For inquiries and support: acontrol030@gmail.com

---

## License

This project is open source and community-driven.
