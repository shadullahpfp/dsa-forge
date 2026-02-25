'use client'

import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import type { Problem } from '@/store/problem-store'
import ReactMarkdown from 'react-markdown'
import { Lightbulb, Target, Zap, Code2, Clock, Database } from 'lucide-react'

interface ProblemDescriptionProps {
  problem: Problem
}

export function ProblemDescription({ problem }: ProblemDescriptionProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'EASY':
        return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20'
      case 'MEDIUM':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20'
      case 'HARD':
        return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
      default:
        return ''
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className={getDifficultyColor(problem.difficulty)}>
            {problem.difficulty}
          </Badge>
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown>{problem.description}</ReactMarkdown>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="flex items-center gap-2 font-semibold mb-3">
          <Target className="h-4 w-4" />
          Constraints
        </h3>
        <div className="prose prose-sm dark:prose-invert max-w-none bg-muted/50 p-4 rounded-lg">
          <ReactMarkdown>{problem.constraints}</ReactMarkdown>
        </div>
      </div>

      <Tabs defaultValue="intuition" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="intuition" className="text-xs sm:text-sm">
            <Lightbulb className="h-4 w-4 mr-1" />
            Intuition
          </TabsTrigger>
          <TabsTrigger value="brute" className="text-xs sm:text-sm">
            <Zap className="h-4 w-4 mr-1" />
            Brute Force
          </TabsTrigger>
          <TabsTrigger value="optimal" className="text-xs sm:text-sm">
            <Code2 className="h-4 w-4 mr-1" />
            Optimal
          </TabsTrigger>
          <TabsTrigger value="complexity" className="text-xs sm:text-sm">
            <Clock className="h-4 w-4 mr-1" />
            Complexity
          </TabsTrigger>
        </TabsList>
        <TabsContent value="intuition" className="mt-4">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{problem.intuition}</ReactMarkdown>
          </div>
        </TabsContent>
        <TabsContent value="brute" className="mt-4">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{problem.bruteForce}</ReactMarkdown>
          </div>
        </TabsContent>
        <TabsContent value="optimal" className="mt-4">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{problem.optimization}</ReactMarkdown>
          </div>
        </TabsContent>
        <TabsContent value="complexity" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-medium">Time Complexity</span>
              </div>
              <code className="text-lg font-mono">{problem.timeComplexity}</code>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-4 w-4 text-primary" />
                <span className="font-medium">Space Complexity</span>
              </div>
              <code className="text-lg font-mono">{problem.spaceComplexity}</code>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Separator />

      <div>
        <h3 className="font-semibold mb-3">Test Cases</h3>
        <div className="space-y-3">
          {(Array.isArray(problem.testCases) ? problem.testCases : []).slice(0, 3).map((tc, index) => (
            <div key={index} className="bg-muted/50 p-4 rounded-lg">
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Input</span>
                  <pre className="text-sm mt-1 font-mono">{tc.input}</pre>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Expected Output</span>
                  <pre className="text-sm mt-1 font-mono">{tc.expectedOutput}</pre>
                </div>
              </div>
              {tc.explanation && (
                <div className="mt-2 pt-2 border-t text-sm text-muted-foreground">
                  {tc.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
