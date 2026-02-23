'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { SubmissionResult } from '@/store/problem-store'
import { cn } from '@/lib/utils'
import {
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Cpu,
  Database,
  RefreshCw,
} from 'lucide-react'

interface SubmissionResultProps {
  result: SubmissionResult
}

export function SubmissionResult({ result }: SubmissionResultProps) {
  const getStatusIcon = () => {
    switch (result.status) {
      case 'ACCEPTED':
        return <CheckCircle2 className="h-6 w-6 text-green-500" />
      case 'WRONG_ANSWER':
        return <XCircle className="h-6 w-6 text-red-500" />
      case 'TIME_LIMIT_EXCEEDED':
        return <Clock className="h-6 w-6 text-yellow-500" />
      case 'MEMORY_LIMIT_EXCEEDED':
        return <Database className="h-6 w-6 text-orange-500" />
      case 'COMPILATION_ERROR':
        return <AlertTriangle className="h-6 w-6 text-purple-500" />
      case 'RUNTIME_ERROR':
        return <AlertTriangle className="h-6 w-6 text-red-500" />
      default:
        return <RefreshCw className="h-6 w-6 text-blue-500 animate-spin" />
    }
  }

  const getStatusColor = () => {
    switch (result.status) {
      case 'ACCEPTED':
        return 'border-green-500/50 bg-green-500/5'
      case 'WRONG_ANSWER':
        return 'border-red-500/50 bg-red-500/5'
      case 'TIME_LIMIT_EXCEEDED':
        return 'border-yellow-500/50 bg-yellow-500/5'
      case 'MEMORY_LIMIT_EXCEEDED':
        return 'border-orange-500/50 bg-orange-500/5'
      case 'COMPILATION_ERROR':
        return 'border-purple-500/50 bg-purple-500/5'
      case 'RUNTIME_ERROR':
        return 'border-red-500/50 bg-red-500/5'
      default:
        return 'border-blue-500/50 bg-blue-500/5'
    }
  }

  const getStatusMessage = () => {
    switch (result.status) {
      case 'ACCEPTED':
        return { title: 'Accepted!', description: 'Your solution passed all test cases.' }
      case 'WRONG_ANSWER':
        return { title: 'Wrong Answer', description: 'Your solution produced incorrect output.' }
      case 'TIME_LIMIT_EXCEEDED':
        return { title: 'Time Limit Exceeded', description: 'Your solution took too long.' }
      case 'MEMORY_LIMIT_EXCEEDED':
        return { title: 'Memory Limit Exceeded', description: 'Your solution used too much memory.' }
      case 'COMPILATION_ERROR':
        return { title: 'Compilation Error', description: 'Your code could not be compiled.' }
      case 'RUNTIME_ERROR':
        return { title: 'Runtime Error', description: 'Your code crashed during execution.' }
      default:
        return { title: 'Running...', description: 'Please wait.' }
    }
  }

  const { title, description } = getStatusMessage()
  const isAccepted = result.status === 'ACCEPTED'

  return (
    <div className="p-4">
      <Card className={cn('border-2', getStatusColor())}>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="mt-1">{getStatusIcon()}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">{title}</h3>
                {result.testCasesPassed !== undefined && (
                  <Badge variant={isAccepted ? 'default' : 'secondary'}>
                    {result.testCasesPassed}/{result.totalTestCases} passed
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>

              <div className="grid grid-cols-2 gap-4 mt-4">
                {result.executionTime !== undefined && (
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Runtime
                    </div>
                    <p className="text-xl font-mono mt-1">{result.executionTime} ms</p>
                  </div>
                )}
                {result.memoryUsed !== undefined && (
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Cpu className="h-4 w-4" />
                      Memory
                    </div>
                    <p className="text-xl font-mono mt-1">
                      {result.memoryUsed > 1024
                        ? `${(result.memoryUsed / 1024).toFixed(2)} MB`
                        : `${result.memoryUsed} KB`}
                    </p>
                  </div>
                )}
              </div>

              {isAccepted && (
                <div className="mt-4 p-3 bg-green-500/10 rounded-lg">
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    🎉 Congratulations! You&apos;ve solved this problem!
                  </p>
                </div>
              )}

              {!isAccepted && result.status !== 'PENDING' && result.status !== 'RUNNING' && (
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
