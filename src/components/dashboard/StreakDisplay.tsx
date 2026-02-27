'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Flame, Calendar, Award } from 'lucide-react'
import { useAuthStore } from '@/store/auth-store'
import { EDUCATION_SYMBOLS } from '@/lib/config'

export function StreakDisplay() {
  const { user } = useAuthStore()

  const getStreakMessage = (streak: number) => {
    if (streak === 0) return 'Start your streak today'
    if (streak < 3) return 'Good progress'
    if (streak < 7) return 'Consistent effort'
    if (streak < 14) return 'Strong dedication'
    if (streak < 30) return 'Impressive commitment'
    return 'Outstanding consistency'
  }

  const getStreakLevel = (streak: number) => {
    if (streak === 0) return EDUCATION_SYMBOLS.BEGINNER
    if (streak < 7) return EDUCATION_SYMBOLS.BEGINNER
    if (streak < 14) return EDUCATION_SYMBOLS.INTERMEDIATE
    return EDUCATION_SYMBOLS.ADVANCED
  }

  const streak = user?.streak || 0

  return (
    <Card className="overflow-hidden card-premium hover-elevate group">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-white text-2xl">
            {streak > 0 ? <Flame className="h-8 w-8" /> : <Calendar className="h-8 w-8" />}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">{streak}</span>
              <span className="text-lg text-muted-foreground">day streak</span>
              <span className="text-xl font-bold text-primary">{getStreakLevel(streak)}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{getStreakMessage(streak)}</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 7 }).map((_, i) => {
              const dayDate = new Date()
              dayDate.setDate(dayDate.getDate() - (6 - i))
              const isToday = i === 6
              const isCompleted = i < (streak % 7)

              return (
                <div
                  key={i}
                  className={`h-8 rounded-md flex items-center justify-center text-xs font-medium transition-colors ${isCompleted
                      ? 'bg-green-500/20 text-green-600 dark:text-green-400'
                      : isToday
                        ? 'bg-primary/10 text-primary border-2 border-dashed border-primary/30'
                        : 'bg-muted text-muted-foreground'
                    }`}
                >
                  {dayDate.toLocaleDateString('en', { weekday: 'short' }).charAt(0)}
                </div>
              )
            })}
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>6 days ago</span>
            <span>Today</span>
          </div>
        </div>

        {streak >= 7 && (
          <div className="mt-4 flex items-center gap-2 bg-primary/10 text-primary p-2 rounded-md">
            <Award className="h-4 w-4" />
            <span className="text-sm font-medium">Week streak achieved</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
