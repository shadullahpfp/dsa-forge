'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useProblemStore, type Module } from '@/store/problem-store'
import { useUIStore } from '@/store/ui-store'
import { cn } from '@/lib/utils'
import {
  Code2,
  Layers,
  GitBranch,
  Search,
  Link2,
  AlignJustify,
  ListTree,
  SquareStack,
  PieChart,
  Network,
  Database,
  Zap,
  Trophy,
  Lock,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'

const moduleIcons: Record<number, typeof Code2> = {
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

interface ModuleCardProps {
  module: Module
  index: number
  isLocked: boolean
  isCompleted: boolean
  progress: number
}

export function ModuleCard({ module, index, isLocked, isCompleted, progress }: ModuleCardProps) {
  const { setCurrentModule, userProgress } = useProblemStore()
  const { setCurrentView, setCurrentModuleId } = useUIStore()

  const Icon = moduleIcons[module.order] || Code2
  const problemsCount = module.problems?.length || 0

  const handleClick = () => {
    if (!isLocked) {
      setCurrentModule(module)
      setCurrentModuleId(module.id)
      setCurrentView('module')
    }
  }

  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all',
        isLocked ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg cursor-pointer hover:border-primary/50'
      )}
      onClick={handleClick}
    >
      {isCompleted && (
        <div className="absolute top-0 right-0 w-16 h-16">
          <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5 text-white" />
          </div>
        </div>
      )}

      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-lg',
              isCompleted
                ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                : isLocked
                  ? 'bg-muted text-muted-foreground'
                  : 'bg-primary/10 text-primary'
            )}
          >
            {isLocked ? <Lock className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Module {module.order}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {problemsCount} problems
              </Badge>
            </div>
            <CardTitle className="text-lg mt-1">{module.title}</CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{module.description}</p>

        {!isLocked && !isCompleted && (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </>
        )}

        {!isLocked && (
          <Button
            variant={isCompleted ? 'outline' : 'default'}
            className="w-full gap-2"
            onClick={(e) => {
              e.stopPropagation()
              handleClick()
            }}
          >
            {isCompleted ? 'Review Module' : 'Continue Learning'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
