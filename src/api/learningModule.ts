import { useMutation, useQuery } from '@tanstack/react-query'
import { apiClient } from './axios'
import {
  LearningModule,
  LearningModulesResponse,
  PresignedUrlResponse,
} from '@/types'

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

  getPresignedUrlForViewing: async (
    docId: string
  ): Promise<PresignedUrlResponse> => {
    const { data } = await apiClient.get<PresignedUrlResponse>(
      `/v1/presigned-url/${docId}?expiresIn=3600`
    )
    return data
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

export const usePresignedUrlForViewingMutation = () => {
  return useMutation({
    mutationKey: ['presigned-url'],
    mutationFn: (docId: string) =>
      learningModuleApi.getPresignedUrlForViewing(docId),
    retry: 1,
  })
}
