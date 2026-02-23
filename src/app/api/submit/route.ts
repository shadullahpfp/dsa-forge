import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

function simulateSubmission(code: string, language: string, testCases: { input: string; expectedOutput: string }[]): {
  status: 'ACCEPTED' | 'WRONG_ANSWER' | 'TIME_LIMIT_EXCEEDED' | 'MEMORY_LIMIT_EXCEEDED' | 'COMPILATION_ERROR' | 'RUNTIME_ERROR'
  testCasesPassed: number
  totalTestCases: number
  executionTime: number
  memoryUsed: number
} {
  const totalTestCases = testCases.length || 5
  const testCasesPassed = totalTestCases
  const executionTime = Math.floor(Math.random() * 200) + 20
  const memoryUsed = Math.floor(Math.random() * 50000) + 5000

  if (code.includes('syntax error')) {
    return { status: 'COMPILATION_ERROR', testCasesPassed: 0, totalTestCases, executionTime: 0, memoryUsed: 0 }
  }
  if (code.includes('infinite loop')) {
    return { status: 'TIME_LIMIT_EXCEEDED', testCasesPassed: Math.floor(totalTestCases / 2), totalTestCases, executionTime: 5000, memoryUsed }
  }
  if (code.includes('memory leak')) {
    return { status: 'MEMORY_LIMIT_EXCEEDED', testCasesPassed: Math.floor(totalTestCases / 3), totalTestCases, executionTime, memoryUsed: 500000 }
  }
  if (code.includes('runtime error')) {
    return { status: 'RUNTIME_ERROR', testCasesPassed: Math.floor(totalTestCases / 2), totalTestCases, executionTime, memoryUsed }
  }
  if (code.includes('wrong answer')) {
    return { status: 'WRONG_ANSWER', testCasesPassed: Math.floor(totalTestCases * 0.6), totalTestCases, executionTime, memoryUsed }
  }

  return { status: 'ACCEPTED', testCasesPassed: totalTestCases, totalTestCases, executionTime, memoryUsed }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, problemId, code, language, testCases } = body

    if (!userId || !problemId || !code) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify problem exists
    const problem = await db.problem.findUnique({ where: { id: problemId } })
    if (!problem) {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 })
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))
    const result = simulateSubmission(code, language, testCases || [])

    const submission = await db.submission.create({
      data: {
        userId,
        problemId,
        code,
        language,
        status: result.status,
        executionTime: result.executionTime,
        memoryUsed: result.memoryUsed,
        testCasesPassed: result.testCasesPassed,
        totalTestCases: result.totalTestCases,
      },
    })

    // Update streak on accepted submission
    if (result.status === 'ACCEPTED') {
      const user = await db.user.findUnique({
        where: { id: userId },
        select: { lastActiveDate: true, streak: true },
      })

      if (user) {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        let newStreak = 1

        if (user.lastActiveDate) {
          const lastActive = new Date(user.lastActiveDate)
          lastActive.setHours(0, 0, 0, 0)
          const diffDays = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24))
          newStreak = diffDays === 1 ? user.streak + 1 : diffDays === 0 ? user.streak : 1
        }

        await db.user.update({
          where: { id: userId },
          data: { streak: newStreak, lastActiveDate: new Date() },
        })
      }
    }

    return NextResponse.json({
      ...submission,
      testCasesPassed: result.testCasesPassed,
      totalTestCases: result.totalTestCases,
    })
  } catch (error) {
    console.error('Error submitting solution:', error)
    return NextResponse.json({ error: 'Failed to submit solution' }, { status: 500 })
  }
}
