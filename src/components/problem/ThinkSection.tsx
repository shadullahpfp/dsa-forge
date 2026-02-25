'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Lightbulb, ChevronRight, Loader2 } from 'lucide-react'
import type { ThinkQuestion } from '@/store/problem-store'

interface ThinkSectionProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  questions: ThinkQuestion[]
  onConfirm: () => void
}

export function ThinkSection({ open, onOpenChange, questions, onConfirm }: ThinkSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showHint, setShowHint] = useState<Record<string, boolean>>({})

  const handleSubmit = () => {
    onConfirm()
    setCurrentQuestion(0)
    setAnswers({})
    setShowHint({})
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const defaultQuestions: ThinkQuestion[] = [
    {
      id: '1',
      question: 'What is the time complexity you are aiming for?',
      hint: 'Think about the input size constraints.',
    },
    {
      id: '2',
      question: 'What data structure would be most efficient here?',
      hint: 'Consider the operations you need to perform frequently.',
    },
    {
      id: '3',
      question: 'Have you considered edge cases?',
      hint: 'Empty input, single element, duplicates, etc.',
    },
  ]

  const displayQuestions = Array.isArray(questions) && questions.length > 0 ? questions : defaultQuestions
  const currentQ = displayQuestions[currentQuestion]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Think Before You Code
          </DialogTitle>
          <DialogDescription>
            Answer these questions before submitting your solution. This helps you think through the problem.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2">
            {displayQuestions.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-colors ${index <= currentQuestion ? 'bg-primary' : 'bg-muted'
                  }`}
              />
            ))}
          </div>

          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline">Question {currentQuestion + 1} of {displayQuestions.length}</Badge>
                {currentQ.hint && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowHint({ ...showHint, [currentQ.id]: !showHint[currentQ.id] })}
                    className="text-xs"
                  >
                    {showHint[currentQ.id] ? 'Hide Hint' : 'Show Hint'}
                  </Button>
                )}
              </div>

              <p className="font-medium">{currentQ.question}</p>

              {showHint[currentQ.id] && currentQ.hint && (
                <div className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 p-3 rounded-md text-sm">
                  💡 {currentQ.hint}
                </div>
              )}

              <Textarea
                placeholder="Type your answer here..."
                value={answers[currentQ.id] || ''}
                onChange={(e) => setAnswers({ ...answers, [currentQ.id]: e.target.value })}
                rows={3}
              />
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button onClick={handleNext} className="gap-2">
              {currentQuestion === displayQuestions.length - 1 ? 'Submit Solution' : 'Next'}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
