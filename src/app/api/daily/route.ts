import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let dailyChallenge = await db.dailyChallenge.findFirst({
      where: {
        date: {
          gte: today,
        },
      },
      include: {
        problem: {
          include: {
            module: {
              select: {
                id: true,
                title: true,
                order: true,
              },
            },
          },
        },
      },
    })

    if (!dailyChallenge) {
      const problems = await db.problem.findMany()
      if (problems.length === 0) {
        return NextResponse.json({ error: 'No problems available' }, { status: 404 })
      }

      const randomProblem = problems[Math.floor(Math.random() * problems.length)]

      dailyChallenge = await db.dailyChallenge.create({
        data: {
          problemId: randomProblem.id,
          date: today,
        },
        include: {
          problem: {
            include: {
              module: {
                select: {
                  id: true,
                  title: true,
                  order: true,
                },
              },
            },
          },
        },
      })
    }

    const problemData = dailyChallenge.problem
    const problem = {
      ...problemData,
      thinkSection: JSON.parse(problemData.thinkSection || '[]'),
      solution: JSON.parse(problemData.solution || '[]'),
      starterCode: JSON.parse(problemData.starterCode || '{}'),
      testCases: JSON.parse(problemData.testCases || '[]'),
      module: problemData.module,
    }

    return NextResponse.json({
      ...dailyChallenge,
      problem,
    })
  } catch (error) {
    console.error('Error fetching daily challenge:', error)
    return NextResponse.json({ error: 'Failed to fetch daily challenge' }, { status: 500 })
  }
}
