import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: null,
      setToken: (token) => set(() => ({ token: token, isAuthenticated: !!token })),
    }),
    {
      name: 'auth', // name of the item in the storage (must be unique)
    }
  )
)
