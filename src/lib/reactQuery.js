import { QueryClient, QueryCache } from '@tanstack/react-query'
import errorMessages from '../constants/error_messages'
import { useAuthStore } from '../store/auth.store'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error.response.data.errMsg === errorMessages.TOKEN_EXPIRED) {
          return false
        }
        return failureCount < 2
      },
    },
    mutations: {
      retry: (failureCount, error) => {
        if (error.response.data.errMsg === errorMessages.TOKEN_EXPIRED) {
          return false
        }
        return failureCount < 2
      },
      onError: (error) => {
        if (error.response.data.errMsg === errorMessages.TOKEN_EXPIRED) {
          useAuthStore.getState().setToken(null)
        }
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error.response.data.errMsg === errorMessages.TOKEN_EXPIRED) {
        useAuthStore.getState().setToken(null)
      }
    },
  }),
})
