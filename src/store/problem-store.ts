import { create } from 'zustand'

export interface TestCase {
  input: string
  expectedOutput: string
  explanation?: string
}

export interface ThinkQuestion {
  id: string
  question: string
  hint?: string
}

export interface Solution {
  language: string
  code: string
  explanation?: string
}

export interface Problem {
  id: string
  moduleId: string
  title: string
  slug: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  description: string
  constraints: string
  intuition: string
  thinkSection: ThinkQuestion[]
  bruteForce: string
  optimization: string
  solution: Solution[]
  timeComplexity: string
  spaceComplexity: string
  starterCode: Record<string, string>
  testCases: TestCase[]
  order: number
}

export interface Module {
  id: string
  order: number
  title: string
  description: string
  slug: string
  problems?: Problem[]
  topics?: Topic[]
}

export interface Topic {
  id: string
  moduleId: string
  title: string
  content: string
  order: number
}

export interface UserProgress {
  moduleId: string
  completed: boolean
  completedTopics: string[]
}

export interface SubmissionResult {
  status: 'PENDING' | 'RUNNING' | 'ACCEPTED' | 'WRONG_ANSWER' | 'TIME_LIMIT_EXCEEDED' | 'MEMORY_LIMIT_EXCEEDED' | 'COMPILATION_ERROR' | 'RUNTIME_ERROR'
  executionTime?: number
  memoryUsed?: number
  message?: string
  testCasesPassed?: number
  totalTestCases?: number
}

interface ProblemState {
  modules: Module[]
  currentModule: Module | null
  currentProblem: Problem | null
  code: string
  language: string
  isRunning: boolean
  isSubmitting: boolean
  submissionResult: SubmissionResult | null
  userProgress: UserProgress[]
  dailyChallenge: Problem | null

  setModules: (modules: Module[]) => void
  setCurrentModule: (module: Module | null) => void
  setCurrentProblem: (problem: Problem | null) => void
  setCode: (code: string) => void
  setLanguage: (language: string) => void
  setIsRunning: (running: boolean) => void
  setIsSubmitting: (submitting: boolean) => void
  setSubmissionResult: (result: SubmissionResult | null) => void
  setUserProgress: (progress: UserProgress[]) => void
  setDailyChallenge: (problem: Problem | null) => void
}

export const useProblemStore = create<ProblemState>((set) => ({
  modules: [],
  currentModule: null,
  currentProblem: null,
  code: '',
  language: 'javascript',
  isRunning: false,
  isSubmitting: false,
  submissionResult: null,
  userProgress: [],
  dailyChallenge: null,

  setModules: (modules) => set({ modules }),
  setCurrentModule: (module) => set({ currentModule: module }),
  setCurrentProblem: (problem) => set({ currentProblem: problem }),
  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
  setIsRunning: (running) => set({ isRunning: running }),
  setIsSubmitting: (submitting) => set({ isSubmitting: submitting }),
  setSubmissionResult: (result) => set({ submissionResult: result }),
  setUserProgress: (progress) => set({ userProgress: progress }),
  setDailyChallenge: (problem) => set({ dailyChallenge: problem }),
}))
