'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useProblemStore, type Module, type Problem } from '@/store/problem-store'
import { useUIStore } from '@/store/ui-store'
import { cn } from '@/lib/utils'
import { CheckCircle2, Circle, Play, ChevronRight, Clock, ArrowLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { getDifficultySymbol, getDifficultyColor, getDifficultyBgColor } from '@/lib/difficulty'

interface TopicListProps {
  module?: Module
  onProblemSelect: (problemId: string) => void
}

export function TopicList({ module: propModule, onProblemSelect }: TopicListProps) {
  const { currentModule: storeModule, userProgress, setCurrentModule } = useProblemStore()
  const { setCurrentView, currentProblemId, setCurrentModuleId } = useUIStore()
  const [loading, setLoading] = useState(false)

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
            {currentModule.topics.map((topic, index) => {
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
        {currentModule.problems && currentModule.problems.length > 0 ? (
          <div className="space-y-3">
            {currentModule.problems.map((problem, index) => {
              const isActive = currentProblemId === problem.id

              return (
                <Card
                  key={problem.id}
                  className={cn(
                    'transition-all cursor-pointer hover:shadow-md hover:border-primary/50',
                    isActive && 'border-primary'
                  )}
                  onClick={() => handleProblemClick(problem)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted font-medium text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{problem.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className={cn('text-xs', getDifficultyBgColor(problem.difficulty), getDifficultyColor(problem.difficulty))}>
                              <span className="mr-1">{getDifficultySymbol(problem.difficulty)}</span>
                              {problem.difficulty === 'EASY' ? 'Beginner' : problem.difficulty === 'MEDIUM' ? 'Intermediate' : 'Advanced'}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>~15 min</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Play className="h-4 w-4" />
                        Solve
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center text-muted-foreground">
              <p>No problems available for this module yet.</p>
              <p className="text-sm mt-2">Problems are being added regularly!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
