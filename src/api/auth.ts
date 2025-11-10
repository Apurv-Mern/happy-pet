import { useMutation } from '@tanstack/react-query'
import { apiClient } from './axios'
import { LoginResponse } from '@/types'

export interface LoginCredentials {
  email: string
  password: string
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>(
      '/auth/login',
      credentials
    )
    return data
  },

  // Add other auth methods as needed
  register: async (userData: any): Promise<any> => {
    const { data } = await apiClient.post('/auth/register', userData)
    return data
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout')
  },

  refreshToken: async (refreshToken: string): Promise<any> => {
    const { data } = await apiClient.post('/auth/refresh', { refreshToken })
    return data
  },
}

// React Query hooks
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApi.login,
    mutationKey: ['login'],
  })
}

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: authApi.register,
    mutationKey: ['register'],
  })
}

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: authApi.logout,
    mutationKey: ['logout'],
  })
}
