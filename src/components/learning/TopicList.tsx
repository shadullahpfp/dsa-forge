'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useProblemStore, type Module, type Problem } from '@/store/problem-store'
import { useUIStore } from '@/store/ui-store'
import { useAuthStore } from '@/store/auth-store'
import { ADMIN_EMAIL } from '@/lib/config'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { CheckCircle2, Circle, Play, ChevronRight, Clock, ArrowLeft, Code2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { getDifficultySymbol, getDifficultyColor, getDifficultyBgColor } from '@/lib/difficulty'

interface TopicListProps {
  module?: Module
  onProblemSelect: (problemId: string) => void
}

export function TopicList({ module: propModule, onProblemSelect }: TopicListProps) {
  const { currentModule: storeModule, userProgress, setCurrentModule } = useProblemStore()
  const { setCurrentView, currentProblemId, setCurrentModuleId } = useUIStore()
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(false)

  const isAdmin = user?.role === 'ADMIN' || user?.email === ADMIN_EMAIL

  // Use either the prop module or the store module
  const currentModule = propModule || storeModule

  useEffect(() => {
    if (currentModule) {
      // Fetch full module data including problems
      const fetchModuleData = async () => {
        try {
          const res = await fetch(`/api/problems?moduleId=${currentModule.id}`)
          const problems = await res.json()
          // Update the current module with full problem data
          setCurrentModule({
            ...currentModule,
            problems: problems
          })
        } catch (error) {
          console.error('Error fetching module data:', error)
        }
      }
      fetchModuleData()
    }
  }, [currentModule?.id])

  if (!currentModule) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          <p>Select a module to view topics</p>
        </div>
      </div>
    )
  }

  const moduleProgress = userProgress.find((p) => p.moduleId === currentModule.id)
  const completedTopics = moduleProgress?.completedTopics || []

  const handleProblemClick = (problem: Problem) => {
    // Set the problem in store
    useProblemStore.getState().setCurrentProblem({
      ...problem,
      thinkSection: typeof problem.thinkSection === 'string' ? [] : problem.thinkSection,
      solution: typeof problem.solution === 'string' ? [] : problem.solution,
      starterCode: typeof problem.starterCode === 'string' ? {} : problem.starterCode,
      testCases: typeof problem.testCases === 'string' ? [] : problem.testCases,
    } as any)

    // Set starter code if available
    if (problem.starterCode) {
      const starterCode = typeof problem.starterCode === 'string'
        ? JSON.parse(problem.starterCode)
        : problem.starterCode
      useProblemStore.getState().setCode(starterCode['javascript'] || '')
    }

    onProblemSelect(problem.id)
    setCurrentView('problem')
  }

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentView('dashboard')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xl">
            {currentModule.order}
          </div>
          <div>
            <h2 className="text-2xl font-bold">Module {currentModule.order}: {currentModule.title}</h2>
            <p className="text-muted-foreground">{currentModule.description}</p>
          </div>
        </div>
      </div>

      {currentModule.topics && currentModule.topics.length > 0 && (
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold">Topics</h3>
          <div className="space-y-3">
            {Array.isArray(currentModule.topics) && currentModule.topics.map((topic, index) => {
              const isCompleted = completedTopics.includes(topic.id)

              return (
                <Card key={topic.id} className={cn(
                  'transition-all',
                  isCompleted && 'border-green-500/50'
                )}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        'flex h-6 w-6 items-center justify-center rounded-full mt-0.5 shrink-0',
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : 'bg-muted text-muted-foreground'
                      )}>
                        {isCompleted ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{topic.title}</h4>
                        <div className="prose prose-sm dark:prose-invert mt-2 max-w-none">
                          <ReactMarkdown>{topic.content}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Practice Problems</h3>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        ) : currentModule.problems && currentModule.problems.length > 0 ? (
          <div className="space-y-3">
            {Array.isArray(currentModule.problems) && currentModule.problems.map((problem, index) => {
              const isActive = currentProblemId === problem.id

              return (
                <Card
                  key={problem.id}
                  className={cn(
                    'transition-all cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 border-2',
                    isActive ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-transparent hover:border-primary/30'
                  )}
                  onClick={() => handleProblemClick(problem)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold shadow-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground tracking-tight">{problem.title}</h4>
                          <div className="flex items-center gap-3 mt-1.5">
                            <Badge variant="outline" className={cn('text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full', getDifficultyBgColor(problem.difficulty), getDifficultyColor(problem.difficulty))}>
                              <span className="mr-1.5">{getDifficultySymbol(problem.difficulty)}</span>
                              {problem.difficulty === 'EASY' ? 'Beginner' : problem.difficulty === 'MEDIUM' ? 'Intermediate' : 'Advanced'}
                            </Badge>
                            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                              <Clock className="h-3.5 w-3.5" />
                              <span>~15 min</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant={isActive ? "default" : "secondary"} size="sm" className="gap-2 font-medium shadow-sm transition-all hover:scale-105">
                        <Play className="h-4 w-4" />
                        {isActive ? 'Continue' : 'Solve'}
                        <ChevronRight className="h-4 w-4 ml-1 opacity-70" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 mt-4 rounded-2xl border-2 border-dashed bg-muted/10 border-muted">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6 shadow-inner px-4">
              <Code2 className="h-10 w-10 text-primary opacity-80" />
            </div>
            <h3 className="text-xl font-bold tracking-tight mb-2">No problems available</h3>
            <p className="text-muted-foreground text-center max-w-sm mb-6 leading-relaxed">
              We&apos;re currently crafting the perfect challenges for this module. Check back soon for new practice exercises!
            </p>
            {isAdmin ? (
              <Button variant="outline" className="gap-2 rounded-full border-primary/50 text-primary hover:bg-primary/10" onClick={() => setCurrentView('admin')}>
                Manage Content
              </Button>
            ) : (
              <Button variant="outline" className="gap-2 rounded-full" onClick={() => setCurrentView('dashboard')}>
                <ArrowLeft className="h-4 w-4" />
                Return to Path
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
