'use client'

import { useAuthStore } from '@/store/auth-store'
import { useUIStore } from '@/store/ui-store'
import { useProblemStore } from '@/store/problem-store'
import { StatsCard } from './StatsCard'
import { StreakDisplay } from './StreakDisplay'
import { DailyChallengeCard } from './DailyChallengeCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Code2, Trophy, Target, ArrowRight, CheckCircle2, Lock } from 'lucide-react'

export function Dashboard() {
  const { user } = useAuthStore()
  const { setCurrentView, setCurrentModuleId } = useUIStore()
  const { modules, userProgress } = useProblemStore()

  const currentModuleIndex = userProgress.findIndex((p) => !p.completed)
  const currentModule = modules[currentModuleIndex] || modules[0]

  const totalProblems = modules.reduce((acc, m) => acc + (m.problems?.length || 0), 0)
  const solvedProblems = userProgress.reduce((acc, p) => {
    if (p.completed) {
      const courseModule = modules.find((m) => m.id === p.moduleId)
      return acc + (courseModule?.problems?.length || 0)
    }
    return acc
  }, 0)

  const completedModules = userProgress.filter((p) => p.completed).length

  const handleContinue = () => {
    if (currentModule) {
      setCurrentModuleId(currentModule.id)
      setCurrentView('module')
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-7xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.name?.split(' ')[0] || 'Developer'}!
        </h1>
        <p className="text-muted-foreground">
          Ready to continue your DSA journey? You&apos;re making great progress!
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Problems Solved"
          value={solvedProblems}
          description={`of ${totalProblems} total`}
          icon={Code2}
        />
        <StatsCard
          title="Modules Completed"
          value={`${completedModules}/${modules.length}`}
          description="Keep going!"
          icon={BookOpen}
        />
        <StatsCard
          title="Current Streak"
          value={`${user?.streak || 0} days`}
          description="Don't break it!"
          icon={Target}
        />
        <StatsCard
          title="Total XP"
          value={solvedProblems * 100}
          description="Keep earning!"
          icon={Trophy}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Current Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">
                  {Math.round((completedModules / modules.length) * 100)}%
                </span>
              </div>
              <Progress value={(completedModules / modules.length) * 100} className="h-2" />

              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mt-6">
                {modules.slice(0, 7).map((module, index) => {
                  const progress = userProgress.find((p) => p.moduleId === module.id)
                  const isCompleted = progress?.completed
                  const isCurrent = index === currentModuleIndex
                  const isLocked = index > currentModuleIndex && !isCompleted

                  return (
                    <button
                      key={module.id}
                      onClick={() => {
                        if (!isLocked) {
                          setCurrentModuleId(module.id)
                          setCurrentView('module')
                        }
                      }}
                      disabled={isLocked}
                      className={`relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                        isCompleted
                          ? 'border-green-500 bg-green-500/10'
                          : isCurrent
                            ? 'border-primary bg-primary/10'
                            : isLocked
                              ? 'border-muted bg-muted/50 opacity-50 cursor-not-allowed'
                              : 'border-muted hover:border-primary/50'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                      ) : isLocked ? (
                        <Lock className="h-6 w-6 text-muted-foreground" />
                      ) : (
                        <span className="text-lg font-bold">{module.order}</span>
                      )}
                      <span className="text-xs mt-1 text-center line-clamp-1">
                        {module.title}
                      </span>
                      {isCurrent && (
                        <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-[10px] text-primary-foreground font-bold">!</span>
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              {currentModule && (
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Continue Learning</p>
                      <p className="text-sm text-muted-foreground">
                        Module {currentModule.order}: {currentModule.title}
                      </p>
                    </div>
                    <Button onClick={handleContinue} className="gap-2">
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <StreakDisplay />
          <DailyChallengeCard />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Learning Path
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {modules.map((module, index) => {
              const progress = userProgress.find((p) => p.moduleId === module.id)
              const isCompleted = progress?.completed
              const isCurrent = index === currentModuleIndex

              return (
                <div key={module.id} className="flex items-center">
                  <button
                    onClick={() => {
                      if (index <= currentModuleIndex || isCompleted) {
                        setCurrentModuleId(module.id)
                        setCurrentView('module')
                      }
                    }}
                    disabled={index > currentModuleIndex && !isCompleted}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 min-w-[100px] transition-all ${
                      isCompleted
                        ? 'border-green-500 bg-green-500/10'
                        : isCurrent
                          ? 'border-primary bg-primary/10'
                          : index > currentModuleIndex
                            ? 'border-muted bg-muted/50 opacity-50 cursor-not-allowed'
                            : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                    ) : (
                      <span className="text-2xl font-bold mb-2">{module.order}</span>
                    )}
                    <span className="text-xs text-center">{module.title}</span>
                  </button>
                  {index < modules.length - 1 && (
                    <ArrowRight className="h-4 w-4 mx-2 text-muted-foreground shrink-0" />
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
