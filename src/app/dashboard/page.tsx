'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { useUIStore } from '@/store/ui-store'
import { useProblemStore } from '@/store/problem-store'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { Dashboard } from '@/components/dashboard/Dashboard'
import { ModuleGrid } from '@/components/learning/ModuleGrid'
import { TopicList } from '@/components/learning/TopicList'
import { ProblemView } from '@/components/problem/ProblemView'
import { ProfileSettings } from '@/components/profile/ProfileSettings'
import { AdminDashboard } from '@/components/admin/AdminDashboard'

export default function DashboardPage() {
    const router = useRouter()
    const { user, isAuthenticated, isLoading } = useAuthStore()
    const { currentView, setCurrentView, setCurrentModuleId, setCurrentProblemId } = useUIStore()
    const { modules, currentModule, setModules, setCurrentModule, userProgress, setUserProgress, setDailyChallenge, dailyChallenge } = useProblemStore()
    const [dataLoaded, setDataLoaded] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        if (useUIStore.getState().currentView === 'onboarding' || typeof useUIStore.getState().currentView === 'undefined') {
            setCurrentView('dashboard') // reset safely on mount
        }
    }, [setCurrentView])

    // If unauthenticated after checking, redirect
    useEffect(() => {
        if (isMounted && !isLoading) {
            if (!isAuthenticated) {
                router.replace('/')
            } else if (isAuthenticated && !user?.onboardingCompleted) {
                router.replace('/onboarding')
            }
        }
    }, [isMounted, isLoading, isAuthenticated, router, user])

    // Load modules and user progress
    useEffect(() => {
        const loadData = async () => {
            if (!isAuthenticated || !user || dataLoaded) return

            try {
                // Load modules
                const modulesRes = await fetch('/api/modules')
                if (modulesRes.ok) {
                    const modulesData = await modulesRes.json()
                    setModules(Array.isArray(modulesData.modules) ? modulesData.modules : [])
                }

                // Load user progress
                const progressRes = await fetch(`/api/progress?userId=${user.id}`)
                if (progressRes.ok) {
                    const progressData = await progressRes.json()
                    setUserProgress(Array.isArray(progressData?.progress) ? progressData.progress : [])
                }

                // Load daily challenge
                const dailyRes = await fetch('/api/daily')
                if (dailyRes.ok) {
                    const dailyData = await dailyRes.json()
                    setDailyChallenge(dailyData?.error ? null : dailyData)
                }

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

    if (!isMounted || isLoading || !isAuthenticated) {
        return (
            <div className="min-h-screen flex flex-col pt-14 items-center justify-center space-y-8 bg-background">
                <div className="flex flex-col items-center gap-4 animate-pulse">
                    <div className="h-16 w-16 bg-primary/20 rounded-2xl shadow-lg shadow-primary/10" />
                    <div className="h-6 w-32 bg-muted rounded-full" />
                </div>
                <div className="space-y-4 w-full max-w-md px-6 opacity-60">
                    <div className="h-28 w-full bg-muted/40 rounded-2xl animate-pulse" />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-24 w-full bg-muted/30 rounded-2xl animate-pulse delay-75" />
                        <div className="h-24 w-full bg-muted/30 rounded-2xl animate-pulse delay-150" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 overflow-hidden relative">
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
        </div>
    )
}
