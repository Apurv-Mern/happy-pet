import { useQuery } from '@tanstack/react-query'
import { apiClient } from './axios'
import { User } from '@/types'

export const userApi = {
  getCurrentUser: async (): Promise<User> => {
    const { data } = await apiClient.get<User>('/user/me')
    return data
  },
  getUserById: async (id: string): Promise<User> => {
    const { data } = await apiClient.get<User>(`/user/${id}`)
    return data
  },
}

export const useUserQuery = () => {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: userApi.getCurrentUser,
    retry: 1,
  })
}

export const useUserByIdQuery = (userId: string, enabled = true) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => userApi.getUserById(userId),
    enabled: enabled && !!userId,
  })
}

