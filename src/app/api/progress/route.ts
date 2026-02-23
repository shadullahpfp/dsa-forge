import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    const progress = await db.userProgress.findMany({
      where: { userId },
      include: {
        module: {
          select: {
            id: true,
            title: true,
            order: true,
          },
        },
      },
    })

    const submissions = await db.submission.findMany({
      where: { userId },
      select: {
        problemId: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    const solvedProblems = submissions.filter((s) => s.status === 'ACCEPTED')
    const uniqueSolved = new Set(solvedProblems.map((s) => s.problemId))

    return NextResponse.json({
      progress,
      stats: {
        totalSubmissions: submissions.length,
        solvedProblems: uniqueSolved.size,
        acceptedSubmissions: solvedProblems.length,
      },
    })
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, moduleId, completed, completedTopics } = body

    const existing = await db.userProgress.findUnique({
      where: {
        userId_moduleId: { userId, moduleId },
      },
    })

    if (existing) {
      const updated = await db.userProgress.update({
        where: { id: existing.id },
        data: {
          completed,
          completedTopics: JSON.stringify(completedTopics),
        },
      })
      return NextResponse.json(updated)
    }

    const progress = await db.userProgress.create({
      data: {
        userId,
        moduleId,
        completed,
        completedTopics: JSON.stringify(completedTopics || []),
      },
    })

    return NextResponse.json(progress)
  } catch (error) {
    console.error('Error updating progress:', error)
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 })
  }
}
