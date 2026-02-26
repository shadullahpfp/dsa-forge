import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ADMIN_EMAIL } from '@/lib/config'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const isAdmin = session?.user?.role === 'ADMIN' || session?.user?.email === ADMIN_EMAIL

    const modules = await db.module.findMany({
      orderBy: { order: 'asc' },
      include: {
        topics: {
          orderBy: { order: 'asc' },
        },
        problems: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            title: true,
            slug: true,
            difficulty: true,
            order: true,
          },
        },
      },
    })

    return NextResponse.json({ modules })
  } catch (error) {
    console.error('Error fetching modules:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}
