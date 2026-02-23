'use client'

import { useState, useEffect } from 'react'
import { useProblemStore, type Problem } from '@/store/problem-store'
import { useUIStore } from '@/store/ui-store'
import { ProblemDescription } from './ProblemDescription'
import { CodeEditor } from './CodeEditor'
import { ThinkSection } from './ThinkSection'
import { SubmissionResult } from './SubmissionResult'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import {
  ArrowLeft,
  Play,
  Send,
  Loader2,
  Lightbulb,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { getDifficultySymbol, getDifficultyColor, getDifficultyBgColor } from '@/lib/difficulty'

interface ProblemViewProps {
  onBack?: () => void
}

export function ProblemView({ onBack }: ProblemViewProps) {
  const {
    currentProblem,
    code,
    setCode,
    language,
    setLanguage,
    isRunning,
    isSubmitting,
    setIsRunning,
    setIsSubmitting,
    submissionResult,
    setSubmissionResult,
  } = useProblemStore()
  const {
    setCurrentView,
    setCurrentModuleId,
    thinkModalOpen,
    setThinkModalOpen,
  } = useUIStore()
  const [showHint, setShowHint] = useState(false)

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      setCurrentView('module')
    }
  }

  const handleRun = async () => {
    if (!currentProblem) return

    setIsRunning(true)
    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language,
          testCases: currentProblem.testCases?.slice(0, 2),
        }),
      })
      const result = await response.json()
      setSubmissionResult({
        status: 'ACCEPTED',
        executionTime: result.executionTime,
        memoryUsed: result.memoryUsed,
        testCasesPassed: 2,
        totalTestCases: currentProblem.testCases?.length || 2,
      })
    } catch (error) {
      console.error('Run error:', error)
    } finally {
      setIsRunning(false)
    }
  }

  const handleSubmit = async () => {
    if (!currentProblem) return

    setThinkModalOpen(true)
  }

  const handleConfirmSubmit = async () => {
    if (!currentProblem) return

    setThinkModalOpen(false)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'demo-user',
          problemId: currentProblem.id,
          code,
          language,
          testCases: currentProblem.testCases,
        }),
      })
      const result = await response.json()
      setSubmissionResult({
        status: result.status,
        executionTime: result.executionTime,
        memoryUsed: result.memoryUsed,
        testCasesPassed: result.testCasesPassed,
        totalTestCases: result.totalTestCases,
      })
    } catch (error) {
      console.error('Submit error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    if (currentProblem?.starterCode) {
      const starterCode = currentProblem.starterCode as Record<string, string>
      setCode(starterCode[newLanguage] || starterCode['javascript'] || '')
    }
  }

  if (!currentProblem) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <p>Select a problem to start solving</p>
      </div>
    )
  }

  const problem = currentProblem as Problem

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col">
      <div className="border-b px-4 py-3 flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="font-semibold">{problem.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant="outline"
                className={cn(
                  'text-xs',
                  getDifficultyBgColor(problem.difficulty),
                  getDifficultyColor(problem.difficulty)
                )}
              >
                <span className="mr-1">{getDifficultySymbol(problem.difficulty)}</span>
                {problem.difficulty === 'EASY' ? 'Beginner' : problem.difficulty === 'MEDIUM' ? 'Intermediate' : 'Advanced'}
              </Badge>
              <span className="text-xs text-muted-foreground">
                Module {problem.moduleId?.slice(-1) || 0}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHint(!showHint)}
            className="gap-2"
          >
            <Lightbulb className="h-4 w-4" />
            Hint
            {showHint ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRun}
            disabled={isRunning || isSubmitting}
            className="gap-2"
          >
            {isRunning ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            Run
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={isRunning || isSubmitting}
            className="gap-2"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Submit
          </Button>
        </div>
      </div>

      {showHint && (
        <Card className="m-4 border-yellow-500/50 bg-yellow-500/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-600 dark:text-yellow-400">Hint</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {problem.intuition?.substring(0, 200)}...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full overflow-y-auto p-4">
            <ProblemDescription problem={problem} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-hidden">
              <CodeEditor
                code={code}
                language={language}
                onCodeChange={setCode}
                onLanguageChange={handleLanguageChange}
                starterCode={problem.starterCode as Record<string, string>}
              />
            </div>
            {submissionResult && (
              <div className="border-t max-h-64 overflow-y-auto">
                <SubmissionResult result={submissionResult} />
              </div>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <ThinkSection
        open={thinkModalOpen}
        onOpenChange={setThinkModalOpen}
        questions={problem.thinkSection || []}
        onConfirm={handleConfirmSubmit}
      />
    </div>
  )
}
