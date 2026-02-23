import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ViewType =
  | 'landing'
  | 'dashboard'
  | 'modules'
  | 'module'
  | 'problem'
  | 'profile'
  | 'onboarding'
  | 'admin'

interface UIState {
  currentView: ViewType
  sidebarOpen: boolean
  theme: 'light' | 'dark' | 'system'
  currentModuleId: string | null
  currentProblemId: string | null
  authModalOpen: boolean
  authModalMode: 'login' | 'signup'
  thinkModalOpen: boolean
  mobileMenuOpen: boolean

  setCurrentView: (view: ViewType) => void
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setCurrentModuleId: (id: string | null) => void
  setCurrentProblemId: (id: string | null) => void
  setAuthModalOpen: (open: boolean) => void
  setAuthModalMode: (mode: 'login' | 'signup') => void
  setThinkModalOpen: (open: boolean) => void
  setMobileMenuOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      currentView: 'landing',
      sidebarOpen: true,
      theme: 'dark',
      currentModuleId: null,
      currentProblemId: null,
      authModalOpen: false,
      authModalMode: 'login',
      thinkModalOpen: false,
      mobileMenuOpen: false,

      setCurrentView: (view) => set({ currentView: view }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setTheme: (theme) => set({ theme: theme }),
      setCurrentModuleId: (id) => set({ currentModuleId: id }),
      setCurrentProblemId: (id) => set({ currentProblemId: id }),
      setAuthModalOpen: (open) => set({ authModalOpen: open }),
      setAuthModalMode: (mode) => set({ authModalMode: mode }),
      setThinkModalOpen: (open) => set({ thinkModalOpen: open }),
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
    }),
    {
      name: 'dsa-forge-ui',
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
)
