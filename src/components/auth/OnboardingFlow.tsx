'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/store/auth-store'
import { useUIStore } from '@/store/ui-store'
import { Loader2, ChevronRight } from 'lucide-react'
import { EDUCATION_SYMBOLS, PROGRAMMING_LANGUAGES } from '@/lib/config'

const languages = PROGRAMMING_LANGUAGES

const experienceLevels = [
  {
    value: 'BEGINNER',
    label: 'Beginner',
    symbol: EDUCATION_SYMBOLS.BEGINNER,
    description: 'New to programming or data structures',
  },
  {
    value: 'INTERMEDIATE',
    label: 'Intermediate',
    symbol: EDUCATION_SYMBOLS.INTERMEDIATE,
    description: 'Familiar with basic DSA concepts',
  },
  {
    value: 'ADVANCED',
    label: 'Advanced',
    symbol: EDUCATION_SYMBOLS.ADVANCED,
    description: 'Experienced with most DSA topics',
  },
]

export function OnboardingFlow() {
  const { user, updateUser } = useAuthStore()
  const { setCurrentView } = useUIStore()
  const [step, setStep] = useState(0)
  const [name, setName] = useState(user?.name || '')
  const [preferredLanguage, setPreferredLanguage] = useState('javascript')
  const [experienceLevel, setExperienceLevel] = useState('BEGINNER')
  const [isLoading, setIsLoading] = useState(false)

  const handleNext = async () => {
    if (step === 0 && name.trim()) {
      setStep(1)
    } else if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/user?userId=${user?.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user?.id,
            name,
            preferredLanguage,
            experienceLevel,
            onboardingCompleted: true,
          }),
        })

        if (response.ok) {
          updateUser({
            name,
            preferredLanguage,
            experienceLevel,
            onboardingCompleted: true,
          })
          setCurrentView('dashboard')
        }
      } catch (error) {
        console.error('Failed to complete onboarding:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const steps = [
    {
      title: 'Welcome to DSA FORGE',
      description: 'Set up your profile to personalize your learning experience.',
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="onboarding-name">Name</Label>
            <Input
              id="onboarding-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="text-lg py-6"
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Programming Language',
      description: 'Select your preferred language for code examples.',
      content: (
        <div className="grid grid-cols-2 gap-3">
          {languages.map((lang) => (
            <Button
              key={lang.value}
              variant={preferredLanguage === lang.value ? 'default' : 'outline'}
              className="h-auto py-4 justify-start"
              onClick={() => setPreferredLanguage(lang.value)}
            >
              <span className="font-medium">{lang.label}</span>
            </Button>
          ))}
        </div>
      ),
    },
    {
      title: 'Experience Level',
      description: 'This helps customize your learning path.',
      content: (
        <div className="space-y-3">
          {experienceLevels.map((level) => (
            <Card
              key={level.value}
              className={`cursor-pointer transition-all ${
                experienceLevel === level.value
                  ? 'border-primary bg-primary/5'
                  : 'hover:border-primary/50'
              }`}
              onClick={() => setExperienceLevel(level.value)}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold ${
                    experienceLevel === level.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {level.symbol}
                </div>
                <div>
                  <h4 className="font-medium">{level.label} {level.symbol}</h4>
                  <p className="text-sm text-muted-foreground">{level.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ),
    },
  ]

  const currentStep = steps[step]

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center gap-2 mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full transition-colors ${
                  index <= step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          <CardTitle className="text-2xl">{currentStep.title}</CardTitle>
          <CardDescription>{currentStep.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep.content}

          <div className="flex justify-between pt-4">
            {step > 0 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            ) : (
              <div />
            )}
            <Button
              onClick={handleNext}
              disabled={(step === 0 && !name.trim()) || isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : step === steps.length - 1 ? (
                'Start Learning'
              ) : (
                'Continue'
              )}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
