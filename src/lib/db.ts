import { PrismaClient } from '@prisma/client'
import path from 'path'

const requiredEnvs = ['NEXTAUTH_SECRET', 'NEXTAUTH_URL'] // DATABASE_URL removed for SQLite deployment fallback
if (process.env.NODE_ENV === 'production') {
  const missing = requiredEnvs.filter((v) => !process.env[v])
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Fallback to SQLite if DATABASE_URL is not set
let dbUrl = process.env.DATABASE_URL || 'file:./dev.db'

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: { url: dbUrl },
    },
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db