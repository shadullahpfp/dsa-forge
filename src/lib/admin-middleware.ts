import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ADMIN_EMAIL, ROLES } from '@/lib/config'
import { db } from '@/lib/db'

// Admin middleware - verifies admin role
export async function verifyAdmin(request: NextRequest): Promise<{ authorized: boolean; userId?: string; error?: string }> {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return { authorized: false, error: 'Unauthorized' }
    }

    // Single source of truth for admin check
    if (session.user.email !== ADMIN_EMAIL && session.user.role !== ROLES.ADMIN) {
      return { authorized: false, error: 'Admin access required' }
    }

    // Verify in database as well
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, email: true, role: true, isBlocked: true },
    })

    if (!user || user.isBlocked) {
      return { authorized: false, error: 'Account not found or blocked' }
    }

    if (user.email !== ADMIN_EMAIL && user.role !== ROLES.ADMIN) {
      return { authorized: false, error: 'Admin access required' }
    }

    return { authorized: true, userId: user.id }
  } catch (error) {
    console.error('Admin verification error:', error)
    return { authorized: false, error: 'Internal server error' }
  }
}

// Log admin actions
export async function logAdminAction(
  adminId: string,
  action: string,
  targetType: string,
  targetId: string | null,
  details: Record<string, unknown>
) {
  try {
    await db.auditLog.create({
      data: {
        adminId,
        action,
        targetType,
        targetId,
        details: JSON.stringify(details),
      },
    })
  } catch (error) {
    console.error('Failed to log admin action:', error)
  }
}

// Rate limiting for admin APIs (in-memory, for production use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 100 // 100 requests per minute

export function checkRateLimit(identifier: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(identifier)

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 }
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: RATE_LIMIT_MAX - entry.count }
}
