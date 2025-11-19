import { useMutation, useQuery } from '@tanstack/react-query'
import { apiClient } from './axios'
import { LearningModulesResponse, PresignedUrlResponse } from '@/types'

export type ContentType = 'document' | 'video'

export const learningModuleApi = {
  getLearningModules: async (
    page: number,
    limit: number,
    type?: ContentType
  ): Promise<LearningModulesResponse> => {
    const typeParam = type ? `&type=${type}` : ''
    const { data } = await apiClient.get<LearningModulesResponse>(
      `web/v1/content?page=${page}&limit=${limit}${typeParam}`
    )
    return data
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
  limit: number = 20,
  type?: ContentType
) => {
  return useQuery({
    queryKey: ['learning-modules', page, limit, type],
    queryFn: () => learningModuleApi.getLearningModules(page, limit, type),
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
