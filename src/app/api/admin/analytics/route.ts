import { NextRequest, NextResponse } from 'next/server'
import { verifyAdmin, checkRateLimit } from '@/lib/admin-middleware'
import { db } from '@/lib/db'

// GET - Admin analytics
export async function GET(request: NextRequest) {
  const verification = await verifyAdmin(request)
  
  if (!verification.authorized) {
    return NextResponse.json({ error: verification.error }, { status: 401 })
  }

  const rateCheck = checkRateLimit(verification.userId!)
  if (!rateCheck.allowed) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }

  try {
    // Get overall stats
    const [
      totalUsers,
      activeUsersToday,
      totalSubmissions,
      acceptedSubmissions,
      totalProblems,
      totalModules,
      recentSignups,
    ] = await Promise.all([
      // Total users
      db.user.count(),
      
      // Active users today
      db.user.count({
        where: {
          lastActiveDate: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
      
      // Total submissions
      db.submission.count(),
      
      // Accepted submissions
      db.submission.count({
        where: { status: 'ACCEPTED' },
      }),
      
      // Total problems
      db.problem.count(),
      
      // Total modules
      db.module.count(),
      
      // Recent signups (last 7 days)
      db.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),
    ])

    // Submissions by day (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const submissions = await db.submission.findMany({
      where: {
        createdAt: { gte: sevenDaysAgo },
      },
      select: {
        createdAt: true,
        status: true,
      },
    })

    // Group by day
    const submissionsByDay = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000)
      const dayStart = new Date(date.setHours(0, 0, 0, 0))
      const dayEnd = new Date(date.setHours(23, 59, 59, 999))
      
      const daySubmissions = submissions.filter(
        s => s.createdAt >= dayStart && s.createdAt <= dayEnd
      )
      
      return {
        date: dayStart.toISOString().split('T')[0],
        total: daySubmissions.length,
        accepted: daySubmissions.filter(s => s.status === 'ACCEPTED').length,
      }
    })

    // Top languages
    const languageStats = await db.submission.groupBy({
      by: ['language'],
      _count: true,
      orderBy: { _count: { language: 'desc' } },
      take: 5,
    })

    // Problem difficulty distribution
    const difficultyStats = await db.problem.groupBy({
      by: ['difficulty'],
      _count: true,
    })

    return NextResponse.json({
      overview: {
        totalUsers,
        activeUsersToday,
        totalSubmissions,
        acceptedSubmissions,
        acceptanceRate: totalSubmissions > 0 
          ? Math.round((acceptedSubmissions / totalSubmissions) * 100) 
          : 0,
        totalProblems,
        totalModules,
        recentSignups,
      },
      submissionsByDay,
      languageStats: languageStats.map(l => ({
        language: l.language,
        count: l._count,
      })),
      difficultyStats: difficultyStats.map(d => ({
        difficulty: d.difficulty,
        count: d._count,
      })),
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}
