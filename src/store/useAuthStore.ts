import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { User, AuthState } from '@/types'
import { STORAGE_KEYS } from '@/utils/constants'

interface AuthStore extends AuthState {
  login: (user: User, token: string, refreshToken: string) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
  setTokens: (token: string, refreshToken: string) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      login: (user, token, refreshToken) => {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
        set({ user, token, refreshToken, isAuthenticated: true })
      },
      logout: () => {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
        localStorage.removeItem(STORAGE_KEYS.USER)
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        })
      },
      updateUser: updatedUser =>
        set(state => ({
          user: state.user ? { ...state.user, ...updatedUser } : null,
        })),
      setTokens: (token, refreshToken) => {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
        set({ token, refreshToken })
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
