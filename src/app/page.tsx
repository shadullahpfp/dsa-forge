'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/auth-store'
import { useUIStore } from '@/store/ui-store'
import { useProblemStore } from '@/store/problem-store'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { AuthModal } from '@/components/auth/AuthModal'
import { OnboardingFlow } from '@/components/auth/OnboardingFlow'
import { Dashboard } from '@/components/dashboard/Dashboard'
import { ModuleGrid } from '@/components/learning/ModuleGrid'
import { TopicList } from '@/components/learning/TopicList'
import { ProblemView } from '@/components/problem/ProblemView'
import { ProfileSettings } from '@/components/profile/ProfileSettings'
import { AdminDashboard } from '@/components/admin/AdminDashboard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Code2,
  BookOpen,
  Zap,
  Target,
  Trophy,
  Users,
  CheckCircle2,
  ArrowRight,
  Layers,
  GitBranch,
  Search,
  Link2,
  AlignJustify,
  ListTree,
  Network,
  Database,
  PieChart,
  Lock,
} from 'lucide-react'

export default function Home() {
  const { user, isAuthenticated, isLoading, setUser, setLoading } = useAuthStore()
  const { currentView, setCurrentView, setCurrentModuleId, setCurrentProblemId } = useUIStore()
  const { modules, currentModule, setModules, setCurrentModule, userProgress, setUserProgress, setDailyChallenge, dailyChallenge } = useProblemStore()
  const [dataLoaded, setDataLoaded] = useState(false)

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/session')
        const session = await response.json()

        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
            image: session.user.image,
            role: session.user.role || 'USER',
            preferredLanguage: session.user.preferredLanguage || 'javascript',
            experienceLevel: session.user.experienceLevel || 'BEGINNER',
            streak: session.user.streak || 0,
            onboardingCompleted: session.user.onboardingCompleted || false,
          })

          if (!session.user.onboardingCompleted) {
            setCurrentView('onboarding')
          } else {
            setCurrentView('dashboard')
          }
        }
      } catch (error) {
        console.error('Session check error:', error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [setUser, setLoading, setCurrentView])

  // Load modules and user progress
  useEffect(() => {
    const loadData = async () => {
      if (!isAuthenticated || !user || dataLoaded) return

      try {
        // Load modules
        const modulesRes = await fetch('/api/modules')
        const modulesData = await modulesRes.json()
        setModules(Array.isArray(modulesData.modules) ? modulesData.modules : [])

        // Load user progress
        const progressRes = await fetch(`/api/progress?userId=${user.id}`)
        const progressData = await progressRes.json()
        setUserProgress(Array.isArray(progressData?.progress) ? progressData.progress : [])

        // Load daily challenge
        const dailyRes = await fetch('/api/daily')
        const dailyData = await dailyRes.json()
        setDailyChallenge(dailyData?.error ? null : dailyData)

        setDataLoaded(true)
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }

    loadData()
  }, [isAuthenticated, user, dataLoaded, setModules, setUserProgress, setDailyChallenge])

  // Handle module view
  const handleModuleSelect = (moduleId: string) => {
    const courseModule = modules.find(m => m.id === moduleId)
    if (courseModule) {
      setCurrentModule(courseModule)
      setCurrentModuleId(moduleId)
      setCurrentView('module')
    }
  }

  // Handle problem selection
  const handleProblemSelect = (problemId: string) => {
    setCurrentProblemId(problemId)
    const activeModule = currentModule || modules[0]
    const problem = activeModule?.problems?.find(p => p.id === problemId)
    if (problem) {
      // Set the current problem in the store
      const fullProblem = {
        ...problem,
        thinkSection: [],
        solution: [],
        starterCode: {},
        testCases: [],
      } as any
      useProblemStore.getState().setCurrentProblem(fullProblem)
      useProblemStore.getState().setCode('')
      setCurrentView('problem')
    }
  }

  // Landing page for non-authenticated users
  const LandingPage = () => (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="container relative px-4 py-24 mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center space-y-8">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                DSA FORGE
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl">
              Think. Build. Master DSA.
            </p>

            <p className="text-lg text-muted-foreground max-w-3xl">
              A production-grade DSA learning platform designed to take you from zero to advanced.
              Structured learning paths, multi-language support, and a focus on understanding over memorization.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                size="lg"
                className="gap-2 text-lg px-8"
                onClick={() => {
                  useUIStore.getState().setAuthModalMode('signup')
                  useUIStore.getState().setAuthModalOpen(true)
                }}
              >
                Start Learning Free
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8"
                onClick={() => {
                  useUIStore.getState().setAuthModalMode('login')
                  useUIStore.getState().setAuthModalOpen(true)
                }}
              >
                Log in
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>7 Languages supported</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Progress tracking</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container px-4 py-24 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why DSA FORGE?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built by developers, for developers. We focus on deep understanding, not just passing interviews.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-primary/20">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Structured Learning Path</CardTitle>
              <CardDescription>
                13 carefully designed modules taking you from programming foundations to advanced algorithms.
                No more wondering what to learn next.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Think Before You Code</CardTitle>
              <CardDescription>
                Our unique approach forces you to think through problems before coding.
                Build real problem-solving skills, not pattern matching.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Multi-Language Support</CardTitle>
              <CardDescription>
                JavaScript, TypeScript, Python, Java, C++, Go, and Rust.
                Learn in your preferred language, switch anytime.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Daily Challenges</CardTitle>
              <CardDescription>
                One curated problem every day with topic rotation.
                Build consistency without the leaderboard addiction.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Streak System</CardTitle>
              <CardDescription>
                Track your consistency with a non-toxic streak system.
                Celebrate progress, not shame gaps.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Interview Ready</CardTitle>
              <CardDescription>
                Practice with real interview-style problems. Build confidence through understanding, not memorization.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Modules Preview */}
      <div className="container px-4 py-24 mx-auto max-w-7xl bg-muted/30 rounded-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Complete DSA Curriculum
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From programming basics to advanced data structures. Every concept explained, every pattern mastered.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[
            { order: 0, title: 'Foundations', icon: Code2 },
            { order: 1, title: 'Arrays', icon: Layers },
            { order: 2, title: 'Recursion', icon: GitBranch },
            { order: 3, title: 'Searching', icon: Search },
            { order: 4, title: 'Linked List', icon: Link2 },
            { order: 5, title: 'Stack & Queue', icon: AlignJustify },
            { order: 6, title: 'Trees', icon: ListTree },
            { order: 7, title: 'BST', icon: ListTree },
            { order: 8, title: 'Heap', icon: PieChart },
            { order: 9, title: 'Graphs', icon: Network },
            { order: 10, title: 'DP', icon: Database },
            { order: 11, title: 'Greedy', icon: Zap },
            { order: 12, title: 'Advanced', icon: Trophy },
          ].map((mod, index) => {
            const Icon = mod.icon
            return (
              <div
                key={mod.order}
                className={`relative p-4 rounded-xl border bg-card text-center transition-all ${index === 0
                  ? 'border-primary bg-primary/5'
                  : 'opacity-75'
                  }`}
              >
                {index > 0 && (
                  <Lock className="absolute top-2 right-2 h-3 w-3 text-muted-foreground" />
                )}
                <div className={`h-10 w-10 mx-auto rounded-lg flex items-center justify-center mb-2 ${index === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-xs font-medium">Module {mod.order}</p>
                <p className="text-sm font-semibold mt-1">{mod.title}</p>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="gap-2"
            onClick={() => {
              useUIStore.getState().setAuthModalMode('signup')
              useUIStore.getState().setAuthModalOpen(true)
            }}
          >
            Start from Module 0
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Production Footer */}
      <footer className="border-t relative overflow-hidden bg-gradient-to-b from-background to-primary/5 mt-20">
        <div className="container px-6 py-16 mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            <div className="col-span-1 md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg shadow-lg shadow-primary/20">
                  DF
                </div>
                <span className="font-bold text-xl tracking-tight">DSA FORGE</span>
              </div>
              <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
                A production-grade platform dedicated to mastering Data Structures and Algorithms. Structured learning, interactive coding, and real-time progress tracking.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Resources</h4>
              <nav className="flex flex-col gap-3 text-sm">
                <a href="/docs" className="text-muted-foreground hover:text-primary transition-colors w-fit">Documentation</a>
                <a href="/about" className="text-muted-foreground hover:text-primary transition-colors w-fit">About Us</a>
                <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors w-fit">Privacy Policy</a>
                <a href="/terms" className="text-muted-foreground hover:text-primary transition-colors w-fit">Terms of Service</a>
              </nav>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Contact</h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>Have questions or need support?</p>
                <a href="mailto:acontrol030@gmail.com" className="block text-primary hover:underline transition-all">
                  acontrol030@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="border-t mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} DSA FORGE. All rights reserved.</p>
            <div className="flex bg-primary/10 px-3 py-1.5 rounded-full text-xs font-medium text-primary">
              <span className="relative flex h-2 w-2 mr-2 self-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              All systems operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  )

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  // Onboarding flow
  if (isAuthenticated && !user?.onboardingCompleted) {
    return <OnboardingFlow />
  }

  // Main authenticated layout
  if (isAuthenticated && user?.onboardingCompleted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 overflow-hidden">
            {currentView === 'dashboard' && <Dashboard />}
            {currentView === 'modules' && <ModuleGrid />}
            {currentView === 'module' && currentModule && (
              <TopicList
                module={currentModule}
                onProblemSelect={handleProblemSelect}
              />
            )}
            {currentView === 'problem' && <ProblemView />}
            {currentView === 'profile' && <ProfileSettings />}
            {currentView === 'admin' && <AdminDashboard />}
          </main>
        </div>
        <AuthModal />
      </div>
    )
  }

  // Landing page for non-authenticated users
  return (
    <>
      <Header />
      <LandingPage />
      <AuthModal />
    </>
  )
}
