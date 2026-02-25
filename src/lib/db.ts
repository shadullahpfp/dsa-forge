import { PrismaClient } from '@prisma/client'
import path from 'path'

const requiredEnvs = ['DATABASE_URL', 'NEXTAUTH_SECRET', 'NEXTAUTH_URL']
if (process.env.NODE_ENV === 'production') {
  const missing = requiredEnvs.filter((v) => !process.env[v])
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

let dbUrl = process.env.DATABASE_URL
if (process.env.NODE_ENV === 'production') {
  if (!dbUrl || dbUrl.startsWith('file:./')) {
    const rawPath = dbUrl ? dbUrl.replace('file:./', '') : 'db/custom.db';
    dbUrl = `file://${path.join(process.cwd(), rawPath)}`
    console.log("STANDALONE OVERRIDE DATABASE URL: ", dbUrl)
  }
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: { url: dbUrl },
    },
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db