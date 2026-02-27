'use client'

import { SessionProvider, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth-store'

function AuthStateSyncer() {
    const { data: session, status } = useSession()
    const { setUser, setLoading, user, isAuthenticated } = useAuthStore()

    useEffect(() => {
        if (status === 'loading') {
            setLoading(true)
        } else if (status === 'authenticated' && session?.user) {
            // Only update if not already set or if different, to prevent unnecessary re-renders
            if (!isAuthenticated || user?.id !== session.user.id) {
                setUser({
                    id: session.user.id,
                    email: session.user.email || '',
                    name: session.user.name,
                    image: session.user.image,
                    role: session.user.role || 'USER',
                    preferredLanguage: session.user.preferredLanguage || 'javascript',
                    experienceLevel: session.user.experienceLevel || 'BEGINNER',
                    streak: session.user.streak || 0,
                    onboardingCompleted: session.user.onboardingCompleted || false,
                })
            }
            setLoading(false)
        } else if (status === 'unauthenticated') {
            setUser(null)
            setLoading(false)
        }
    }, [session, status, setUser, setLoading, isAuthenticated, user])

    return null
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <AuthStateSyncer />
            {children}
        </SessionProvider>
    )
}
