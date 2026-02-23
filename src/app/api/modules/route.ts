import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
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
    return NextResponse.json({ error: 'Failed to fetch modules' }, { status: 500 })
  }
}
