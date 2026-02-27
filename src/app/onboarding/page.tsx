'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { OnboardingFlow } from '@/components/auth/OnboardingFlow'

export default function OnboardingPage() {
    const router = useRouter()
    const { user, isAuthenticated, isLoading } = useAuthStore()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (isMounted && !isLoading) {
            if (!isAuthenticated) {
                router.replace('/')
            } else if (isAuthenticated && user?.onboardingCompleted) {
                router.replace('/dashboard')
            }
        }
    }, [isMounted, isLoading, isAuthenticated, router, user])

    if (!isMounted || isLoading || !isAuthenticated || user?.onboardingCompleted) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-8 bg-background">
                <div className="flex flex-col items-center gap-4 animate-pulse">
                    <div className="h-16 w-16 bg-primary/20 rounded-2xl shadow-lg shadow-primary/10" />
                    <div className="h-6 w-32 bg-muted rounded-full" />
                </div>
            </div>
        )
    }

    return <OnboardingFlow />
}
