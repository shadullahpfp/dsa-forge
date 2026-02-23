'use client'

import { useAuthStore } from '@/store/auth-store'
import { useUIStore } from '@/store/ui-store'
import { useProblemStore, type Module } from '@/store/problem-store'
import { cn } from '@/lib/utils'
import { ADMIN_EMAIL } from '@/lib/config'
import {
  BookOpen,
  ChevronRight,
  Code2,
  Database,
  GitBranch,
  Layers,
  Link2,
  ListTree,
  Network,
  PieChart,
  Search,
  SquareStack,
  AlignJustify,
  Trophy,
  Zap,
  Lock,
  CheckCircle2,
  Shield,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'

const moduleIcons: Record<number, typeof BookOpen> = {
  0: Code2,
  1: Layers,
  2: GitBranch,
  3: Search,
  4: Link2,
  5: AlignJustify,
  6: ListTree,
  7: SquareStack,
  8: PieChart,
  9: Network,
  10: Database,
  11: Zap,
  12: Trophy,
}

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const { isAuthenticated, user } = useAuthStore()
  const { currentView, setCurrentView, setCurrentModuleId, mobileMenuOpen, setMobileMenuOpen } = useUIStore()
  const { modules, currentModule, setCurrentModule, userProgress } = useProblemStore()

  // Check if user is admin
  const isAdmin = user?.role === 'ADMIN' || user?.email === ADMIN_EMAIL

  if (!isAuthenticated || currentView === 'landing') {
    return null
  }

  const getModuleProgress = (moduleId: string) => {
    const progress = userProgress.find((p) => p.moduleId === moduleId)
    return progress
  }

  const handleModuleClick = (module: Module) => {
    const moduleIndex = modules.findIndex((m) => m.id === module.id)
    const previousModules = modules.slice(0, moduleIndex)
    
    const allPreviousCompleted = previousModules.every((m) => {
      const progress = getModuleProgress(m.id)
      return progress?.completed
    })

    if (moduleIndex === 0 || allPreviousCompleted) {
      setCurrentModule(module)
      setCurrentModuleId(module.id)
      setCurrentView('module')
      setMobileMenuOpen(false)
    }
  }

  const isModuleLocked = (moduleIndex: number) => {
    if (moduleIndex === 0) return false
    const previousModules = modules.slice(0, moduleIndex)
    return !previousModules.every((m) => {
      const progress = getModuleProgress(m.id)
      return progress?.completed
    })
  }

  return (
    <>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <aside
        className={cn(
          'fixed md:sticky top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-64 border-r border-border bg-background transition-transform duration-300',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          className
        )}
      >
        <ScrollArea className="h-full py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Learning Path</h2>
            <div className="space-y-1">
              <Button
                variant={currentView === 'dashboard' ? 'secondary' : 'ghost'}
                className="w-full justify-start gap-2"
                onClick={() => {
                  setCurrentView('dashboard')
                  setMobileMenuOpen(false)
                }}
              >
                <BookOpen className="h-4 w-4" />
                Dashboard
              </Button>
            </div>
          </div>

          <div className="px-3 py-2 mt-4">
            <h2 className="mb-2 px-4 text-sm font-semibold text-muted-foreground">Modules</h2>
            <div className="space-y-1">
              {modules.map((module, index) => {
                const Icon = moduleIcons[module.order] || BookOpen
                const progress = getModuleProgress(module.id)
                const locked = isModuleLocked(index)
                const isActive = currentModule?.id === module.id
                const problemsCount = module.problems?.length || 0

                return (
                  <div key={module.id} className="relative">
                    <Button
                      variant={isActive ? 'secondary' : 'ghost'}
                      className={cn(
                        'w-full justify-start gap-2 h-auto py-2',
                        locked && 'opacity-50 cursor-not-allowed'
                      )}
                      onClick={() => handleModuleClick(module)}
                      disabled={locked}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <div
                          className={cn(
                            'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                            progress?.completed
                              ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                              : isActive
                                ? 'bg-primary/10 text-primary'
                                : 'bg-muted'
                          )}
                        >
                          {progress?.completed ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : locked ? (
                            <Lock className="h-4 w-4" />
                          ) : (
                            <Icon className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex flex-col items-start text-left">
                          <span className="text-sm font-medium line-clamp-1">
                            Module {module.order}: {module.title}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {problemsCount} problems
                          </span>
                        </div>
                      </div>
                      {!locked && <ChevronRight className="h-4 w-4 ml-auto" />}
                    </Button>
                    {progress && !progress.completed && !locked && (
                      <div className="px-4 pb-2">
                        <Progress
                          value={
                            ((progress.completedTopics?.length || 0) /
                              (module.topics?.length || 1)) *
                            100
                          }
                          className="h-1"
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Admin Section */}
          {isAdmin && (
            <div className="px-3 py-2 mt-4 border-t">
              <h2 className="mb-2 px-4 text-sm font-semibold text-muted-foreground">Admin</h2>
              <div className="space-y-1">
                <Button
                  variant={currentView === 'admin' ? 'secondary' : 'ghost'}
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    setCurrentView('admin')
                    setMobileMenuOpen(false)
                  }}
                >
                  <Shield className="h-4 w-4" />
                  Admin Dashboard
                </Button>
              </div>
            </div>
          )}
        </ScrollArea>
      </aside>
    </>
  )
}
