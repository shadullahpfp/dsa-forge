import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import { db } from './db'
import { ADMIN_EMAIL, ROLES } from './config'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/',
    error: '/auth/error',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) {
          return null
        }

        if (user.isBlocked) {
          throw new Error('Account has been blocked')
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password)

        if (!passwordMatch) {
          return null
        }

        // Admin role check - single source of truth
        const role = user.email === ADMIN_EMAIL ? ROLES.ADMIN : user.role

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: role,
          preferredLanguage: user.preferredLanguage,
          experienceLevel: user.experienceLevel,
          streak: user.streak,
          onboardingCompleted: user.onboardingCompleted,
          isBlocked: user.isBlocked,
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // For Google OAuth, check if user exists and is not blocked
      if (account?.provider === 'google') {
        const existingUser = await db.user.findUnique({
          where: { email: user.email || '' },
        })

        if (existingUser?.isBlocked) {
          return false
        }
      }
      return true
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        // Admin role determination - single source of truth
        const isAdmin = user.email === ADMIN_EMAIL

        token.id = user.id
        token.role = isAdmin ? ROLES.ADMIN : (user.role || ROLES.USER)
        token.preferredLanguage = user.preferredLanguage
        token.experienceLevel = user.experienceLevel
        token.streak = user.streak
        token.onboardingCompleted = user.onboardingCompleted
        token.isBlocked = user.isBlocked
      }

      // Update token when session is updated
      if (trigger === 'update' && session) {
        token = { ...token, ...session }
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.preferredLanguage = token.preferredLanguage as string
        session.user.experienceLevel = token.experienceLevel as string
        session.user.streak = token.streak as number
        session.user.onboardingCompleted = token.onboardingCompleted as boolean
        session.user.isBlocked = token.isBlocked as boolean
      }
      return session
    },
  },
  events: {
    async signIn({ user, account }) {
      // Update last active date
      await db.user.update({
        where: { id: user.id },
        data: { lastActiveDate: new Date() },
      })

      // For Google OAuth, ensure admin role is set correctly
      if (account?.provider === 'google' && user.email === ADMIN_EMAIL) {
        await db.user.update({
          where: { id: user.id },
          data: { role: ROLES.ADMIN },
        })
      }
    },
  },
}

// Admin check helper - use this in API routes
export function isAdmin(email: string | null | undefined): boolean {
  return email === ADMIN_EMAIL
}

// Server-side role verification
export async function verifyAdminRole(userId: string): Promise<boolean> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { email: true, role: true },
  })

  return user?.email === ADMIN_EMAIL || user?.role === ROLES.ADMIN
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      role: string
      preferredLanguage: string
      experienceLevel: string
      streak: number
      onboardingCompleted: boolean
      isBlocked?: boolean
    }
  }

  interface User {
    role: string
    preferredLanguage: string
    experienceLevel: string
    streak: number
    onboardingCompleted: boolean
    isBlocked?: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: string
    preferredLanguage: string
    experienceLevel: string
    streak: number
    onboardingCompleted: boolean
    isBlocked?: boolean
  }
}
