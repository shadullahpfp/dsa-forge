import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const problemId = searchParams.get('id')
    const moduleId = searchParams.get('moduleId')

    if (problemId) {
      const problem = await db.problem.findUnique({
        where: { id: problemId },
        include: {
          module: {
            select: { id: true, title: true, order: true },
          },
        },
      })

      if (!problem) {
        return NextResponse.json({ error: 'Problem not found' }, { status: 404 })
      }

      // Parse JSON fields
      const parsedProblem = {
        ...problem,
        thinkSection: JSON.parse(problem.thinkSection || '[]'),
        solution: JSON.parse(problem.solution || '[]'),
        starterCode: JSON.parse(problem.starterCode || '{}'),
        testCases: JSON.parse(problem.testCases || '[]'),
        hints: JSON.parse(problem.hints || '[]'),
        examples: JSON.parse(problem.examples || '[]'),
      }

      return NextResponse.json(parsedProblem)
    }

    const where = moduleId ? { moduleId } : {}
    const problems = await db.problem.findMany({
      where,
      orderBy: [{ moduleId: 'asc' }, { order: 'asc' }],
      include: {
        module: {
          select: { id: true, title: true, order: true },
        },
      },
    })

    return NextResponse.json({ problems })
  } catch (error) {
    console.error('Error fetching problems:', error)
    return NextResponse.json({ error: 'Failed to fetch problems' }, { status: 500 })
  }
}
