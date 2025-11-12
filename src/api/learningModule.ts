import { useQuery } from '@tanstack/react-query'
import { apiClient } from './axios'
import { LearningModule, LearningModulesResponse } from '@/types'

export const learningModuleApi = {
  getLearningModules: async (
    page: number,
    limit: number
  ): Promise<LearningModule[]> => {
    const { data } = await apiClient.get<LearningModulesResponse>(
      `web/v1/content?page=${page}&limit=${limit}`
    )
    return data.data.content
  },
}

export const useLearningModulesQuery = (
  page: number = 1,
  limit: number = 20
) => {
  return useQuery({
    queryKey: ['learning-modules', page, limit],
    queryFn: () => learningModuleApi.getLearningModules(page, limit),
    retry: 1,
  })
}
