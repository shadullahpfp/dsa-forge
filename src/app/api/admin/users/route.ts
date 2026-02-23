import { NextRequest, NextResponse } from 'next/server'
import { verifyAdmin, logAdminAction, checkRateLimit } from '@/lib/admin-middleware'
import { db } from '@/lib/db'

// GET - List all users
export async function GET(request: NextRequest) {
  const verification = await verifyAdmin(request)
  
  if (!verification.authorized) {
    return NextResponse.json({ error: verification.error }, { status: 401 })
  }

  // Rate limiting
  const rateCheck = checkRateLimit(verification.userId!)
  if (!rateCheck.allowed) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''

    const where = search
      ? {
          OR: [
            { email: { contains: search } },
            { name: { contains: search } },
          ],
        }
      : {}

    const [users, total] = await Promise.all([
      db.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isBlocked: true,
          blockedAt: true,
          blockedReason: true,
          createdAt: true,
          lastActiveDate: true,
          streak: true,
          preferredLanguage: true,
          experienceLevel: true,
          _count: {
            select: { submissions: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.user.count({ where }),
    ])

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

// PATCH - Block/Unblock user
export async function PATCH(request: NextRequest) {
  const verification = await verifyAdmin(request)
  
  if (!verification.authorized) {
    return NextResponse.json({ error: verification.error }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { userId, action, reason } = body

    if (!userId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const targetUser = await db.user.findUnique({
      where: { id: userId },
      select: { email: true },
    })

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Prevent modifying the admin account
    if (targetUser.email === 'acontrol030@gmail.com') {
      return NextResponse.json({ error: 'Cannot modify admin account' }, { status: 403 })
    }

    let updatedUser

    if (action === 'block') {
      updatedUser = await db.user.update({
        where: { id: userId },
        data: {
          isBlocked: true,
          blockedAt: new Date(),
          blockedReason: reason || 'No reason provided',
        },
      })

      await logAdminAction(verification.userId!, 'BLOCK_USER', 'USER', userId, {
        reason: reason || 'No reason provided',
        userEmail: targetUser.email,
      })
    } else if (action === 'unblock') {
      updatedUser = await db.user.update({
        where: { id: userId },
        data: {
          isBlocked: false,
          blockedAt: null,
          blockedReason: null,
        },
      })

      await logAdminAction(verification.userId!, 'UNBLOCK_USER', 'USER', userId, {
        userEmail: targetUser.email,
      })
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    return NextResponse.json({
      message: `User ${action === 'block' ? 'blocked' : 'unblocked'} successfully`,
      user: updatedUser,
    })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

// DELETE - Delete user
export async function DELETE(request: NextRequest) {
  const verification = await verifyAdmin(request)
  
  if (!verification.authorized) {
    return NextResponse.json({ error: verification.error }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const targetUser = await db.user.findUnique({
      where: { id: userId },
      select: { email: true },
    })

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (targetUser.email === 'acontrol030@gmail.com') {
      return NextResponse.json({ error: 'Cannot delete admin account' }, { status: 403 })
    }

    await db.user.delete({
      where: { id: userId },
    })

    await logAdminAction(verification.userId!, 'DELETE_USER', 'USER', userId, {
      userEmail: targetUser.email,
    })

    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}
