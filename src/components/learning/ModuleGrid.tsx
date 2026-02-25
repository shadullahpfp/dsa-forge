'use client'

import { useProblemStore } from '@/store/problem-store'
import { ModuleCard } from './ModuleCard'
import { useAuthStore } from '@/store/auth-store'

export function ModuleGrid() {
  const { modules, userProgress } = useProblemStore()
  const { isAuthenticated } = useAuthStore()

  const getModuleProgress = (moduleId: string) => {
    const progress = userProgress.find((p) => p.moduleId === moduleId)
    if (!progress) return 0
    const completedTopics = progress.completedTopics?.length || 0
    return completedTopics * 20
  }

  const isModuleLocked = (index: number) => {
    if (index === 0) return false
    const previousModules = modules.slice(0, index)
    return !previousModules.every((m) => {
      const progress = userProgress.find((p) => p.moduleId === m.id)
      return progress?.completed
    })
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Learning Path</h1>
        <p className="text-muted-foreground mt-1">
          Master DSA concepts in order. Complete each module to unlock the next.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(modules) && modules.map((module, index) => {
          const progress = userProgress.find((p) => p.moduleId === module.id)
          const isCompleted = progress?.completed || false
          const locked = isModuleLocked(index)
          const progressValue = getModuleProgress(module.id)

          return (
            <ModuleCard
              key={module.id}
              module={module}
              index={index}
              isLocked={locked}
              isCompleted={isCompleted}
              progress={progressValue}
            />
          )
        })}
      </div>
    </div>
  )
}
