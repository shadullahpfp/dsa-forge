'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'
import { useUIStore } from '@/store/ui-store'

export function AuthModal() {
  const { authModalOpen, setAuthModalOpen, authModalMode, setAuthModalMode } = useUIStore()

  return (
    <Dialog open={authModalOpen} onOpenChange={setAuthModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="sr-only">
          <DialogTitle>{authModalMode === 'login' ? 'Log in' : 'Sign up'}</DialogTitle>
          <DialogDescription>
            {authModalMode === 'login'
              ? 'Sign in to continue your DSA journey'
              : 'Create an account to start learning'}
          </DialogDescription>
        </DialogHeader>
        {authModalMode === 'login' ? (
          <LoginForm
            onSwitchToSignup={() => setAuthModalMode('signup')}
            onClose={() => setAuthModalOpen(false)}
          />
        ) : (
          <SignupForm
            onSwitchToLogin={() => setAuthModalMode('login')}
            onClose={() => setAuthModalOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
