'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowRight, Zap } from 'lucide-react'
import { useProblemStore, type Problem } from '@/store/problem-store'
import { useUIStore } from '@/store/ui-store'
import { getDifficultySymbol, getDifficultyColor, getDifficultyBgColor } from '@/lib/difficulty'

export function DailyChallengeCard() {
  const { dailyChallenge } = useProblemStore()
  const { setCurrentView, setCurrentProblemId, setThinkModalOpen } = useUIStore()

  const handleStartChallenge = () => {
    if (dailyChallenge?.problem) {
      setCurrentProblemId(dailyChallenge.problem.id)
      setCurrentView('problem')
      setThinkModalOpen(true)
    }
  }

  if (!dailyChallenge?.problem) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Daily Challenge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No daily challenge available</p>
            <p className="text-sm mt-1">Check back later!</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const problem = dailyChallenge.problem as Problem
  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Card className="overflow-hidden border-primary/20">
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold">Daily Challenge</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {formattedDate}
          </div>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold">{problem.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {problem.description.substring(0, 150)}...
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className={`${getDifficultyBgColor(problem.difficulty)} ${getDifficultyColor(problem.difficulty)}`}>
              <span className="mr-1">{getDifficultySymbol(problem.difficulty)}</span>
              {problem.difficulty === 'EASY' ? 'Beginner' : problem.difficulty === 'MEDIUM' ? 'Intermediate' : 'Advanced'}
            </Badge>
            <Badge variant="outline">
              Module {problem.module?.order || 0}: {problem.module?.title || 'Unknown'}
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>~15 min</span>
            </div>
          </div>

          <Button className="w-full gap-2" onClick={handleStartChallenge}>
            Start Challenge
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
