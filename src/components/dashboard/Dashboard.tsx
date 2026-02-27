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
          <Card className="relative overflow-hidden card-glass hover-elevate group">
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 pointer-events-none" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Current Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground bg-primary/10 text-primary px-2 py-1 rounded-md">
                  {Math.round((completedModules / modules.length) * 100)}%
                </span>
              </div>
              <Progress value={(completedModules / modules.length) * 100} className="h-2 group-hover:bg-primary/20 transition-colors" />

              <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 mt-6">
                {Array.isArray(modules) && modules.slice(0, 7).map((module, index) => {
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
                      className={`relative flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-300 transform-gpu ${isCompleted
                        ? 'border-green-500 bg-green-500/10 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/20'
                        : isCurrent
                          ? 'border-primary bg-primary/10 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20 ring-2 ring-primary/20 ring-offset-2 ring-offset-background scale-105'
                          : isLocked
                            ? 'border-muted bg-muted/20 opacity-40 cursor-not-allowed'
                            : 'border-muted hover:border-primary/50 hover:-translate-y-1 hover:bg-primary/5'
                        }`}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" style={{ transform: 'translateZ(10px)' }} />
                      ) : isLocked ? (
                        <Lock className="h-6 w-6 text-muted-foreground" style={{ transform: 'translateZ(5px)' }} />
                      ) : (
                        <span className="text-lg font-bold" style={{ transform: 'translateZ(15px)' }}>{module.order}</span>
                      )}
                      <span className="text-[10px] mt-2 text-center line-clamp-1 font-medium" style={{ transform: 'translateZ(5px)' }}>
                        {module.title}
                      </span>
                      {isCurrent && (
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary shadow-lg shadow-primary/40 rounded-full flex items-center justify-center animate-bounce">
                          <span className="text-[10px] text-primary-foreground font-bold">!</span>
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              {currentModule && (
                <div className="mt-8 relative overflow-hidden p-5 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 via-background to-background group/continue hover:border-primary/40 transition-all duration-300">
                  <div className="absolute inset-y-0 left-0 w-1 bg-primary group-hover/continue:w-2 transition-all duration-300" />
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="font-semibold text-foreground">Continue Learning</p>
                      <p className="text-sm text-primary font-medium mt-1">
                        Module {currentModule.order}: {currentModule.title}
                      </p>
                    </div>
                    <Button onClick={handleContinue} className="gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground group-hover/continue:shadow-primary/40">
                      Continue Learning
                      <ArrowRight className="h-4 w-4 group-hover/continue:translate-x-1 transition-transform" />
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

      <Card className="relative overflow-hidden card-glass hover-elevate group">
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 pointer-events-none" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Learning Path
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
            {Array.isArray(modules) && modules.map((module, index) => {
              const progress = userProgress.find((p) => p.moduleId === module.id)
              const isCompleted = progress?.completed
              const isCurrent = index === currentModuleIndex

              return (
                <div key={module.id} className="flex items-center group/path">
                  <button
                    onClick={() => {
                      if (index <= currentModuleIndex || isCompleted) {
                        setCurrentModuleId(module.id)
                        setCurrentView('module')
                      }
                    }}
                    disabled={index > currentModuleIndex && !isCompleted}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 min-w-[110px] transition-all duration-300 transform-gpu ${isCompleted
                      ? 'border-green-500 bg-green-500/10 hover:-translate-y-2 hover:shadow-lg hover:shadow-green-500/20'
                      : isCurrent
                        ? 'border-primary bg-primary/10 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/30 ring-2 ring-primary/20 ring-offset-2 ring-offset-background scale-110'
                        : index > currentModuleIndex
                          ? 'border-muted bg-muted/20 opacity-40 cursor-not-allowed'
                          : 'border-muted hover:border-primary/50 hover:-translate-y-1 hover:bg-primary/5'
                      }`}
                    style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" style={{ transform: 'translateZ(15px)' }} />
                    ) : (
                      <span className="text-2xl font-bold mb-2" style={{ transform: 'translateZ(20px)' }}>{module.order}</span>
                    )}
                    <span className="text-xs text-center font-medium" style={{ transform: 'translateZ(10px)' }}>{module.title}</span>
                  </button>
                  {index < modules.length - 1 && (
                    <ArrowRight className={`h-5 w-5 mx-3 shrink-0 transition-colors duration-300 ${isCompleted || isCurrent ? 'text-primary' : 'text-muted-foreground'}`} />
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
